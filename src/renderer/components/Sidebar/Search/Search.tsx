import React, { useState } from 'react';
import { SearchResults } from './SearchResults';
import { FileService } from '../../../services/fileService';
import { useEditor } from '../../../hooks/useEditor';
import { useGitStore } from '../../../store/gitStore';
import { Search as SearchIcon } from 'lucide-react';

export const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const { openFileFromPath } = useEditor();
  const { repoPath } = useGitStore();

  const handleSearch = async () => {
    if (!query || !repoPath) return;
    const matches = await FileService.searchInFiles(repoPath, query);
    setResults(matches);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      <div
        style={{
          padding: '8px 12px',
          backgroundColor: '#252526',
          borderBottom: '1px solid #3c3c3c',
          textTransform: 'uppercase',
          fontSize: '11px',
          fontWeight: 600,
          color: '#bbbbbb',
        }}
      >
        Поиск по файлам
      </div>
      <div style={{ padding: '12px', display: 'flex', gap: '8px' }}>
        <input
          type="text"
          placeholder="Поисковый запрос (например: function)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          style={{
            flex: 1,
            backgroundColor: '#3c3c3c',
            color: '#ffffff',
            padding: '6px 10px',
            borderRadius: '2px',
            fontSize: '12px',
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            backgroundColor: '#0e639c',
            color: '#ffffff',
            padding: '6px 10px',
            borderRadius: '2px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <SearchIcon size={14} />
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        <SearchResults results={results} onSelect={openFileFromPath} />
      </div>
    </div>
  );
};
