import { Module } from '@nestjs/common';
import { BasePagesService } from './base-pages.service';
import { BasePagesController } from './base-pages.controller';

@Module({
  controllers: [BasePagesController],
  providers: [BasePagesService],
})
export class BasePagesModule {}
