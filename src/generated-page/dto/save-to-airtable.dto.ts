import { IsString } from 'class-validator';

export class SaveToAirtableDto {
  @IsString()
  name: string;

  @IsString()
  geo: string;

  @IsString()
  mainContent: string;

  @IsString()
  metaTitle: string;

  @IsString()
  metaDescription: string;

  @IsString()
  slug: string;

  @IsString()
  breadcrumb: string;

  @IsString()
  heroTitle: string;

  @IsString()
  heroContent: string;
}
