const express = require('express');
const router = express.Router();
const registerController = require('../../project-template/controllers/registerController');

// @route   POST api/register

router.post('/', registerController.handleNewUser);

module.exports = router;
