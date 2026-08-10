const express = require('express');
const router = express.Router();
const path = require('path');

const MOCK_PLUGINS = [
  {
    id: 'drodcode.prettier',
    name: 'prettier',
    displayName: 'DrodCode Prettier Formatter',
    description: 'Code formatter for JS, TS, HTML, CSS using Prettier',
    version: '1.0.0',
    publisher: 'drodcode',
    downloads: 1250,
    rating: 4.8,
    downloadUrl: 'http://localhost:3000/api/plugins/download/drodcode.prettier',
  },
  {
    id: 'drodcode.python-tools',
    name: 'python-tools',
    displayName: 'Python Language Server',
    description: 'Autocompletion, linting, and formatting for Python',
    version: '1.2.0',
    publisher: 'drodcode',
    downloads: 3400,
    rating: 4.9,
    downloadUrl: 'http://localhost:3000/api/plugins/download/drodcode.python-tools',
  },
];

router.get('/', (req, res) => {
  const query = req.query.q || '';
  if (!query) return res.json(MOCK_PLUGINS);
  const filtered = MOCK_PLUGINS.filter(
    (p) =>
      p.displayName.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()),
  );
  res.json(filtered);
});

router.get('/download/:id', (req, res) => {
  res.send('DAP_PLUGIN_PACKAGE_ZIP_STREAM_MOCK');
});

module.exports = router;
