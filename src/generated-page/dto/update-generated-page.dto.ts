import { PartialType } from '@nestjs/mapped-types';
import { CreateGeneratedPageDto } from './create-generated-page.dto';

export class UpdateGeneratedPageDto extends PartialType(
  CreateGeneratedPageDto,
) {}
