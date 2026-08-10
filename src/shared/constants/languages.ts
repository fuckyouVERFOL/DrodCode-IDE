export interface LanguageDefinition {
  id: string;
  name: string;
  extensions: string[];
  monacoId: string;
}

export const SUPPORTED_LANGUAGES: LanguageDefinition[] = [
  { id: 'javascript', name: 'JavaScript', extensions: ['.js', '.jsx', '.mjs', '.cjs'], monacoId: 'javascript' },
  { id: 'typescript', name: 'TypeScript', extensions: ['.ts', '.tsx'], monacoId: 'typescript' },
  { id: 'python', name: 'Python', extensions: ['.py', '.pyw'], monacoId: 'python' },
  { id: 'java', name: 'Java', extensions: ['.java'], monacoId: 'java' },
  { id: 'cpp', name: 'C++', extensions: ['.cpp', '.cc', '.cxx', '.h', '.hpp'], monacoId: 'cpp' },
  { id: 'csharp', name: 'C#', extensions: ['.cs'], monacoId: 'csharp' },
  { id: 'go', name: 'Go', extensions: ['.go'], monacoId: 'go' },
  { id: 'rust', name: 'Rust', extensions: ['.rs'], monacoId: 'rust' },
  { id: 'php', name: 'PHP', extensions: ['.php'], monacoId: 'php' },
  { id: 'html', name: 'HTML', extensions: ['.html', '.htm'], monacoId: 'html' },
  { id: 'css', name: 'CSS', extensions: ['.css', '.scss', '.less'], monacoId: 'css' },
  { id: 'sql', name: 'SQL', extensions: ['.sql'], monacoId: 'sql' },
  { id: 'json', name: 'JSON', extensions: ['.json'], monacoId: 'json' },
  { id: 'yaml', name: 'YAML', extensions: ['.yaml', '.yml'], monacoId: 'yaml' },
  { id: 'xml', name: 'XML', extensions: ['.xml', '.svg'], monacoId: 'xml' },
  { id: 'markdown', name: 'Markdown', extensions: ['.md', '.markdown'], monacoId: 'markdown' },
  { id: 'shell', name: 'Shell / Bash', extensions: ['.sh', '.bash', '.zsh'], monacoId: 'shell' },
  { id: 'ruby', name: 'Ruby', extensions: ['.rb'], monacoId: 'ruby' },
  { id: 'swift', name: 'Swift', extensions: ['.swift'], monacoId: 'swift' },
  { id: 'kotlin', name: 'Kotlin', extensions: ['.kt', '.kts'], monacoId: 'kotlin' },
  { id: 'dart', name: 'Dart', extensions: ['.dart'], monacoId: 'dart' },
  { id: 'lua', name: 'Lua', extensions: ['.lua'], monacoId: 'lua' },
  { id: 'r', name: 'R', extensions: ['.r', '.R'], monacoId: 'r' },
  { id: 'perl', name: 'Perl', extensions: ['.pl', '.pm'], monacoId: 'perl' },
  { id: 'scala', name: 'Scala', extensions: ['.scala'], monacoId: 'scala' },
  { id: 'haskell', name: 'Haskell', extensions: ['.hs'], monacoId: 'haskell' },
  { id: 'elixir', name: 'Elixir', extensions: ['.ex', '.exs'], monacoId: 'elixir' },
  { id: 'clojure', name: 'Clojure', extensions: ['.clj', '.cljs'], monacoId: 'clojure' },
  { id: 'erlang', name: 'Erlang', extensions: ['.erl', '.hrl'], monacoId: 'erlang' },
  { id: 'zig', name: 'Zig', extensions: ['.zig'], monacoId: 'zig' },
  { id: 'nim', name: 'Nim', extensions: ['.nim'], monacoId: 'nim' },
];

export function getLanguageByExtension(ext: string): LanguageDefinition {
  const cleanExt = ext.startsWith('.') ? ext.toLowerCase() : `.${ext.toLowerCase()}`;
  const found = SUPPORTED_LANGUAGES.find((lang) => lang.extensions.includes(cleanExt));
  return found || { id: 'plaintext', name: 'Plain Text', extensions: [], monacoId: 'plaintext' };
}
