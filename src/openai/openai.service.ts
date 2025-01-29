import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class OpenaiService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI();
  }

  async sendPrompt(prompt: string) {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
      });

      return completion.choices[0].message.content || 'No reply from AI';
    } catch (error) {
      console.error('Error communicating with OpenAI:', error);
      throw new Error('Failed to get response from OpenAI.');
    }
  }
}
