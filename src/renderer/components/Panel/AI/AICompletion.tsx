import React from 'react';
import { Sparkles, Check } from 'lucide-react';

interface AICompletionProps {
  suggestion: string;
  onAccept: () => void;
}

export const AICompletion: React.FC<AICompletionProps> = ({ suggestion, onAccept }) => {
  if (!suggestion) return null;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        padding: '6px 12px',
        backgroundColor: '#2d2d2d',
        borderTop: '1px solid #0e639c',
        fontSize: '12px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4EC9B0' }}>
        <Sparkles size={14} />
        <span>AI автодополнение: {suggestion}</span>
      </div>
      <button
        onClick={onAccept}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          backgroundColor: '#0e639c',
          color: '#ffffff',
          padding: '3px 8px',
          borderRadius: '2px',
        }}
      >
        <Check size={12} /> Применить (Tab)
      </button>
    </div>
  );
};
