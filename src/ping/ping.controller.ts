import {
  Controller,
  Get,
  Logger,
} from '@nestjs/common';

@Controller('ping')
export class PingController {
  private readonly logger = new Logger(PingController.name);

  constructor() {}

  @Get('')
  async getAirtableRecords() {
    this.logger.log('Healthy ping received.');
    return "pong";
  }
}
