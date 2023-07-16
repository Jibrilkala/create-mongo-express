const express = require('express');
const router = express.Router();
const authController = require('../../project-template/controllers/authController');

// @route   POST api/register

router.post('/', authController.handleLogin);
router.post('/refresh', authController.handleRefresh);

module.exports = router;
