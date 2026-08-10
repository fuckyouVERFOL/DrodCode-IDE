import React, { useRef } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { useSettingsStore } from '../../store/settingsStore';

interface MonacoEditorProps {
  content: string;
  language: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
}

export const MonacoEditor: React.FC<MonacoEditorProps> = ({
  content,
  language,
  onChange,
  readOnly = false,
}) => {
  const { settings } = useSettingsStore();
  const editorRef = useRef<any>(null);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // Define custom DrodCode Dark Theme
    monaco.editor.defineTheme('drodcode-dark-theme', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
        { token: 'keyword', foreground: '569CD6', fontStyle: 'bold' },
        { token: 'string', foreground: 'CE9178' },
        { token: 'number', foreground: 'B5CEA8' },
        { token: 'type', foreground: '4EC9B0' },
        { token: 'function', foreground: 'DCDCAA' },
      ],
      colors: {
        'editor.background': '#1e1e1e',
        'editor.foreground': '#d4d4d4',
        'editorLineNumber.foreground': '#858585',
        'editor.selectionBackground': '#264F78',
        'editor.inactiveSelectionBackground': '#3A3D41',
      },
    });

    monaco.editor.setTheme('drodcode-dark-theme');
  };

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <Editor
        height="100%"
        language={language}
        value={content}
        onChange={(val) => onChange && onChange(val || '')}
        onMount={handleEditorDidMount}
        options={{
          readOnly,
          fontSize: settings.editor.fontSize,
          fontFamily: settings.editor.fontFamily,
          tabSize: settings.editor.tabSize,
          wordWrap: settings.editor.wordWrap,
          minimap: { enabled: settings.editor.minimap.enabled },
          renderWhitespace: settings.editor.renderWhitespace,
          bracketPairColorization: { enabled: settings.editor.bracketPairColorization },
          lineNumbers: settings.editor.lineNumbers as any,
          automaticLayout: true,
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          cursorBlinking: 'smooth',
          fontLigatures: true,
        }}
      />
    </div>
  );
};
