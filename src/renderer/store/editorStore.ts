import { create } from 'zustand';
import { EditorFile, EditorTab, DiagnosticItem } from '../../shared/types/editor';
import { generateId } from '../../shared/utils/string';
import { getLanguageByExtension } from '../../shared/constants/languages';
import { getFileExtension } from '../../shared/utils/path';

interface EditorState {
  files: Map<string, EditorFile>;
  tabs: EditorTab[];
  activeTabId: string | null;
  diagnostics: DiagnosticItem[];
  diffMode: boolean;
  diffFiles: { original: string; modified: string } | null;

  openFile: (path: string, content: string) => void;
  closeTab: (tabId: string) => void;
  setActiveTab: (tabId: string) => void;
  updateFileContent: (fileId: string, content: string) => void;
  setFileDirty: (fileId: string, isDirty: boolean) => void;
  setDiagnostics: (diagnostics: DiagnosticItem[]) => void;
  openDiff: (original: string, modified: string) => void;
  closeDiff: () => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  files: new Map(),
  tabs: [],
  activeTabId: null,
  diagnostics: [],
  diffMode: false,
  diffFiles: null,

  openFile: (filePath: string, content: string) => {
    const { files, tabs } = get();

    // Check if already open
    let existingFile: EditorFile | undefined;
    files.forEach((file) => {
      if (file.path === filePath) existingFile = file;
    });

    if (existingFile) {
      const existingTab = tabs.find((t) => t.fileId === existingFile!.id);
      if (existingTab) {
        set({ activeTabId: existingTab.id });
        return;
      }
    }

    const fileId = generateId();
    const ext = getFileExtension(filePath);
    const langDef = getLanguageByExtension(ext);

    const newFile: EditorFile = {
      id: fileId,
      path: filePath,
      name: filePath.replace(/\\/g, '/').split('/').pop() || filePath,
      content,
      language: langDef.monacoId,
      isDirty: false,
    };

    const tabId = generateId();
    const newTab: EditorTab = {
      id: tabId,
      fileId,
      active: true,
    };

    const updatedFiles = new Map(files);
    updatedFiles.set(fileId, newFile);

    set({
      files: updatedFiles,
      tabs: [...tabs, newTab],
      activeTabId: tabId,
    });
  },

  closeTab: (tabId: string) => {
    const { tabs, activeTabId } = get();
    const tabIndex = tabs.findIndex((t) => t.id === tabId);
    if (tabIndex === -1) return;

    const newTabs = tabs.filter((t) => t.id !== tabId);
    let nextActiveId = activeTabId;

    if (activeTabId === tabId) {
      if (newTabs.length > 0) {
        const nextIndex = Math.min(tabIndex, newTabs.length - 1);
        nextActiveId = newTabs[nextIndex].id;
      } else {
        nextActiveId = null;
      }
    }

    set({ tabs: newTabs, activeTabId: nextActiveId });
  },

  setActiveTab: (tabId: string) => {
    set({ activeTabId: tabId });
  },

  updateFileContent: (fileId: string, content: string) => {
    const { files } = get();
    const file = files.get(fileId);
    if (file) {
      const updated = { ...file, content, isDirty: true };
      const updatedFiles = new Map(files);
      updatedFiles.set(fileId, updated);
      set({ files: updatedFiles });
    }
  },

  setFileDirty: (fileId: string, isDirty: boolean) => {
    const { files } = get();
    const file = files.get(fileId);
    if (file) {
      const updated = { ...file, isDirty };
      const updatedFiles = new Map(files);
      updatedFiles.set(fileId, updated);
      set({ files: updatedFiles });
    }
  },

  setDiagnostics: (diagnostics: DiagnosticItem[]) => set({ diagnostics }),

  openDiff: (original: string, modified: string) => {
    set({ diffMode: true, diffFiles: { original, modified } });
  },

  closeDiff: () => {
    set({ diffMode: false, diffFiles: null });
  },
}));
