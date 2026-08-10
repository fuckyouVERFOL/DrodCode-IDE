import React from 'react';
import { FileCode } from 'lucide-react';

interface SearchResultsProps {
  results: string[];
  onSelect: (path: string) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ results, onSelect }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '8px' }}>
      {results.map((filePath) => (
        <div
          key={filePath}
          onClick={() => onSelect(filePath)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px',
            cursor: 'pointer',
            backgroundColor: '#2d2d2d',
            borderRadius: '3px',
            fontSize: '12px',
          }}
        >
          <FileCode size={14} color="#569CD6" />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {filePath}
          </span>
        </div>
      ))}
    </div>
  );
};
