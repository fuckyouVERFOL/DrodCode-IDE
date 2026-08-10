export interface AIChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export class AIChatEngine {
  public async generateResponse(messages: AIChatMessage[], contextCode?: string): Promise<string> {
    const userPrompt = messages[messages.length - 1]?.content || '';
    
    if (userPrompt.toLowerCase().includes('json') || userPrompt.toLowerCase().includes('парсинг')) {
      return `Вот функция для парсинга и валидации JSON с обработкой ошибок:

\`\`\`typescript
function parseJSONSafe<T>(jsonString: string, defaultValue: T): T {
  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.error("JSON parsing error:", error);
    return defaultValue;
  }
}
\`\`\``;
    }

    if (contextCode) {
      return `Я проанализировал текущий файл. Код содержит ${contextCode.split('\n').length} строк.\n\nПо вашему запросу "${userPrompt}":\n\nМогу порекомендовать добавить вызов типов и вынести повторяющуюся логику в отдельные модули для оптимизации читаемости.`;
    }

    return `Ассистент DrodCode AI к вашим услугам! Вы спросили: "${userPrompt}". Вы можете попросить меня сгенерировать код, исправить ошибки в файле или описать архитектуру текущего проекта.`;
  }
}

export const aiChatEngine = new AIChatEngine();
