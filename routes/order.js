const express = require('express');
const router = express.Router();
const order = require('../controller/OrderController');
const auth = require('../middleware/AuthMiddleware');

router.get('/',auth.verifyAdminToken,order.getAllOrders);
router.get('/:orderId',auth.verifyAdminToken,order.getOrderById);
//router.get('/daily/:date',order.getDailyOrders);
//router.get('/',order.getMonthlyAndYearlyOrders)
router.post('/',auth.verifyUserToken,order.createOrder);

module.exports = router;