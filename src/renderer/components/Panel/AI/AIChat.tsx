import React, { useState, useEffect } from 'react';
import { IPCService } from '../../../services/ipcService';
import { IPC_CHANNELS } from '../../../../main/ipc/channels';
import { useEditor } from '../../../hooks/useEditor';
import { Send, Bot, User, Sparkles, Cpu } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Привет! Я ассистент DrodCode AI. Выберите модель (Qwen/Llama/DeepSeek) и задайте любой вопрос по коду.' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [models, setModels] = useState<string[]>(['qwen2.5-coder', 'llama3', 'deepseek-r1', 'mistral']);
  const [selectedModel, setSelectedModel] = useState<string>('qwen2.5-coder');
  const { activeFile } = useEditor();

  useEffect(() => {
    IPCService.invoke(IPC_CHANNELS.AI.GET_MODELS).then((res: any) => {
      if (res && res.success && Array.isArray(res.models) && res.models.length > 0) {
        setModels(res.models);
        if (!res.models.includes(selectedModel)) {
          setSelectedModel(res.models[0]);
        }
      }
    });
  }, []);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

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
      });

      if (res.success) {
        setMessages([...updatedMsgs, { role: 'assistant', content: res.response }]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
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
          color: '#bbbbbb',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={14} color="#4EC9B0" />
          <span>DrodCode AI</span>
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
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {messages.map((m, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              gap: '8px',
              backgroundColor: m.role === 'user' ? '#2d2d2d' : '#1e1e1e',
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #3c3c3c',
            }}
          >
            {m.role === 'user' ? <User size={16} color="#569CD6" /> : <Bot size={16} color="#4EC9B0" />}
            <div style={{ fontSize: '12px', whiteSpace: 'pre-wrap', lineHeight: '1.4' }}>{m.content}</div>
          </div>
        ))}
        {loading && (
          <div style={{ fontSize: '11px', color: '#888888', fontStyle: 'italic' }}>
            Генерация ответа через {selectedModel}...
          </div>
        )}
      </div>

      <div style={{ padding: '8px', display: 'flex', gap: '6px', borderTop: '1px solid #3c3c3c' }}>
        <input
          type="text"
          placeholder={`Задайте вопрос нейросети (${selectedModel})...`}
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
          }}
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );
};
