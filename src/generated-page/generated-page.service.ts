import { Injectable } from '@nestjs/common';
import { UpdateGeneratedPageDto } from './dto/update-generated-page.dto';
import { CreateGeneratedPageDto } from './dto/create-generated-page.dto';
import { OpenaiService } from 'src/openai/openai.service';

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
