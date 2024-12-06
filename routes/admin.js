const express = require('express');
const router = express.Router();
const admin = require('../controller/AdminController');

router.post('/login',admin.adminLogIn)

module.exports = router;