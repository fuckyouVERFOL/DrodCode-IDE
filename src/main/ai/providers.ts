import axios from 'axios';
import { AIChatMessage } from './chat';

export interface AIProviderConfig {
  provider: 'ollama' | 'openai' | 'anthropic' | 'gemini' | 'custom';
  apiKey?: string;
  baseUrl?: string;
  model: string;
}

export class AIProviderAdapter {
  public static async queryProvider(
    config: AIProviderConfig,
    messages: AIChatMessage[]
  ): Promise<string> {
    const { provider, apiKey, baseUrl, model } = config;

    switch (provider) {
      case 'openai':
        return this.queryOpenAI(apiKey || '', model, messages, baseUrl || 'https://api.openai.com/v1');
      case 'anthropic':
        return this.queryAnthropic(apiKey || '', model, messages);
      case 'gemini':
        return this.queryGemini(apiKey || '', model, messages);
      case 'custom':
        return this.queryOpenAI(apiKey || '', model, messages, baseUrl || 'http://localhost:8000/v1');
      case 'ollama':
      default:
        return this.queryOllama(baseUrl || 'http://localhost:11434', model, messages);
    }
  }

  private static async queryOllama(baseUrl: string, model: string, messages: AIChatMessage[]): Promise<string> {
    const res = await axios.post(`${baseUrl}/api/chat`, { model, messages, stream: false }, { timeout: 30000 });
    return res.data?.message?.content || '';
  }

  private static async queryOpenAI(apiKey: string, model: string, messages: AIChatMessage[], baseUrl: string): Promise<string> {
    const res = await axios.post(
      `${baseUrl}/chat/completions`,
      { model: model || 'gpt-4o-mini', messages },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      }
    );
    return res.data?.choices?.[0]?.message?.content || '';
  }

  private static async queryAnthropic(apiKey: string, model: string, messages: AIChatMessage[]): Promise<string> {
    const systemMsg = messages.find((m) => m.role === 'system')?.content;
    const userMsgs = messages.filter((m) => m.role !== 'system');

    const res = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: model || 'claude-3-5-sonnet-20241022',
        max_tokens: 4096,
        system: systemMsg,
        messages: userMsgs.map((m) => ({ role: m.role, content: m.content })),
      },
      {
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      }
    );
    return res.data?.content?.[0]?.text || '';
  }

  private static async queryGemini(apiKey: string, model: string, messages: AIChatMessage[]): Promise<string> {
    const geminiModel = model || 'gemini-1.5-flash';
    const contents = messages
      .filter((m) => m.role !== 'system')
      .map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      }));

    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${apiKey}`,
      { contents },
      { timeout: 30000 }
    );
    return res.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  }
}
