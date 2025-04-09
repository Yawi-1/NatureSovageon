const router = require('express').Router();
 const {addProduct,getAllProducts, getSingleProduct} = require('../controllers/product.controller');
 const uploadSingleImage = require('../middlewares/upload')


router.post('/products',uploadSingleImage,addProduct);
router.get('/products',getAllProducts);
router.get('/products/:id',getSingleProduct)


module.exports = router;