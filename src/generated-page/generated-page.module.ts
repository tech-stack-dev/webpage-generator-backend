import { Module } from '@nestjs/common';
import { GeneratedPageService } from './generated-page.service';
import { GeneratedPageController } from './generated-page.controller';
import { OpenaiModule } from '../openai/openai.module';
import { AirtableModule } from '../airtable/airtable.module';

@Module({
  controllers: [GeneratedPageController],
  providers: [GeneratedPageService],
  imports: [OpenaiModule, AirtableModule],
})
export class GeneratedPageModule {}
