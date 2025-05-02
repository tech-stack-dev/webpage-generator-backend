import type { GeneratePageDto } from 'src/generated-page/dto/create-generated-page.dto';

export type GeneratePageResponse = {
  generatedMainContent: string;
  generatedHeroContent: string;
} & Pick<
  GeneratePageDto,
  'metaTitle' | 'metaDescription' | 'keywords' | 'slug' | 'heroSectionTitle'
>;
