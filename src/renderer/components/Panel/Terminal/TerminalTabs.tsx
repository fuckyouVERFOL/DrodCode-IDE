import React from 'react';
import { useTerminal } from '../../../hooks/useTerminal';
import { Plus, X, Terminal as TerminalIcon } from 'lucide-react';

export const TerminalTabs: React.FC = () => {
  const { tabs, activeTabId, spawnTerminal, killTerminal, setActiveTab } = useTerminal();

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#252526',
        borderBottom: '1px solid #3c3c3c',
        paddingRight: '8px',
      }}
    >
      <div style={{ display: 'flex', flex: 1, overflowX: 'auto' }}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '4px 10px',
                gap: '6px',
                backgroundColor: isActive ? '#1e1e1e' : '#2d2d2d',
                color: isActive ? '#ffffff' : '#999999',
                borderRight: '1px solid #3c3c3c',
                cursor: 'pointer',
                fontSize: '12px',
              }}
            >
              <TerminalIcon size={12} color="#4EC9B0" />
              <span>{tab.title}</span>
              <X
                size={12}
                onClick={(e) => {
                  e.stopPropagation();
                  killTerminal(tab.id);
                }}
              />
            </div>
          );
        })}
      </div>
      <button
        onClick={() => spawnTerminal()}
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '4px',
          color: '#cccccc',
        }}
        title="Новый терминал"
      >
        <Plus size={14} />
      </button>
    </div>
  );
};
