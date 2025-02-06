import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GeneratedPageService } from './generated-page.service';
import { CreateGeneratedPageDto } from './dto/create-generated-page.dto';
import { UpdateGeneratedPageDto } from './dto/update-generated-page.dto';
import { SaveToAirtableDto } from './dto/save-to-airtable.dto';
import * as Airtable from 'airtable';

@Controller('generated-page')
export class GeneratedPageController {
  constructor(private readonly generatedPageService: GeneratedPageService) {}

  @Post('save-to-airtable')
  savePage() {
    const baseId = 'appctwyrBLnP8lWGk';
    const tableName = 'webpages';

    const newRecord = {
      Name: 'Example Name',
      mainContent: 'This is the main content of the record.',
      metaTitle: 'Example Meta Title',
      metaDescription: 'Example Meta Description providing more details.',
      slug: 'example-slug',
      breadcrumb: 'Home > Section > Subsection',
      heroTitle: 'Welcome to Our Page',
      heroContent:
        'This is the hero section content that highlights the main message.',
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
