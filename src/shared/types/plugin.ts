export interface PluginManifest {
  name: string;
  id: string;
  version: string;
  displayName: string;
  description: string;
  publisher: string;
  main: string;
  engines: {
    drodcode: string;
  };
  activationEvents: string[];
  contributes?: {
    commands?: { command: string; title: string; category?: string }[];
    themes?: { label: string; uiTheme: string; path: string }[];
    snippets?: { language: string; path: string }[];
    languages?: { id: string; extensions: string[] }[];
  };
}

export interface InstalledPlugin {
  manifest: PluginManifest;
  path: string;
  enabled: boolean;
}

export interface MarketplacePlugin {
  id: string;
  name: string;
  displayName: string;
  description: string;
  version: string;
  publisher: string;
  downloads: number;
  rating: number;
  downloadUrl: string;
  iconUrl?: string;
}
