import React from 'react';

export const VariablesView: React.FC = () => {
  const variables = [
    { name: 'this', value: 'Window', type: 'object' },
    { name: 'activeTabId', value: '"tab-89a"', type: 'string' },
    { name: 'itemCount', value: '42', type: 'number' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '8px' }}>
      <div style={{ fontSize: '11px', fontWeight: 600, color: '#aaaaaa', textTransform: 'uppercase' }}>
        Переменные (Locals)
      </div>
      {variables.map((v) => (
        <div key={v.name} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
          <span style={{ color: '#9CDCFE' }}>{v.name}:</span>
          <span style={{ color: '#CE9178' }}>{v.value}</span>
        </div>
      ))}
    </div>
  );
};
