import React from 'react';

export const Output: React.FC = () => {
  return (
    <div
      style={{
        padding: '8px 12px',
        fontFamily: "'Fira Code', 'Consolas', monospace",
        fontSize: '12px',
        color: '#aaaaaa',
        whiteSpace: 'pre-wrap',
        overflowY: 'auto',
        height: '100%',
      }}
    >
      [DrodCode Language Server] Server started successfully for TypeScript/JavaScript.
      <br />
      [DrodCode Build Task] Watching workspace files for changes...
    </div>
  );
};
