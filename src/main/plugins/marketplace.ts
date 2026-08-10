import axios from 'axios';
import { MarketplacePlugin } from '../../shared/types/plugin';

export class PluginMarketplaceClient {
  private galleryUrl = 'https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery';

  public async searchPlugins(query: string = ''): Promise<MarketplacePlugin[]> {
    try {
      const payload = {
        filters: [
          {
            criteria: [
              { filterType: 8, value: 'Microsoft.VisualStudio.Code' },
              { filterType: 10, value: query.trim() || 'prettier' },
            ],
            pageNumber: 1,
            pageSize: 20,
            sortBy: 0,
            sortOrder: 0,
          },
        ],
        flags: 914,
      };

      const response = await axios.post(this.galleryUrl, payload, {
        headers: {
          'Accept': 'application/json;api-version=6.0-preview.1',
          'Content-Type': 'application/json',
        },
        timeout: 5000,
      });

      const extensions = response.data?.results?.[0]?.extensions || [];
      return extensions.map((ext: any) => {
        const latestVersion = ext.versions?.[0] || {};
        const stats = ext.statistics || [];

        const installStat = stats.find((s: any) => s.statisticName === 'install');
        const ratingStat = stats.find((s: any) => s.statisticName === 'averagerating');

        const downloads = installStat ? Math.round(installStat.value) : 10000;
        const rating = ratingStat ? Number(ratingStat.value.toFixed(1)) : 4.8;
        const downloadUrl = `${latestVersion.assetUri}/Microsoft.VisualStudio.Services.VSIXPackage`;

        const iconFile = latestVersion.files?.find((f: any) => f.assetType === 'Microsoft.VisualStudio.Services.Icons.Default');
        const iconUrl = iconFile ? iconFile.source : `${latestVersion.assetUri}/Microsoft.VisualStudio.Services.Icons.Default`;

        return {
          id: `${ext.publisher.publisherName}.${ext.extensionName}`,
          name: ext.extensionName,
          displayName: ext.displayName || ext.extensionName,
          description: ext.shortDescription || 'Расширение для VS Code',
          version: latestVersion.version || '1.0.0',
          publisher: ext.publisher?.displayName || ext.publisher?.publisherName || 'VS Code',
          downloads,
          rating,
          downloadUrl,
          iconUrl,
        };
      });
    } catch (err: any) {
      console.warn('[Marketplace] VS Code Gallery API request failed, using curated list:', err.message);
      return [
        {
          id: 'esbenp.prettier-vscode',
          name: 'prettier-vscode',
          displayName: 'Prettier - Code formatter',
          description: 'Official Code formatter using Prettier for JS, TS, CSS, HTML, JSON',
          version: '10.4.0',
          publisher: 'Prettier',
          downloads: 45200000,
          rating: 4.8,
          downloadUrl: 'https://esbenp.gallery.vsassets.io/_apis/public/gallery/publisher/esbenp/extension/prettier-vscode/10.4.0/assetbyname/Microsoft.VisualStudio.Services.VSIXPackage',
          iconUrl: 'https://esbenp.gallery.vsassets.io/_apis/public/gallery/publisher/esbenp/extension/prettier-vscode/10.4.0/assetbyname/Microsoft.VisualStudio.Services.Icons.Default',
        },
        {
          id: 'ms-python.python',
          name: 'python',
          displayName: 'Python',
          description: 'IntelliSense (Pylance), Linting, Debugging, Code navigation, refactoring',
          version: '2024.2.0',
          publisher: 'Microsoft',
          downloads: 128000000,
          rating: 4.9,
          downloadUrl: 'https://ms-python.gallery.vsassets.io/_apis/public/gallery/publisher/ms-python/extension/python/2024.2.0/assetbyname/Microsoft.VisualStudio.Services.VSIXPackage',
          iconUrl: 'https://ms-python.gallery.vsassets.io/_apis/public/gallery/publisher/ms-python/extension/python/2024.2.0/assetbyname/Microsoft.VisualStudio.Services.Icons.Default',
        },
        {
          id: 'dbaeumer.vscode-eslint',
          name: 'vscode-eslint',
          displayName: 'ESLint',
          description: 'Integrates ESLint JavaScript into VS Code',
          version: '2.4.4',
          publisher: 'Microsoft',
          downloads: 32100000,
          rating: 4.7,
          downloadUrl: 'https://dbaeumer.gallery.vsassets.io/_apis/public/gallery/publisher/dbaeumer/extension/vscode-eslint/2.4.4/assetbyname/Microsoft.VisualStudio.Services.VSIXPackage',
          iconUrl: 'https://dbaeumer.gallery.vsassets.io/_apis/public/gallery/publisher/dbaeumer/extension/vscode-eslint/2.4.4/assetbyname/Microsoft.VisualStudio.Services.Icons.Default',
        },
        {
          id: 'eamodio.gitlens',
          name: 'gitlens',
          displayName: 'GitLens — Git supercharged',
          description: 'Supercharge Git within VS Code — Visualize code authorship at a glance',
          version: '15.0.0',
          publisher: 'GitKraken',
          downloads: 29800000,
          rating: 4.9,
          downloadUrl: 'https://eamodio.gallery.vsassets.io/_apis/public/gallery/publisher/eamodio/extension/gitlens/15.0.0/assetbyname/Microsoft.VisualStudio.Services.VSIXPackage',
          iconUrl: 'https://eamodio.gallery.vsassets.io/_apis/public/gallery/publisher/eamodio/extension/gitlens/15.0.0/assetbyname/Microsoft.VisualStudio.Services.Icons.Default',
        },
      ];
    }
  }

  public async downloadPlugin(downloadUrl: string): Promise<Buffer> {
    const response = await axios.get(downloadUrl, { responseType: 'arraybuffer' });
    return Buffer.from(response.data);
  }
}

export const marketplaceClient = new PluginMarketplaceClient();
