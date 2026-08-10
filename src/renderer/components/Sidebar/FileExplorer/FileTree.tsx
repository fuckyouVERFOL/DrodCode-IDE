import React, { useState, useEffect } from 'react';
import { FileItemNode } from '../../../../main/ipc/handlers/fileHandlers';
import { FileItem } from './FileItem';
import { FileService } from '../../../services/fileService';

interface FileTreeProps {
  rootPath: string;
  onFileSelect: (path: string) => void;
}

export const FileTree: React.FC<FileTreeProps> = ({ rootPath, onFileSelect }) => {
  const [nodes, setNodes] = useState<FileItemNode[]>([]);
  const [expandedDirs, setExpandedDirs] = useState<Set<string>>(new Set([rootPath]));

  const loadChildren = async (dirPath: string) => {
    const children = await FileService.listDirectory(dirPath);
    return children;
  };

  useEffect(() => {
    if (rootPath) {
      loadChildren(rootPath).then(setNodes);
    }
  }, [rootPath]);

  const toggleDirectory = async (node: FileItemNode) => {
    const nextExpanded = new Set(expandedDirs);
    if (nextExpanded.has(node.path)) {
      nextExpanded.delete(node.path);
    } else {
      nextExpanded.add(node.path);
      if (!node.children) {
        const children = await loadChildren(node.path);
        node.children = children;
      }
    }
    setExpandedDirs(nextExpanded);
  };

  const renderTree = (items: FileItemNode[], level: number = 0) => {
    return items.map((node) => {
      const isExpanded = expandedDirs.has(node.path);
      return (
        <React.Fragment key={node.path}>
          <FileItem
            node={node}
            expanded={isExpanded}
            level={level}
            onToggle={toggleDirectory}
            onSelect={(n) => onFileSelect(n.path)}
          />
          {node.isDirectory && isExpanded && node.children && (
            <div>{renderTree(node.children, level + 1)}</div>
          )}
        </React.Fragment>
      );
    });
  };

  return <div style={{ display: 'flex', flexDirection: 'column' }}>{renderTree(nodes)}</div>;
};
