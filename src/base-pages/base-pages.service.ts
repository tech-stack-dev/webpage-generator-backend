import { Injectable } from '@nestjs/common';
import { CreateBasePageDto } from './dto/create-base-page.dto';
import { UpdateBasePageDto } from './dto/update-base-page.dto';

@Injectable()
export class BasePagesService {
  create(createBasePageDto: CreateBasePageDto) {
    return 'This action adds a new basePage';
  }

  findAll() {
    return `This action returns all basePages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} basePage`;
  }

  update(id: number, updateBasePageDto: UpdateBasePageDto) {
    return `This action updates a #${id} basePage`;
  }

  remove(id: number) {
    return `This action removes a #${id} basePage`;
  }
}
