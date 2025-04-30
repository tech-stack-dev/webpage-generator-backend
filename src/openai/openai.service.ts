import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';

@Injectable()
export class OpenaiService {
  private readonly logger = new Logger(OpenaiService.name);

  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI();
  }

  async sendPrompt(prompt: string) {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
      });

      return completion.choices[0]?.message.content || 'No reply from AI';
    } catch (error) {
      this.logger.error('Error communicating with OpenAI:', error);
      throw new Error('Failed to get response from OpenAI.');
    }
  }

  async sendPromptsAsUser(prompts: string[]) {
    const preparedPrompts = prompts.map(
      (prompt) =>
        ({
          role: 'user',
          content: prompt,
        }) as ChatCompletionMessageParam,
    );

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages: preparedPrompts,
      });
      return completion.choices[0]?.message.content || 'No reply from AI';
    } catch (error) {
      this.logger.error('Error communicating with OpenAI:', error);
      throw new Error('Failed to get response from OpenAI.');
    }
  }
}
