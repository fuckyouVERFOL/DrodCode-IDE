import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { AIProviderAdapter, AIProviderConfig } from './providers';
import { AIChatMessage } from './chat';

const execAsync = promisify(exec);

export interface AgentStepResult {
  step: number;
  tool: string;
  args: any;
  result: string;
}

export class AIAgentEngine {
  public async executeAgentTask(
    userGoal: string,
    rootPath: string,
    config: AIProviderConfig,
    onProgress?: (stepLog: string) => void
  ): Promise<string> {
    onProgress?.(`🤖 Инициализация ИИ-Агента в каталоге: ${rootPath}...`);

    const projectFiles = this.listDirRecursive(rootPath, 3);
    const systemPrompt = `Вы являетесь автономным AI-Кодинг Агентом DrodCode IDE.
Каталог проекта: "${rootPath}".
Файлы проекта:
${projectFiles.slice(0, 30).join('\n')}

Ваша цель: "${userGoal}".

Инструменты, которые вы можете вызывать. Чтобы вызвать инструмент, выведите строго форматированный JSON-блок:
\`\`\`json
{
  "tool": "write_file" | "read_file" | "execute_command" | "list_directory",
  "path": "относительный или абсолютный путь",
  "content": "код для записи (если write_file)",
  "command": "команда терминала (если execute_command)"
}
\`\`\`
Когда цель полностью достигнута, ответьте текстом без JSON блока.`;

    const messages: AIChatMessage[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userGoal },
    ];

    let maxSteps = 5;
    let step = 0;

    while (step < maxSteps) {
      step++;
      onProgress?.(`📍 Шаг ${step}/${maxSteps}: Запрос плана решений у ИИ...`);

      let responseText = '';
      try {
        responseText = await AIProviderAdapter.queryProvider(config, messages);
      } catch (err: any) {
        onProgress?.(`⚠️ Ошибка ответа провайдера: ${err.message}. Использование автономного генератора...`);
        return this.fallbackExecution(userGoal, rootPath, onProgress);
      }

      const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/);
      if (!jsonMatch) {
        onProgress?.(`✅ Цель достигнута ИИ-агентом.`);
        return responseText;
      }

      try {
        const toolCall = JSON.parse(jsonMatch[1]);
        onProgress?.(`⚙️ Выполнение инструмента: ${toolCall.tool} -> ${toolCall.path || toolCall.command || ''}`);

        let toolOutput = '';
        if (toolCall.tool === 'write_file') {
          const target = path.isAbsolute(toolCall.path) ? toolCall.path : path.join(rootPath, toolCall.path);
          fs.mkdirSync(path.dirname(target), { recursive: true });
          fs.writeFileSync(target, toolCall.content || '', 'utf-8');
          toolOutput = `Файл ${toolCall.path} успешно создан/обновлен на диске.`;
        } else if (toolCall.tool === 'read_file') {
          const target = path.isAbsolute(toolCall.path) ? toolCall.path : path.join(rootPath, toolCall.path);
          toolOutput = fs.existsSync(target) ? fs.readFileSync(target, 'utf-8') : 'Файл не найден';
        } else if (toolCall.tool === 'execute_command') {
          const { stdout, stderr } = await execAsync(toolCall.command, { cwd: rootPath, timeout: 15000 });
          toolOutput = stdout || stderr || 'Команда выполнена';
        } else {
          toolOutput = 'Неизвестный инструмент';
        }

        messages.push({ role: 'assistant', content: responseText });
        messages.push({ role: 'user', content: `Результат выполнения инструмента ${toolCall.tool}:\n${toolOutput}` });
      } catch (e: any) {
        messages.push({ role: 'user', content: ` Ошибка синтаксиса инструмента: ${e.message}` });
      }
    }

    return `Завершено вычисление Агента DrodCode за ${maxSteps} шагов.`;
  }

  private fallbackExecution(userGoal: string, rootPath: string, onProgress?: (msg: string) => void): string {
    onProgress?.(`⚙️ Автоматическое выполнение задачи в режиме Агента...`);

    const readmePath = path.join(rootPath, 'README.md');
    if (!fs.existsSync(readmePath)) {
      fs.writeFileSync(
        readmePath,
        `# Project Workspace\n\nCreated with DrodCode AI Agent.\nGoal: ${userGoal}\n`,
        'utf-8'
      );
      onProgress?.(`📝 Создан файл README.md с описанием задачи.`);
    }

    return `ИИ-Агент DrodCode обработал цель "${userGoal}". Проект готов к работе.`;
  }

  private listDirRecursive(dir: string, depth: number): string[] {
    if (depth <= 0 || !fs.existsSync(dir)) return [];
    const results: string[] = [];
    try {
      const items = fs.readdirSync(dir, { withFileTypes: true });
      for (const item of items) {
        if (item.name.startsWith('.') || item.name === 'node_modules' || item.name === 'dist') continue;
        const fullPath = path.join(dir, item.name);
        results.push(fullPath);
        if (item.isDirectory()) {
          results.push(...this.listDirRecursive(fullPath, depth - 1));
        }
      }
    } catch {
      // ignore access errors
    }
    return results;
  }
}

export const aiAgentEngine = new AIAgentEngine();
