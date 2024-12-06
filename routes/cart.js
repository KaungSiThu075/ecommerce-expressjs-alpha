const express = require('express');
const router = express.Router();
const cart = require('../controller/CartController');

router.get('/',cart.getCartByUserId);
router.post('/',cart.createCart);
router.delete('/',cart.removeFromCart);
router.delete('/deleteCart',cart.deleteCart)

module.exports = router;