const express = require('express');
const router = express.Router();

// GET /api/products
router.get('/', (req, res) => {
  res.send('This is the /products route');
});

module.exports = router;
