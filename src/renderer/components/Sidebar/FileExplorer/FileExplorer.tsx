import React, { useState } from 'react';
import { FileTree } from './FileTree';
import { FileService } from '../../../services/fileService';
import { useEditor } from '../../../hooks/useEditor';
import { useEditorStore } from '../../../store/editorStore';
import { FolderPlus, FilePlus, RefreshCw } from 'lucide-react';

export const FileExplorer: React.FC = () => {
  const { rootPath, setRootPath } = useEditorStore();
  const { openFileFromPath } = useEditor();
  const [treeKey, setTreeKey] = useState(0);
  const [isCreatingFile, setIsCreatingFile] = useState(false);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [inputName, setInputName] = useState('');

  const handleOpenFolder = async () => {
    const folder = await FileService.selectFolder();
    if (folder) {
      setRootPath(folder);
    }
  };

  const handleRefresh = () => {
    setTreeKey((prev) => prev + 1);
  };

  const handleCreateFileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputName.trim() || !rootPath) return;

    const fullPath = `${rootPath}/${inputName.trim()}`.replace(/\\/g, '/');
    await FileService.writeFile(fullPath, '');
    setInputName('');
    setIsCreatingFile(false);
    handleRefresh();
    openFileFromPath(fullPath);
  };

  const handleCreateFolderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputName.trim() || !rootPath) return;

    const fullPath = `${rootPath}/${inputName.trim()}`.replace(/\\/g, '/');
    await FileService.createDirectory(fullPath);
    setInputName('');
    setIsCreatingFolder(false);
    handleRefresh();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 12px',
          backgroundColor: '#252526',
          borderBottom: '1px solid #3c3c3c',
          textTransform: 'uppercase',
          fontSize: '11px',
          fontWeight: 600,
          color: '#bbbbbb',
        }}
      >
        <span>Проводник</span>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span
            title="Новый файл"
            style={{ cursor: rootPath ? 'pointer' : 'not-allowed', opacity: rootPath ? 1 : 0.4, display: 'flex' }}
            onClick={() => {
              if (rootPath) {
                setIsCreatingFile(true);
                setIsCreatingFolder(false);
                setInputName('');
              }
            }}
          >
            <FilePlus size={14} />
          </span>
          <span
            title="Новая папка"
            style={{ cursor: rootPath ? 'pointer' : 'not-allowed', opacity: rootPath ? 1 : 0.4, display: 'flex' }}
            onClick={() => {
              if (rootPath) {
                setIsCreatingFolder(true);
                setIsCreatingFile(false);
                setInputName('');
              }
            }}
          >
            <FolderPlus size={14} />
          </span>
          <span title="Обновить" style={{ cursor: 'pointer', display: 'flex' }} onClick={handleRefresh}>
            <RefreshCw size={14} />
          </span>
        </div>
      </div>

      {(isCreatingFile || isCreatingFolder) && (
        <form
          onSubmit={isCreatingFile ? handleCreateFileSubmit : handleCreateFolderSubmit}
          style={{ padding: '6px 8px', backgroundColor: '#333333', borderBottom: '1px solid #3c3c3c' }}
        >
          <div style={{ fontSize: '11px', color: '#4EC9B0', marginBottom: '4px' }}>
            {isCreatingFile ? 'Имя нового файла:' : 'Имя новой папки:'}
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            <input
              type="text"
              autoFocus
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder={isCreatingFile ? 'index.js' : 'src'}
              style={{
                flex: 1,
                backgroundColor: '#3c3c3c',
                color: '#ffffff',
                padding: '4px 6px',
                borderRadius: '2px',
                fontSize: '12px',
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: '#0e639c',
                color: '#ffffff',
                padding: '4px 8px',
                borderRadius: '2px',
                fontSize: '11px',
              }}
            >
              OK
            </button>
            <button
              type="button"
              onClick={() => {
                setIsCreatingFile(false);
                setIsCreatingFolder(false);
              }}
              style={{
                backgroundColor: '#444444',
                color: '#ffffff',
                padding: '4px 8px',
                borderRadius: '2px',
                fontSize: '11px',
              }}
            >
              Esc
            </button>
          </div>
        </form>
      )}

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {rootPath ? (
          <FileTree key={treeKey} rootPath={rootPath} onFileSelect={openFileFromPath} />
        ) : (
          <div
            style={{
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              height: '100%',
              textAlign: 'center',
            }}
          >
            <p style={{ color: '#888888' }}>Папка проекта не выбрана</p>
            <button
              onClick={handleOpenFolder}
              style={{
                backgroundColor: '#0e639c',
                color: '#ffffff',
                padding: '6px 14px',
                borderRadius: '2px',
                fontSize: '12px',
              }}
            >
              Открыть папку
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
