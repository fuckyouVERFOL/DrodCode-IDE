import { create } from 'zustand';
import { GitRepositoryState } from '../../shared/types/git';

interface GitState {
  repoState: GitRepositoryState;
  loading: boolean;
  repoPath: string;

  setRepoPath: (path: string) => void;
  setRepoState: (state: GitRepositoryState) => void;
  setLoading: (loading: boolean) => void;
}

export const useGitStore = create<GitState>((set) => ({
  repoState: {
    isRepo: false,
    currentBranch: '',
    branches: [],
    stagedFiles: [],
    unstagedFiles: [],
    commits: [],
    behind: 0,
    ahead: 0,
  },
  loading: false,
  repoPath: '',

  setRepoPath: (repoPath: string) => set({ repoPath }),
  setRepoState: (repoState: GitRepositoryState) => set({ repoState }),
  setLoading: (loading: boolean) => set({ loading }),
}));
