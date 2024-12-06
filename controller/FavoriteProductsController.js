const favoriteProductsService = require('../service/FavoriteProductsService');

const getAllFavoriteProductsByUserId = async (req, res, next) => {
    const userId = req.user.id;
    const favoriteProducts = await favoriteProductsService.getAllFavoriteProducts(userId);

    return res.status(200).json(favoriteProducts);
}

const createFavoriteProduct = async (req, res) => {
    const userId = req.user.id;
    const productId = req.body.product;
    console.log('product in in controller ',productId);

    try
    {
        const createdFavoriteProduct = await favoriteProductsService.createFavoriteProduct(userId,productId);
        console.log('favorite product in controller ',createdFavoriteProduct);

        if(createdFavoriteProduct)
        {
            return res.status(200).json(createdFavoriteProduct);
        }
    }
    catch(err)
    {
        return res.status(404).json({err:err.message})
    }
}

const deleteFavoriteProduct = async (req,res,next) => {
    const userId = req.user.id;
    const productForDelete = req.body;
    const productId = productForDelete.product;

    try
    {
        const deletedFavoriteProduct = await favoriteProductsService.deleteFavoriteProduct(userId,productId)
        console.log('deleted favorite product in controller ',deletedFavoriteProduct);

        if(deletedFavoriteProduct)
        {
            return res.status(200).json(deletedFavoriteProduct);
        }
    }
    catch(err)
    {
        return res.status(404).json({err:err.message})
    }
}

module.exports = {getAllFavoriteProductsByUserId,createFavoriteProduct,deleteFavoriteProduct}