import { ipcMain } from 'electron';
import { IPC_CHANNELS } from '../channels';
import { aiChatEngine, AIChatMessage } from '../../ai/chat';
import { aiCompletionEngine } from '../../ai/completion';
import { aiAgentEngine } from '../../ai/agent';
import { AIProviderConfig } from '../../ai/providers';

export function registerAIHandlers(): void {
  ipcMain.handle(
    IPC_CHANNELS.AI.CHAT,
    async (_, payload: { messages: AIChatMessage[]; contextCode?: string; modelName?: string; providerConfig?: AIProviderConfig }) => {
      try {
        const response = await aiChatEngine.generateResponse(
          payload.messages,
          payload.contextCode,
          payload.modelName,
          payload.providerConfig
        );
        return { success: true, response };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    },
  );

  ipcMain.handle(
    IPC_CHANNELS.AI.EXECUTE_AGENT,
    async (event, payload: { userGoal: string; rootPath: string; providerConfig: AIProviderConfig }) => {
      try {
        const result = await aiAgentEngine.executeAgentTask(
          payload.userGoal,
          payload.rootPath || process.cwd(),
          payload.providerConfig,
          (logMsg) => {
            event.sender.send('ai:agent-progress', logMsg);
          }
        );
        return { success: true, result };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    }
  );

  ipcMain.handle(IPC_CHANNELS.AI.GET_MODELS, async () => {
    try {
      const models = await aiChatEngine.getAvailableModels();
      return { success: true, models };
    } catch (err: any) {
      return { success: false, models: ['qwen2.5-coder', 'llama3', 'deepseek-r1', 'gpt-4o', 'claude-3-5-sonnet', 'gemini-1.5-flash'] };
    }
  });

  ipcMain.handle(
    IPC_CHANNELS.AI.COMPLETE,
    async (_, payload: { prefix: string; suffix: string; language: string }) => {
      try {
        const suggestion = await aiCompletionEngine.getInlineCompletion(
          payload.prefix,
          payload.suffix,
          payload.language,
        );
        return { success: true, suggestion };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    },
  );

  ipcMain.handle(IPC_CHANNELS.AI.EXPLAIN, async (_, code: string) => {
    try {
      const explanation = await aiCompletionEngine.explainCode(code);
      return { success: true, explanation };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle(IPC_CHANNELS.AI.FIX_ERRORS, async (_, payload: { code: string; error: string }) => {
    try {
      const fixedCode = await aiCompletionEngine.fixErrors(payload.code, payload.error);
      return { success: true, fixedCode };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle(IPC_CHANNELS.AI.REFACTOR, async (_, code: string) => {
    try {
      const refactoredCode = await aiCompletionEngine.refactorCode(code);
      return { success: true, refactoredCode };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });
}
