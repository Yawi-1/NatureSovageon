const router = require('express').Router();
 const {addProduct,getAllProducts, getSingleProduct} = require('../controllers/product.controller');
 const uploadSingleImage = require('../middlewares/upload');
 const isAuthenticated = require('../middlewares/isAuthenticated')


router.post('/products',uploadSingleImage,addProduct);
router.get('/products',getAllProducts);
router.get('/dashboard',isAuthenticated,(req,res)=>{
    res.render('dashboard')
})
router.get('/products/:id',getSingleProduct)


module.exports = router;