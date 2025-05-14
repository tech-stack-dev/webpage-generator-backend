import { newWebpageTable } from './../utils/newWebpageTable';
import { Injectable, Logger } from '@nestjs/common';
import * as Airtable from 'airtable';
import { OpenaiService } from '../openai/openai.service';
import {
  CreateGeneratedPageDto,
  GeneratePageDto,
} from './dto/create-generated-page.dto';
import * as validator from 'html-validator';
import { AirtableService } from '../airtable/airtable.service';
import { SaveToAirtableDto } from './dto/save-to-airtable.dto';
import { ICreateTable } from 'src/types/airtable';

export interface WebflowItem {
  name: string | undefined;
  slug: string | undefined;
  maincontent: string | undefined;
  metatitle: string | undefined;
  metadescription: string | undefined;
  breadcrumb: string | undefined;
  herotitle: string | undefined;
  herocontent: string | undefined;
}

export interface Page {
  // breadcrumb: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  mainContent: string;
  slug: string;
  geo: string;
  heroContent: string;
}

@Injectable()
export class GeneratedPageService {
  private readonly logger = new Logger(GeneratedPageService.name);

  constructor(
    private readonly openaiService: OpenaiService,
    private readonly airtableService: AirtableService,
  ) {}

  async generatePage(prompts: string[], data: CreateGeneratedPageDto) {
    const processedPrompts = prompts.map((prompt) =>
      this.replaceVariables(prompt, data),
    );

    const response = this.openaiService.sendPromptsAsUser(processedPrompts);

    return response;
  }

  async askChatGPT(prompts: string[], data: GeneratePageDto) {
    const processedPrompts = prompts.map((prompt) =>
      this.replaceVariables(prompt, data),
    );

    const response = this.openaiService.sendPromptsAsUser(processedPrompts);

    return response;
  }

  replaceVariables = <T extends Record<string, any>>(
    template: string,
    data: T,
  ): string => {
    return template.replace(/%(\w+)%/g, (match, varName) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const replacement = data[varName as string];
      if (replacement === undefined) {
        this.logger.warn(
          `Warning: No matching property for variable "${varName}"`,
        );
        return match;
      }
      return String(replacement);
    });
  };

  async getAirtableRecordByName(name: string) {
    const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

    if (!AIRTABLE_BASE_ID) {
      throw new Error('No AIRTABLE_BASE_ID was provided to an app');
    }

    const tableName = 'webpages';

    const base = new Airtable().base(AIRTABLE_BASE_ID);

    try {
      const records = await base(tableName).select().all();

      return records
        .map((record) => record.fields)
        .find((record) => record.Name === name);
    } catch (error) {
      this.logger.error('Error fetching Airtable records:', error);
      throw new Error('No AIRTABLE_BASE_ID was provided to an app');
    }
  }

  async updateWebflowCollection(body: WebflowItem) {
    const API_TOKEN = process.env.WEBFLOW_CMS_API_KEY;

    const payload = {
      fieldData: {
        name: body.name,
        slug: body.slug,
        maincontent: body.maincontent,
        metatitle: body.metatitle,
        metadescription: body.metadescription,
        breadcrubm: body.breadcrumb,
        herotitle: body.herotitle,
        herocontent: body.herocontent,
      },
    };

    // // Make a POST request using fetch to create a new item in Webflow
    const response = await fetch(
      `https://api.webflow.com/v2/collections/67af5217d59d0e3777bf5372/items`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json',
          'accept-version': '1.0.0',
        },
        body: JSON.stringify(payload),
      },
    );

    return (await response.json()) as Promise<unknown>;
  }

  async validateHTMLContent(htmlLikeData: string): Promise<boolean> {
    const validationOptions = {
      // NOTE: option to validate locally instead of doing a roundtrip to the remote server
      data: htmlLikeData,
      validator: 'WHATWG',
      isFragment: true,
    };

    try {
      const validationResult = await validator(validationOptions);
      //@ts-expect-error incomplete typings of said library
      console.log('VALID BY VALIDATOR', validationResult.isValid);

      //@ts-expect-error incomplete typings
      return validationResult.isValid as boolean;
    } catch (error) {
      console.error(
        'Error during validation of the document occured, which is not related to the validator itself',
        error,
      );
      return false;
    }
  }

  async addRecordToWebpageTable(tableName: string, record: Page) {
    return this.airtableService.addRecordToTable<Page>(tableName, record);
  }

  async createWebpage(saveToAirtableDto: SaveToAirtableDto) {
    const { breadcrumb, name: tableName, ...recordToSave } = saveToAirtableDto;

    const isExistingTable =
      await this.airtableService.checkIfTableExists(tableName);

    if (isExistingTable) {
      return await this.addRecordToWebpageTable(tableName, recordToSave);
    }

    const newTable: ICreateTable = {
      ...newWebpageTable,
      name: saveToAirtableDto.name,
    };

    await this.airtableService.createTable(newTable);

    return await this.addRecordToWebpageTable(tableName, recordToSave);
  }
}
