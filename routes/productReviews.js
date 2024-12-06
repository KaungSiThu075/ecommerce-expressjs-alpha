const express = require('express');
const router = express.Router();
const auth = require('../middleware/AuthMiddleware');
const productReviews = require('../controller/ProductReviewsController');

router.get('/product/:productId',productReviews.getAllReviewsByProductId);
router.get('/:reviewId',auth.verifyUserToken,productReviews.getProductReviewById);
router.post('/',auth.verifyUserToken,productReviews.createProductReview);
router.put('/:reviewId',auth.verifyUserToken,productReviews.updateProductReview);
router.delete('/:reviewId',auth.verifyUserToken,productReviews.deleteProductReview);

module.exports = router;