import { PartialType } from '@nestjs/mapped-types';
import { CreateBasePageDto } from './create-base-page.dto';

export class UpdateBasePageDto extends PartialType(CreateBasePageDto) {}
