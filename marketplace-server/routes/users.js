const express = require('express');
const router = express.Router();

router.get('/me', (req, res) => {
  res.json({ id: 'usr-1', username: 'drodcode-dev', email: 'dev@drodcode.com' });
});

module.exports = router;
