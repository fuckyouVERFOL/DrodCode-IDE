import React from 'react';
import { EditorTabs } from './EditorTabs';
import { MonacoEditor } from './MonacoEditor';
import { DiffViewer } from './DiffViewer';
import { useEditor } from '../../hooks/useEditor';
import { useEditorStore } from '../../store/editorStore';
import { Code2 } from 'lucide-react';

export const EditorGroup: React.FC = () => {
  const { activeFile, updateFileContent } = useEditor();
  const { diffMode } = useEditorStore();

  if (diffMode) {
    return <DiffViewer />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      <EditorTabs />
      {activeFile ? (
        <div style={{ flex: 1, position: 'relative' }}>
          <MonacoEditor
            content={activeFile.content}
            language={activeFile.language}
            onChange={(val) => updateFileContent(activeFile.id, val)}
          />
        </div>
      ) : (
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#666666',
            gap: '12px',
          }}
        >
          <Code2 size={64} color="#3c3c3c" />
          <h2>DrodCode IDE</h2>
          <p style={{ fontSize: '13px' }}>Выберите файл в проводнике или нажмите Ctrl+O для открытия</p>
        </div>
      )}
    </div>
  );
};
