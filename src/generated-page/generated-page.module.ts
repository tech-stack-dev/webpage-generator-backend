import { Module } from '@nestjs/common';
import { GeneratedPageService } from './generated-page.service';
import { GeneratedPageController } from './generated-page.controller';
import { OpenaiModule } from '../openai/openai.module';

@Module({
  controllers: [GeneratedPageController],
  providers: [GeneratedPageService],
  imports: [OpenaiModule],
})
export class GeneratedPageModule {}
