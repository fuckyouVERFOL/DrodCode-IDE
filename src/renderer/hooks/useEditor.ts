import { useEditorStore } from '../store/editorStore';
import { FileService } from '../services/fileService';

export function useEditor() {
  const {
    files,
    tabs,
    activeTabId,
    openFile,
    closeTab,
    setActiveTab,
    updateFileContent,
    setFileDirty,
  } = useEditorStore();

  const activeTab = tabs.find((t) => t.id === activeTabId);
  const activeFile = activeTab ? files.get(activeTab.fileId) : undefined;

  const openFileFromPath = async (filePath: string) => {
    const res = await FileService.readFile(filePath);
    if (res.success && res.content !== undefined) {
      openFile(filePath, res.content);
    }
  };

  const saveActiveFile = async () => {
    if (activeFile && activeFile.isDirty) {
      const res = await FileService.writeFile(activeFile.path, activeFile.content);
      if (res.success) {
        setFileDirty(activeFile.id, false);
      }
    }
  };

  return {
    files,
    tabs,
    activeTab,
    activeFile,
    openFileFromPath,
    saveActiveFile,
    closeTab,
    setActiveTab,
    updateFileContent,
  };
}
