import { Module } from '@nestjs/common';
import { OpenaiService } from './openai.service';

@Module({
  providers: [OpenaiService],
  controllers: [],
  exports: [OpenaiService],
})
export class OpenaiModule {}
