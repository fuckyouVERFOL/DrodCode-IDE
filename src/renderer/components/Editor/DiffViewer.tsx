import React from 'react';
import { DiffEditor } from '@monaco-editor/react';
import { useEditorStore } from '../../store/editorStore';
import { X } from 'lucide-react';

export const DiffViewer: React.FC = () => {
  const { diffFiles, closeDiff } = useEditorStore();

  if (!diffFiles) return null;

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '6px 12px',
          backgroundColor: '#252526',
          borderBottom: '1px solid #3c3c3c',
        }}
      >
        <span style={{ fontSize: '12px', fontWeight: 600 }}>Diff Compare Viewer</span>
        <X size={16} style={{ cursor: 'pointer' }} onClick={closeDiff} />
      </div>
      <div style={{ flex: 1 }}>
        <DiffEditor
          height="100%"
          original={diffFiles.original}
          modified={diffFiles.modified}
          theme="vs-dark"
          options={{ readOnly: true, automaticLayout: true }}
        />
      </div>
    </div>
  );
};
