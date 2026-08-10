import { create } from 'zustand';
import { InstalledPlugin, MarketplacePlugin } from '../../shared/types/plugin';

interface PluginState {
  installed: InstalledPlugin[];
  marketplace: MarketplacePlugin[];
  searchQuery: string;
  loading: boolean;

  setInstalled: (plugins: InstalledPlugin[]) => void;
  setMarketplace: (plugins: MarketplacePlugin[]) => void;
  setSearchQuery: (query: string) => void;
  setLoading: (loading: boolean) => void;
}

export const usePluginStore = create<PluginState>((set) => ({
  installed: [],
  marketplace: [],
  searchQuery: '',
  loading: false,

  setInstalled: (installed) => set({ installed }),
  setMarketplace: (marketplace) => set({ marketplace }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setLoading: (loading) => set({ loading }),
}));
