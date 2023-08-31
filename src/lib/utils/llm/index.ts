import OpenAI from 'openai';
import { openaiConfig } from '../../config';
import log from '../logger';

interface Message {
  role: 'system' | 'user';
  content: string;
}

export class OpenAiApi {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: openaiConfig.apiKey,
    });
  }

  async createChat(model: string, startContext: string, messages: Message[]) {
    const response = await this.openai.chat.completions.create({
      model,
      messages: [{ role: 'system', content: startContext }, ...messages],
    });

    const aiMessage = response.choices[0].message?.content;
    if (!aiMessage) {
      throw new Error(`AI message is empty for chat ${response}`);
    }

    return aiMessage;
  }

  async getSuggestion(prompt: string, context?: string) {
    return await this.createChat(
      openaiConfig.startModel,
      openaiConfig.startContext,
      [
        {
          role: 'user',
          content: `Please provide clear and concise suggestions for improving the following draft: ${prompt}${
            context
              ? `
            . And here's a little information about the draft: ${context}`
              : ''
          }`,
        },
      ]
    );
  }
}
