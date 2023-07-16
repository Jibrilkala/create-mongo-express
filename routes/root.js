const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/index(.html)?', (req, res) => {
  res.status(301).redirect('');
  console.log('Redirecting to index.html');
});

module.exports = router;