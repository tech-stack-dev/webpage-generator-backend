import {
  Body,
  Controller,
  Get,
  HttpCode,
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
import { SaveToAirtableDto } from './dto/save-to-airtable.dto';
import { SaveToWebflowDto } from './dto/save-to-webflow.dto';
import { GeneratedPageService } from './generated-page.service';

@Controller('generated-page')
export class GeneratedPageController {
  private readonly logger = new Logger(GeneratedPageController.name);

  constructor(private readonly generatedPageService: GeneratedPageService) {}

  @Post('save-to-airtable')
  @HttpCode(200)
  savePage(@Body() request: SaveToAirtableDto) {
    const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

    if (!AIRTABLE_BASE_ID) {
      throw new HttpException(
        'No AIRTABLE_BASE_ID was provided to an app',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const tableName = 'webpages';

    const newRecord = {
      Name: request.name,
      mainContent: request.mainContent,
      metaTitle: request.metaTitle,
      metaDescription: request.metaDescription,
      slug: request.slug,
      breadcrumb: request.breadcrumb,
      heroTitle: request.heroTitle,
      heroContent: request.heroContent,
    };

    const base = new Airtable().base(AIRTABLE_BASE_ID);

    base(tableName).create(newRecord, (err, record) => {
      if (err) {
        this.logger.error('Error adding record:', err);
        return;
      }
      if (record) {
        this.logger.log('Record added with ID:', record.getId());
      }
    });

    return newRecord;
  }

  @Post('generate')
  async generatePage(@Body() generatePage: GeneratePageDto) {
    generatePage.structurePage = this.generatedPageService.replaceVariables(
      generatePage.structurePage,
      generatePage,
    );

    generatePage.keywords = this.generatedPageService.replaceVariables(
      generatePage.keywords,
      generatePage,
    );

    generatePage.breadcrumb = this.generatedPageService.replaceVariables(
      generatePage.breadcrumb,
      generatePage,
    );

    const generatedMainContent = await this.generatedPageService.askChatGPT(
      generatePage.mainContentPrompts,
      generatePage,
    );

    const generatedHeroContent = await this.generatedPageService.askChatGPT(
      generatePage.heroContentPrompts,
      generatePage,
    );

    return { generatedMainContent, generatedHeroContent };
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
