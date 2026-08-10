import React, { useState } from 'react';
import { FileTree } from './FileTree';
import { FileService } from '../../../services/fileService';
import { useEditor } from '../../../hooks/useEditor';
import { FolderPlus, FilePlus, RefreshCw } from 'lucide-react';

export const FileExplorer: React.FC = () => {
  const [rootPath, setRootPath] = useState<string | null>(null);
  const { openFileFromPath } = useEditor();

  const handleOpenFolder = async () => {
    const folder = await FileService.selectFolder();
    if (folder) {
      setRootPath(folder);
    }
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
          <span title="Новый файл" style={{ cursor: 'pointer', display: 'flex' }}>
            <FilePlus size={14} />
          </span>
          <span title="Новая папка" style={{ cursor: 'pointer', display: 'flex' }}>
            <FolderPlus size={14} />
          </span>
          <span title="Обновить" style={{ cursor: 'pointer', display: 'flex' }}>
            <RefreshCw size={14} />
          </span>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {rootPath ? (
          <FileTree rootPath={rootPath} onFileSelect={openFileFromPath} />
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
