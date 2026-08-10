import React from 'react';

export const CallStack: React.FC = () => {
  const frames = [
    { name: 'onMount', file: 'MonacoEditor.tsx', line: 18 },
    { name: 'renderApp', file: 'App.tsx', line: 45 },
    { name: 'main', file: 'index.tsx', line: 12 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '8px' }}>
      <div style={{ fontSize: '11px', fontWeight: 600, color: '#aaaaaa', textTransform: 'uppercase' }}>
        Стек вызовов (Call Stack)
      </div>
      {frames.map((f, i) => (
        <div key={i} style={{ display: 'flex', gap: '6px', fontSize: '12px' }}>
          <span style={{ color: '#DCDCAA' }}>{f.name}</span>
          <span style={{ color: '#888888' }}>
            ({f.file}:{f.line})
          </span>
        </div>
      ))}
    </div>
  );
};
