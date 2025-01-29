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

@Controller('generated-page')
export class GeneratedPageController {
  constructor(private readonly generatedPageService: GeneratedPageService) {}

  @Post()
  async create(@Body() createGeneratedPageDto: CreateGeneratedPageDto) {
    const generatedPage = await this.generatedPageService.generatePage(
      createGeneratedPageDto.prompts,
      createGeneratedPageDto,
    );

    return { generatedPage };
  }

  @Post('/generate')
  generatePage() {}

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
