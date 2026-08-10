import { Keybinding } from '../types/settings';

export const DEFAULT_KEYBINDINGS: Keybinding[] = [
  { command: 'workbench.action.files.save', key: 'Ctrl+S' },
  { command: 'workbench.action.files.openFile', key: 'Ctrl+O' },
  { command: 'workbench.action.files.openFolder', key: 'Ctrl+K Ctrl+O' },
  { command: 'workbench.action.findInFiles', key: 'Ctrl+Shift+F' },
  { command: 'workbench.action.terminal.toggle', key: 'Ctrl+`' },
  { command: 'workbench.action.terminal.new', key: 'Ctrl+Shift+`' },
  { command: 'workbench.action.showCommands', key: 'Ctrl+Shift+P' },
  { command: 'editor.action.commentLine', key: 'Ctrl+/' },
  { command: 'editor.action.formatDocument', key: 'Shift+Alt+F' },
  { command: 'workbench.action.closeActiveEditor', key: 'Ctrl+W' },
  { command: 'workbench.action.toggleSidebar', key: 'Ctrl+B' },
  { command: 'editor.action.triggerSuggest', key: 'Ctrl+Space' },
];
