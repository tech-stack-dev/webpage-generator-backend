import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateGeneratedPageDto } from './dto/update-generated-page.dto';
import {
  CreateGeneratedPageDto,
  GeneratePageDto,
} from './dto/create-generated-page.dto';
import { OpenaiService } from 'src/openai/openai.service';
import * as Airtable from 'airtable';

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
  breadcrumb: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  mainContent: string;
  slug: string;
  Name: string;
  heroContent: string;
}

@Injectable()
export class GeneratedPageService {
  constructor(private readonly openaiService: OpenaiService) {}

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
        console.warn(`Warning: No matching property for variable "${varName}"`);
        return match;
      }
      return String(replacement);
    });
  };

  async getAirtableRecordByName(name: string) {
    const baseId = 'appctwyrBLnP8lWGk';
    const tableName = 'webpages';

    const base = new Airtable().base(baseId);

    try {
      const records = await base(tableName).select().all();

      return records
        .map((record) => record.fields)
        .find((record) => record.Name === name);
    } catch (error) {
      console.error('Error fetching Airtable records:', error);
      throw new HttpException(
        'Error fetching Airtable records',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
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
        herocontent: body.herotitle,
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

    return await response.json();
  }

  findAll() {
    return `This action returns all generatedPage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} generatedPage`;
  }

  update(id: number, updateGeneratedPageDto: UpdateGeneratedPageDto) {
    return `This action updates a #${id} generatedPage`;
  }

  remove(id: number) {
    return `This action removes a #${id} generatedPage`;
  }
}
