const express = require('express');
const router = express.Router();
const category = require('../controller/CategoryController');

router.get('/',category.getAllCategories);
router.post('/',category.createCategory);

module.exports = router;