import React from 'react';
import { useEditorStore } from '../../store/editorStore';
import { X, FileCode } from 'lucide-react';

export const EditorTabs: React.FC = () => {
  const { files, tabs, activeTabId, setActiveTab, closeTab } = useEditorStore();

  if (tabs.length === 0) return null;

  return (
    <div
      style={{
        display: 'flex',
        backgroundColor: '#252526',
        borderBottom: '1px solid #3c3c3c',
        overflowX: 'auto',
      }}
    >
      {tabs.map((tab) => {
        const file = files.get(tab.fileId);
        const isActive = tab.id === activeTabId;

        if (!file) return null;

        return (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '6px 12px',
              gap: '6px',
              backgroundColor: isActive ? '#1e1e1e' : '#2d2d2d',
              color: isActive ? '#ffffff' : '#999999',
              borderRight: '1px solid #3c3c3c',
              borderTop: isActive ? '2px solid #007acc' : '2px solid transparent',
              cursor: 'pointer',
              fontSize: '12px',
              minWidth: '120px',
              maxWidth: '200px',
            }}
          >
            <FileCode size={14} color="#569CD6" />
            <span
              style={{
                flex: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {file.name} {file.isDirty ? '●' : ''}
            </span>
            <X
              size={14}
              onClick={(e) => {
                e.stopPropagation();
                closeTab(tab.id);
              }}
              style={{ borderRadius: '3px', padding: '2px' }}
            />
          </div>
        );
      })}
    </div>
  );
};
