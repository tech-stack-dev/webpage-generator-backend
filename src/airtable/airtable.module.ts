import { Module, Global } from '@nestjs/common';
import { AirtableService } from './airtable.service';

@Global()
@Module({
  providers: [AirtableService],
  exports: [AirtableService],
})
export class AirtableModule {}
