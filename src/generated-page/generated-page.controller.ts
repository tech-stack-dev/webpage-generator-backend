import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import * as Airtable from 'airtable';
import {
  CreateGeneratedPageDto,
  GeneratePageDto,
} from './dto/create-generated-page.dto';
import { SaveToWebflowDto } from './dto/save-to-webflow.dto';
import { GeneratedPageService } from './generated-page.service';
// import { GeneratePageResponse } from '../utils/types';
import { correctionOfHTMLPrompt } from '../utils/constants';
import { OpenaiService } from '../openai/openai.service';
import { SaveToAirtableDto } from '../generated-page/dto/save-to-airtable.dto';

@Controller('generated-page')
export class GeneratedPageController {
  private readonly logger = new Logger(GeneratedPageController.name);

  constructor(
    private readonly generatedPageService: GeneratedPageService,
    private readonly openAIService: OpenaiService,
  ) {}

  @Post('generate')
  async generatePage(@Body() incomingGeneratePageDto: GeneratePageDto) {
    const {
      structurePage,
      keywords,
      breadcrumb,
      metaTitle,
      metaDescription,
      geo,
      slug,
      heroSectionTitle,
    } = incomingGeneratePageDto;

    const replacementDataForThisGeo: GeneratePageDto = structuredClone(
      incomingGeneratePageDto,
    );

    replacementDataForThisGeo.structurePage =
      this.generatedPageService.replaceVariables(
        structurePage,
        replacementDataForThisGeo,
      );

    replacementDataForThisGeo.keywords =
      this.generatedPageService.replaceVariables(
        keywords,
        replacementDataForThisGeo,
      );

    const processedBreadcrumb = this.generatedPageService.replaceVariables(
      breadcrumb,
      replacementDataForThisGeo,
    );
    const processedMetaTitle = this.generatedPageService.replaceVariables(
      metaTitle,
      replacementDataForThisGeo,
    );
    const processedMetaDescription = this.generatedPageService.replaceVariables(
      metaDescription,
      replacementDataForThisGeo,
    );
    const processedSlug = this.generatedPageService.replaceVariables(
      slug,
      replacementDataForThisGeo,
    );
    const processedHeroSectionTitle =
      this.generatedPageService.replaceVariables(
        heroSectionTitle,
        replacementDataForThisGeo,
      );

    const processedMainContentPrompts =
      incomingGeneratePageDto.mainContentPrompts.map((prompt) =>
        this.generatedPageService.replaceVariables(
          prompt,
          replacementDataForThisGeo,
        ),
      );

    let generatedMainContent = await this.openAIService.sendPromptsAsUser(
      processedMainContentPrompts,
    );

    // If re-enabling HTML validation, it should be done here for generatedMainContent
    // and use `replacementDataForThisGeo` and `processedMainContentPrompts` if needed for context.
    // Example:
    const validation =
      await this.generatedPageService.validateHTMLContent(generatedMainContent);

    if (
      generatedMainContent
        .toLowerCase()
        .includes("i can't assist with that request") ||
      generatedMainContent.length < 100 ||
      !validation.isValid
    ) {
      this.logger.warn(
        `HTML validation failed for geo: ${geo}. Attempting correction.`,
      );
      generatedMainContent = await this.generatedPageService.askChatGPT(
        [
          `${correctionOfHTMLPrompt(validation.errors || '')}
            Here is what you have generated previously:
            ${generatedMainContent}
            You generated it with this requirements:
            ${processedMainContentPrompts[0] || 'No original prompt available for context.'}`,
        ],
        replacementDataForThisGeo,
      );
    }

    const processedHeroContentPrompts =
      incomingGeneratePageDto.heroContentPrompts.map((prompt) =>
        this.generatedPageService.replaceVariables(
          prompt,
          replacementDataForThisGeo,
        ),
      );

    const generatedHeroContent = await this.openAIService.sendPromptsAsUser(
      processedHeroContentPrompts,
    );

    const generatedRes: SaveToAirtableDto = {
      name: incomingGeneratePageDto.name,
      geo: geo,
      breadcrumb: processedBreadcrumb,
      heroContent: generatedHeroContent,
      heroTitle: processedHeroSectionTitle,
      mainContent: generatedMainContent,
      metaDescription: processedMetaDescription,
      metaTitle: processedMetaTitle,
      slug: processedSlug,
    };

    const result = await this.generatedPageService.createWebpage(generatedRes);

    return result;
  }

  @Post('save-to-webflow')
  async saveToWebflow(@Body() body: SaveToWebflowDto) {
    const record = await this.generatedPageService.getAirtableRecordByName(
      body.name,
    );

    if (!record) {
      throw new HttpException(
        `Record with name "${body.name}" not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    const request = {
      name: record.Name as string | undefined,
      slug: record.slug as string | undefined,
      maincontent: record.mainContent as string | undefined,
      metatitle: record.metaTitle as string | undefined,
      metadescription: record.metaDescription as string | undefined,
      breadcrumb: record.breadcrumb as string | undefined,
      herotitle: record.heroTitle as string | undefined,
      herocontent: record.heroContent as string | undefined,
    };

    return await this.generatedPageService.updateWebflowCollection(request);
  }

  @Post()
  async create(@Body() createGeneratedPageDto: CreateGeneratedPageDto) {
    const generatedPage = await this.generatedPageService.generatePage(
      createGeneratedPageDto.prompts,
      createGeneratedPageDto,
    );

    return { generatedPage };
  }

  @Get('records')
  async getAirtableRecords() {
    const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

    if (!AIRTABLE_BASE_ID) {
      throw new HttpException(
        'No AIRTABLE_BASE_ID was provided to an app',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const tableName = 'webpages';

    const base = new Airtable().base(AIRTABLE_BASE_ID);

    try {
      const records = await base(tableName).select().all();

      const data = records.map((record) => record.fields);
      return data;
    } catch (error) {
      this.logger.error('Error fetching Airtable records:', error);
      throw new HttpException(
        'Error fetching Airtable records',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
