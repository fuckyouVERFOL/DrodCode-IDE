const express = require('express');
const cors = require('cors');
const pluginRoutes = require('./routes/plugins');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/plugins', pluginRoutes);
app.use('/api/users', userRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`[DrodCode Marketplace Server] Running on http://localhost:${PORT}`);
});
