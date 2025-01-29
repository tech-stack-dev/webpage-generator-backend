import { IsString, IsArray } from 'class-validator';

export class CreateGeneratedPageDto {
  @IsString()
  serviceType: string;

  @IsString()
  basePage: string;

  @IsString()
  structurePage: string;

  @IsString()
  minTextSize: number;

  @IsString()
  keywords: string;

  @IsString()
  metaTitle: string;

  @IsString()
  metaDescription: string;

  @IsString()
  geo: string;

  @IsString()
  slug: string;

  @IsArray()
  @IsString({ each: true })
  prompts: string[];
}
