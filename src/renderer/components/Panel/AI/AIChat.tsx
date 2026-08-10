import React, { useState } from 'react';
import { IPCService } from '../../../services/ipcService';
import { IPC_CHANNELS } from '../../../../main/ipc/channels';
import { useEditor } from '../../../hooks/useEditor';
import { Send, Bot, User, Sparkles } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Привет! Я ассистент DrodCode AI. Чем могу помочь по коду приложения?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { activeFile } = useEditor();

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
          alignItems: 'center',
          gap: '6px',
          padding: '8px 12px',
          backgroundColor: '#252526',
          borderBottom: '1px solid #3c3c3c',
          textTransform: 'uppercase',
          fontSize: '11px',
          fontWeight: 600,
          color: '#bbbbbb',
        }}
      >
        <Sparkles size={14} color="#4EC9B0" />
        <span>DrodCode AI Chat</span>
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
        {loading && <div style={{ fontSize: '11px', color: '#888888', fontStyle: 'italic' }}>Генерация ответа...</div>}
      </div>

      <div style={{ padding: '8px', display: 'flex', gap: '6px', borderTop: '1px solid #3c3c3c' }}>
        <input
          type="text"
          placeholder="Спроси AI про код текущего файла..."
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
