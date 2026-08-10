import axios from 'axios';

export interface AIChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export class AIChatEngine {
  private ollamaUrl = 'http://localhost:11434';

  public async getAvailableModels(): Promise<string[]> {
    try {
      const res = await axios.get(`${this.ollamaUrl}/api/tags`, { timeout: 2000 });
      if (res.data && Array.isArray(res.data.models)) {
        return res.data.models.map((m: any) => m.name);
      }
    } catch {
      // Ollama not running or no tags
    }
    return ['qwen2.5-coder', 'qwen2.5', 'llama3', 'deepseek-r1', 'mistral', 'codellama'];
  }

  public async generateResponse(
    messages: AIChatMessage[],
    contextCode?: string,
    modelName: string = 'qwen2.5-coder'
  ): Promise<string> {
    const formattedMessages = [...messages];

    if (contextCode) {
      formattedMessages.unshift({
        role: 'system',
        content: `Вы являетесь главным ИИ-ассистентом DrodCode IDE. Контекст текущего открытого файла проекта:\n\`\`\`\n${contextCode}\n\`\`\``,
      });
    }

    try {
      // 1. Try Ollama local chat API
      const response = await axios.post(
        `${this.ollamaUrl}/api/chat`,
        {
          model: modelName,
          messages: formattedMessages,
          stream: false,
        },
        { timeout: 30000 }
      );

      if (response.data && response.data.message && response.data.message.content) {
        return response.data.message.content;
      }
    } catch (err: any) {
      console.warn('[AI] Ollama API error, checking fallback:', err.message);
    }

    // Fallback if local Ollama service is not running or model not pulled
    const userPrompt = messages[messages.length - 1]?.content || '';
    return `⚠️ **Локальный сервер Ollama не обнаружен или модель \`${modelName}\` не загружена.**\n\n` +
      `Чтобы использовать реальную локальную нейросеть (Qwen / Llama / DeepSeek):\n` +
      `1. Установите и запустите **Ollama** ([ollama.com](https://ollama.com))\n` +
      `2. Выполните команду в терминале: \`ollama run ${modelName}\`\n\n` +
      `*Ответ по вашему запросу "${userPrompt}":*\n` +
      `Код и структура готовы к обработке. Как только Ollama будет запущен, я буду отвечать напрямую через локальную модель **${modelName}**.`;
  }
}

export const aiChatEngine = new AIChatEngine();
