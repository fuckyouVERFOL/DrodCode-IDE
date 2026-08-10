export interface EditorFile {
  id: string;
  path: string;
  name: string;
  content: string;
  language: string;
  isDirty: boolean;
  isReadOnly?: boolean;
  encoding?: string;
  cursorPosition?: { line: number; column: number };
}

export interface EditorTab {
  id: string;
  fileId: string;
  active: boolean;
  pinned?: boolean;
}

export interface EditorGroup {
  id: string;
  tabs: EditorTab[];
  activeTabId: string | null;
}

export interface DiagnosticItem {
  id: string;
  filePath: string;
  line: number;
  column: number;
  message: string;
  severity: 'error' | 'warning' | 'info' | 'hint';
  source?: string;
}

export interface CodeSnippet {
  prefix: string;
  name: string;
  body: string[];
  description?: string;
  scope?: string;
}
