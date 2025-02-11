import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { GeneratedPageService } from './generated-page.service';
import {
  CreateGeneratedPageDto,
  GeneratePageDto,
} from './dto/create-generated-page.dto';
import { UpdateGeneratedPageDto } from './dto/update-generated-page.dto';
import { SaveToAirtableDto } from './dto/save-to-airtable.dto';
import * as Airtable from 'airtable';

@Controller('generated-page')
export class GeneratedPageController {
  constructor(private readonly generatedPageService: GeneratedPageService) {}

  @Post('save-to-airtable')
  @HttpCode(200)
  savePage(@Body() request: SaveToAirtableDto) {
    const baseId = 'appctwyrBLnP8lWGk';
    const tableName = 'webpages';

    const newRecord = {
      Name: 'Test',
      mainContent: request.mainContent,
      metaTitle: request.metaTitle,
      metaDescription: request.metaDescription,
      slug: request.slug,
      breadcrumb: request.breadcrumb,
      heroTitle: request.heroTitle,
      heroContent: request.heroContent,
    };

    const base = new Airtable().base(baseId);

    base(tableName).create(newRecord, (err, record) => {
      if (err) {
        console.error('Error adding record:', err);
        return;
      }
      if (record) {
        console.log('Record added with ID:', record.getId());
      }
    });

    return 'hello world';
  }

  @Post('generate')
  async generatePage(@Body() generatePage: GeneratePageDto) {
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

  @Post()
  async create(@Body() createGeneratedPageDto: CreateGeneratedPageDto) {
    const generatedPage = await this.generatedPageService.generatePage(
      createGeneratedPageDto.prompts,
      createGeneratedPageDto,
    );

    return { generatedPage };
  }

  @Get()
  findAll() {
    return this.generatedPageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.generatedPageService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGeneratedPageDto: UpdateGeneratedPageDto,
  ) {
    return this.generatedPageService.update(+id, updateGeneratedPageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.generatedPageService.remove(+id);
  }
}
