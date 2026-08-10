import React from 'react';
import { FileItemNode } from '../../../../main/ipc/handlers/fileHandlers';
import { Folder, FolderOpen, FileCode, FileText, FileImage } from 'lucide-react';

interface FileItemProps {
  node: FileItemNode;
  expanded: boolean;
  onToggle: (node: FileItemNode) => void;
  onSelect: (node: FileItemNode) => void;
  level: number;
}

export const FileItem: React.FC<FileItemProps> = ({ node, expanded, onToggle, onSelect, level }) => {
  const getIcon = () => {
    if (node.isDirectory) {
      return expanded ? <FolderOpen size={16} color="#E8AB53" /> : <Folder size={16} color="#E8AB53" />;
    }
    const ext = node.name.split('.').pop()?.toLowerCase();
    if (['png', 'jpg', 'jpeg', 'svg', 'gif'].includes(ext || '')) {
      return <FileImage size={16} color="#B5CEA8" />;
    }
    if (['ts', 'tsx', 'js', 'jsx', 'py', 'java', 'cpp', 'rs'].includes(ext || '')) {
      return <FileCode size={16} color="#569CD6" />;
    }
    return <FileText size={16} color="#cccccc" />;
  };

  return (
    <div
      onClick={() => (node.isDirectory ? onToggle(node) : onSelect(node))}
      style={{
        display: 'flex',
        alignItems: 'center',
        paddingLeft: `${level * 12 + 8}px`,
        paddingTop: '4px',
        paddingBottom: '4px',
        cursor: 'pointer',
        gap: '6px',
        fontSize: '13px',
      }}
      className="file-item-hover"
    >
      {getIcon()}
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {node.name}
      </span>
    </div>
  );
};
