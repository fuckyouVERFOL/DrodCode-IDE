export type GitFileStatusType = 'modified' | 'staged' | 'untracked' | 'deleted' | 'renamed' | 'conflict';

export interface GitFileStatus {
  path: string;
  status: GitFileStatusType;
  staged: boolean;
  oldPath?: string;
}

export interface GitBranch {
  name: string;
  current: boolean;
  remote?: string;
  commitHash: string;
}

export interface GitCommit {
  hash: string;
  shortHash: string;
  author: string;
  email: string;
  date: string;
  message: string;
  parents: string[];
}

export interface GitConflict {
  filePath: string;
  ourContent: string;
  theirContent: string;
  baseContent: string;
}

export interface GitRepositoryState {
  isRepo: boolean;
  currentBranch: string;
  branches: GitBranch[];
  stagedFiles: GitFileStatus[];
  unstagedFiles: GitFileStatus[];
  commits: GitCommit[];
  behind: number;
  ahead: number;
}
