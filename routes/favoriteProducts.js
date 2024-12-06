const express = require('express');
const router = express.Router();
const favoriteProducts = require('../controller/FavoriteProductsController');

router.get('/',favoriteProducts.getAllFavoriteProductsByUserId);
router.post('/',favoriteProducts.createFavoriteProduct);
router.delete('/',favoriteProducts.deleteFavoriteProduct);

module.exports = router