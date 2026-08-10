import { Menu, BrowserWindow, app, shell, dialog } from 'electron';

export function createApplicationMenu(window: BrowserWindow): void {
  const template: Electron.MenuItemConstructorOptions[] = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New File',
          accelerator: 'CmdOrCtrl+N',
          click: () => window.webContents.send('menu:action', 'new-file'),
        },
        {
          label: 'Open File...',
          accelerator: 'CmdOrCtrl+O',
          click: () => window.webContents.send('menu:action', 'open-file'),
        },
        {
          label: 'Open Folder...',
          accelerator: 'CmdOrCtrl+K CmdOrCtrl+O',
          click: () => window.webContents.send('menu:action', 'open-folder'),
        },
        { type: 'separator' },
        {
          label: 'Save',
          accelerator: 'CmdOrCtrl+S',
          click: () => window.webContents.send('menu:action', 'save-file'),
        },
        {
          label: 'Save As...',
          accelerator: 'CmdOrCtrl+Shift+S',
          click: () => window.webContents.send('menu:action', 'save-as-file'),
        },
        { type: 'separator' },
        { role: 'quit' },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectAll' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
    {
      label: 'Terminal',
      submenu: [
        {
          label: 'New Terminal',
          accelerator: 'CmdOrCtrl+Shift+`',
          click: () => window.webContents.send('menu:action', 'new-terminal'),
        },
        {
          label: 'Toggle Terminal',
          accelerator: 'CmdOrCtrl+`',
          click: () => window.webContents.send('menu:action', 'toggle-terminal'),
        },
      ],
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'DrodCode Documentation',
          click: async () => {
            await shell.openExternal('https://github.com/fuckyouVERFOL/DrodCode-IDE');
          },
        },
        {
          label: 'About DrodCode IDE',
          click: () => {
            dialog.showMessageBox(window, {
              type: 'info',
              title: 'О программе DrodCode IDE',
              message: 'DrodCode IDE v1.0.0',
              detail: 'Полнофункциональная кроссплатформенная IDE (Monaco + Terminal + Git + DAP Debugger + AI Assistant)\n\nРепозиторий: https://github.com/fuckyouVERFOL/DrodCode-IDE\nЛицензия: MIT',
              buttons: ['OK'],
            });
            window.webContents.send('menu:action', 'about');
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
