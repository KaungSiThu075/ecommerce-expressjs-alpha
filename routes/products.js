const express = require('express');
const router = express.Router();
const products = require('../controller/ProductsController');
const upload = require('../middleware/ImageUploadMiddleware');
const auth = require('../middleware/AuthMiddleware')

router.get('/',products.getAllProducts);
router.get('/w/:search',products.getProductsByKeyword);
router.get('/s',products.getProductsBySorting);
router.get('/category/:category',products.getProductsByCategory);
router.get('/:productId',products.getProductById);

//router.get('/category/:category/:brand',products.getProductsByBrand)
//router.get('/category/:category/50-100',products.getProductsByPrice)

router.post('/',auth.verifyAdminToken,upload.single('image'),products.createProduct);
router.put('/',auth.verifyAdminToken,upload.single('image'),products.updateProduct);
router.delete('/',auth.verifyAdminToken,products.deleteProduct)

module.exports = router;