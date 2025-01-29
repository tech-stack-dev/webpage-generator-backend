import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BasePagesService } from './base-pages.service';
import { CreateBasePageDto } from './dto/create-base-page.dto';
import { UpdateBasePageDto } from './dto/update-base-page.dto';

@Controller('base-pages')
export class BasePagesController {
  constructor(private readonly basePagesService: BasePagesService) {}

  @Post()
  create(@Body() createBasePageDto: CreateBasePageDto) {
    return this.basePagesService.create(createBasePageDto);
  }

  @Get()
  findAll() {
    return this.basePagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.basePagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBasePageDto: UpdateBasePageDto) {
    return this.basePagesService.update(+id, updateBasePageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.basePagesService.remove(+id);
  }
}
