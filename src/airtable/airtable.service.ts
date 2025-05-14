import {
  Injectable,
  InternalServerErrorException,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import * as Airtable from 'airtable';
import axios, { AxiosRequestConfig } from 'axios';
import {
  ICreateTable,
  ICreateTableRes,
  IGetTableRecordsList,
} from '../types/airtable';
import { isInvalidPermissionsError } from 'src/utils/errors';

type IAddReecordToTableRes<T> = {
  id: string;
  createdTime: string;
  fields: T;
};

@Injectable()
export class AirtableService implements OnModuleInit {
  private readonly logger = new Logger(AirtableService.name);
  private configuredBase: Airtable.Base | undefined;
  private readonly airtableEndpointUrl: string;
  private baseId: string;

  constructor() {
    this.airtableEndpointUrl = process.env.AIRTABLE_API_URL || '';
    this.baseId = process.env.AIRTABLE_BASE_ID || '';
  }

  async onModuleInit() {
    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;

    if (!apiKey || !baseId) {
      const errorMsg =
        'Airtable API key or base ID is not provided. Please check your environment variables.';
      this.logger.error(errorMsg);
      throw new Error(errorMsg);
    }

    try {
      Airtable.configure({ apiKey });
      const airtableClient = new Airtable();
      this.configuredBase = airtableClient.base(baseId);

      this.logger.log(`Airtable base "${baseId}" initialized successfully.`);
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = `Failed to initialize Airtable base "${baseId}": ${error.message}`;
        this.logger.error(errorMessage, error.stack);
        throw new Error(errorMessage);
      }
      this.logger.error(
        `Failed to initialize Airtable base "${baseId}" with non-Error object:`,
        error,
      );
      throw error;
    }
  }

  getAirtableBase(): Airtable.Base {
    if (!this.configuredBase) {
      throw new Error('Airtable base not initialized.');
    }

    return this.configuredBase;
  }

  getTableByName(tableName: string) {
    const base = this.getAirtableBase();
    const table = base(tableName);

    return table;
  }

  async addRecordToTable<T>(tableName: string, recordData: Record<any, any>) {
    const table = this.getTableByName(tableName);

    try {
      const createdRecord = await table.create(recordData);

      const createdRecordData =
        createdRecord._rawJson as IAddReecordToTableRes<T>;

      return createdRecordData;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';

      this.logger.error(
        `Error adding record to table "${tableName}": ${message}`,
      );

      throw new InternalServerErrorException(
        `Error adding record to table "${tableName}": ${message}`,
      );
    }
  }

  async checkIfTableExists(tableName: string): Promise<boolean> {
    try {
      const path = `/${this.baseId}/${tableName}?maxRecords=0`;

      const url = this.airtableEndpointUrl + path;

      const config = {
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      };

      await axios.get(url, config);

      return true;
    } catch (error) {
      if (isInvalidPermissionsError(error)) {
        return false;
      }

      const message = error instanceof Error ? error.message : 'Unknown error';

      this.logger.error(
        `Error checking if table "${tableName}" exists: ${message}`,
      );

      throw new InternalServerErrorException(
        `Error checking if table "${tableName}" exists: ${message}`,
      );
    }
  }

  async createTable(tableInfo: ICreateTable) {
    try {
      const path = `/meta/bases/${this.baseId}/tables`;

      const url = this.airtableEndpointUrl + path;

      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.post(url, tableInfo, config);

      return res.data as ICreateTableRes;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        this.logger.error(
          `Error creating table "${tableInfo.name}": ${error.message}`,
        );
        throw new Error(
          `Error creating table "${tableInfo.name}": ${error.message}`,
        );
      } else {
        this.logger.error(`Unexpected error creating table`);

        throw new Error(`Unexpected error creating table`);
      }
    }
  }
}
