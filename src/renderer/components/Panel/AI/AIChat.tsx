import React, { useState, useEffect } from 'react';
import { IPCService } from '../../../services/ipcService';
import { IPC_CHANNELS } from '../../../../main/ipc/channels';
import { useEditor } from '../../../hooks/useEditor';
import { useEditorStore } from '../../../store/editorStore';
import { Send, Bot, User, Sparkles, Cpu, Settings as SettingsIcon, Play, ShieldAlert } from 'lucide-react';
import { AIProviderConfig } from '../../../../main/ai/providers';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const AIChat: React.FC = () => {
  const [mode, setMode] = useState<'chat' | 'agent'>('chat');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Привет! Я ИИ-Ассистент DrodCode IDE. Переключайтесь между обычном чатом и режимом авто-Агента.' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [agentLogs, setAgentLogs] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>(['qwen2.5-coder', 'llama3', 'deepseek-r1', 'gpt-4o', 'claude-3-5-sonnet', 'gemini-1.5-flash']);
  const [selectedModel, setSelectedModel] = useState<string>('qwen2.5-coder');

  const [providerConfig, setProviderConfig] = useState<AIProviderConfig>({
    provider: 'ollama',
    model: 'qwen2.5-coder',
    apiKey: '',
  });

  const [showConfigModal, setShowConfigModal] = useState(false);
  const { activeFile } = useEditor();
  const { rootPath } = useEditorStore();

  useEffect(() => {
    IPCService.invoke(IPC_CHANNELS.AI.GET_MODELS).then((res: any) => {
      if (res && res.success && Array.isArray(res.models) && res.models.length > 0) {
        setModels(res.models);
      }
    });

    const removeProgressListener = IPCService.on('ai:agent-progress', (logMsg: string) => {
      setAgentLogs((prev) => [...prev, logMsg]);
    });

    return () => removeProgressListener();
  }, []);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    if (mode === 'agent') {
      const goal = input.trim();
      setInput('');
      setLoading(true);
      setAgentLogs([`🚀 Запуск ИИ-Агента для цели: "${goal}"`]);

      try {
        const res = await IPCService.invoke(IPC_CHANNELS.AI.EXECUTE_AGENT, {
          userGoal: goal,
          rootPath: rootPath || process.cwd(),
          providerConfig: { ...providerConfig, model: selectedModel },
        });

        if (res.success) {
          setAgentLogs((prev) => [...prev, `🏁 Результат: ${res.result}`]);
        } else {
          setAgentLogs((prev) => [...prev, `❌ Ошибка Агента: ${res.error}`]);
        }
      } finally {
        setLoading(false);
      }
      return;
    }

    const userMsg: ChatMessage = { role: 'user', content: input };
    const updatedMsgs = [...messages, userMsg];
    setMessages(updatedMsgs);
    setInput('');
    setLoading(true);

    try {
      const res = await IPCService.invoke(IPC_CHANNELS.AI.CHAT, {
        messages: updatedMsgs,
        contextCode: activeFile ? activeFile.content : undefined,
        modelName: selectedModel,
        providerConfig: { ...providerConfig, model: selectedModel },
      });

      if (res.success) {
        setMessages([...updatedMsgs, { role: 'assistant', content: res.response }]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', backgroundColor: '#1e1e1e', color: '#cccccc' }}>
      {/* Header Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 12px',
          backgroundColor: '#252526',
          borderBottom: '1px solid #3c3c3c',
          fontSize: '11px',
          fontWeight: 600,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={14} color="#4EC9B0" />
          <span>DrodCode AI</span>

          {/* Mode Switcher */}
          <div style={{ display: 'flex', backgroundColor: '#3c3c3c', borderRadius: '3px', padding: '2px', marginLeft: '6px' }}>
            <button
              onClick={() => setMode('chat')}
              style={{
                backgroundColor: mode === 'chat' ? '#0e639c' : 'transparent',
                color: '#ffffff',
                border: 'none',
                padding: '2px 8px',
                borderRadius: '2px',
                fontSize: '10px',
                cursor: 'pointer',
              }}
            >
              Чат
            </button>
            <button
              onClick={() => setMode('agent')}
              style={{
                backgroundColor: mode === 'agent' ? '#0e639c' : 'transparent',
                color: '#ffffff',
                border: 'none',
                padding: '2px 8px',
                borderRadius: '2px',
                fontSize: '10px',
                cursor: 'pointer',
              }}
            >
              Агент
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Cpu size={14} color="#569CD6" />
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            style={{
              backgroundColor: '#3c3c3c',
              color: '#ffffff',
              border: '1px solid #555555',
              borderRadius: '3px',
              padding: '2px 6px',
              fontSize: '11px',
              cursor: 'pointer',
            }}
          >
            {models.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          <button
            onClick={() => setShowConfigModal(true)}
            style={{ backgroundColor: 'transparent', border: 'none', color: '#aaaaaa', cursor: 'pointer', padding: '2px' }}
            title="Настройки провайдеров API"
          >
            <SettingsIcon size={14} />
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {mode === 'chat' ? (
          messages.map((m, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                gap: '8px',
                backgroundColor: m.role === 'user' ? '#2d2d2d' : '#252526',
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid #3c3c3c',
              }}
            >
              {m.role === 'user' ? <User size={16} color="#569CD6" /> : <Bot size={16} color="#4EC9B0" />}
              <div style={{ fontSize: '12px', whiteSpace: 'pre-wrap', lineHeight: '1.4', flex: 1 }}>{m.content}</div>
            </div>
          ))
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ fontSize: '11px', color: '#aaaaaa', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Play size={12} color="#4EC9B0" /> Автономный режим Агента. Введите цель (например: "Создать файл auth.ts с авторизацией").
            </div>
            {agentLogs.map((log, idx) => (
              <div
                key={idx}
                style={{
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  backgroundColor: '#1b1b1b',
                  padding: '6px 10px',
                  borderRadius: '4px',
                  borderLeft: '3px solid #0e639c',
                }}
              >
                {log}
              </div>
            ))}
          </div>
        )}

        {loading && (
          <div style={{ fontSize: '11px', color: '#888888', fontStyle: 'italic' }}>
            {mode === 'agent' ? 'Выполнение шагов Агентом...' : `Генерация ответа через ${selectedModel}...`}
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div style={{ padding: '8px', display: 'flex', gap: '6px', borderTop: '1px solid #3c3c3c' }}>
        <input
          type="text"
          placeholder={mode === 'agent' ? 'Опишите цель для ИИ-Агента...' : `Задайте вопрос нейросети (${selectedModel})...`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          style={{
            flex: 1,
            backgroundColor: '#3c3c3c',
            color: '#ffffff',
            padding: '6px 10px',
            borderRadius: '4px',
            fontSize: '12px',
          }}
        />
        <button
          onClick={handleSend}
          style={{
            backgroundColor: '#0e639c',
            color: '#ffffff',
            padding: '6px 10px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <Send size={14} />
        </button>
      </div>

      {/* Config Modal */}
      {showConfigModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              width: '380px',
              backgroundColor: '#252526',
              border: '1px solid #3c3c3c',
              borderRadius: '6px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <h3 style={{ margin: 0, fontSize: '14px', color: '#ffffff' }}>Настройки ИИ Провайдеров</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px' }}>
              <label>Провайдер:</label>
              <select
                value={providerConfig.provider}
                onChange={(e: any) => setProviderConfig({ ...providerConfig, provider: e.target.value })}
                style={{ backgroundColor: '#3c3c3c', color: '#ffffff', padding: '6px', borderRadius: '4px' }}
              >
                <option value="ollama">Ollama (Локальный)</option>
                <option value="openai">OpenAI (GPT-4o)</option>
                <option value="anthropic">Anthropic (Claude 3.5)</option>
                <option value="gemini">Google Gemini</option>
                <option value="custom">Custom REST API</option>
              </select>
            </div>

            {providerConfig.provider !== 'ollama' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px' }}>
                <label>API Key:</label>
                <input
                  type="password"
                  placeholder="sk-..."
                  value={providerConfig.apiKey || ''}
                  onChange={(e) => setProviderConfig({ ...providerConfig, apiKey: e.target.value })}
                  style={{ backgroundColor: '#3c3c3c', color: '#ffffff', padding: '6px', borderRadius: '4px' }}
                />
              </div>
            )}

            {providerConfig.provider === 'custom' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px' }}>
                <label>Base URL:</label>
                <input
                  type="text"
                  placeholder="http://localhost:8000/v1"
                  value={providerConfig.baseUrl || ''}
                  onChange={(e) => setProviderConfig({ ...providerConfig, baseUrl: e.target.value })}
                  style={{ backgroundColor: '#3c3c3c', color: '#ffffff', padding: '6px', borderRadius: '4px' }}
                />
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
              <button
                onClick={() => setShowConfigModal(false)}
                style={{ backgroundColor: '#0e639c', color: '#ffffff', padding: '6px 14px', borderRadius: '4px', cursor: 'pointer' }}
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
