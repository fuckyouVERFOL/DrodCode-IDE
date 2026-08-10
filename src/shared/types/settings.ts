export interface EditorSettings {
  fontSize: number;
  fontFamily: string;
  tabSize: number;
  wordWrap: 'on' | 'off' | 'wordWrapColumn';
  minimap: { enabled: boolean };
  renderWhitespace: 'none' | 'boundary' | 'selection' | 'all';
  autoSave: 'off' | 'afterDelay' | 'onFocusChange';
  autoSaveDelay: number;
  formatOnSave: boolean;
  bracketPairColorization: boolean;
  lineNumbers: 'on' | 'off' | 'relative';
}

export interface TerminalSettings {
  fontSize: number;
  fontFamily: string;
  cursorStyle: 'block' | 'underline' | 'bar';
  shell: string;
}

export interface ThemeSettings {
  name: string;
  type: 'dark' | 'light';
  colors: Record<string, string>;
}

export interface Keybinding {
  command: string;
  key: string;
  when?: string;
}

export interface IDESettings {
  editor: EditorSettings;
  terminal: TerminalSettings;
  theme: ThemeSettings;
  keybindings: Keybinding[];
  locale: 'en' | 'ru';
}
