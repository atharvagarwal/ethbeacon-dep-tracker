const express = require('express');
const router = express.Router();
const { handleDepositData } = require('../controllers/depositContoller');

// Define the POST route for deposit data
router.post('/deposit', handleDepositData);

module.exports = router;
