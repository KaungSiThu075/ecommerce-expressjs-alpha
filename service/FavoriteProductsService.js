const FavoriteProduct = require('../model/FavoriteProduct');
const mongoose = require('mongoose');
const objectId = mongoose.Types.ObjectId;

const getAllFavoriteProducts = async (userId) => {
    console.log('get all fav prods run')
    console.log('user id ',userId)
    const productList = await FavoriteProduct.
    findOne({userId}).populate('favoriteProducts.product');
    console.log('fav products in service ',productList);

    if(productList)
    {
        // const totalProducts = productList.favoriteProducts.length;
        // console.log('total products in service ',totalProducts);
        // return {productList,totalProducts};
        return productList;
    }
    else
    {
        return {favoriteProducts: []};
    }
}

// const createFavoriteProduct = async (userId,productId) => {
//     const productList = await FavoriteProduct.findOne({userId});
//
//     if(productList.favoriteProducts?.length === 0)
//     {
//         const products = productList.favoriteProducts.push(new objectId(productId));
//         console.log('products in service ',products)
//         const newFavoriteProduct = new FavoriteProduct({
//             userId:new objectId(userId),
//             favoriteProducts: [...products]
//         })
//         console.log('new favorite product in service ',newFavoriteProduct);
//
//         const savedFavoriteProduct = await newFavoriteProduct.save();
//         console.log('saved new favorite product in service ',savedFavoriteProduct);
//
//         if(savedFavoriteProduct)
//         {
//             // const populatedSavedFavoriteProduct = await savedFavoriteProduct.populate
//             // ('product')
//             //
//             // console.log('populated saved favorite product ',populatedSavedFavoriteProduct)
//             // return populatedSavedFavoriteProduct;
//             console.log('saved favorite products in service ',savedFavoriteProduct);
//             return savedFavoriteProduct;
//         }
//     }
//
// }

const createFavoriteProduct = async (userId,productId) => {
    const createdFavoriteProducts = await FavoriteProduct.updateOne(
        {userId},
        {$addToSet:{favoriteProducts:{product:productId}}},
        {upsert: true}
    );
    console.log('created Products in service ',createdFavoriteProducts);
    // const totalProducts = createdFavoriteProducts;
    // console.log('total products in service ',totalProducts);

    if(createdFavoriteProducts)
    {
        const productList = await FavoriteProduct.findOne({userId})
            .populate('favoriteProducts.product');

        console.log('created favorite products ',productList);
        //const totalProducts = productList.favoriteProducts.length;

        const populatedProductList = await productList.populate('favoriteProducts.product');
        console.log('populated products from service ',populatedProductList);
        return populatedProductList;
    }
}

// const deleteFavoriteProduct = async (userId,productId) => {
//     const productById = await FavoriteProduct.findOne({product:productId});
//     if(!productById)
//     {
//         throw new Error(`can't find product`)
//     }
//
//     //const favoriteProductsByUserId = await FavoriteProduct.findOne({userId});
//
//     // if(!favoriteProductsByUserId)
//     // {
//     //     throw new Error(`can't find favorite products by this user`)
//     // }
//
//     const deletedFavoriteProduct = await FavoriteProduct.findOneAndDelete
//     ({product: productId,userId:userId}).populate('product');
//     console.log('deleted product in service ',deletedFavoriteProduct);
//
//     return deletedFavoriteProduct;
// }

const deleteFavoriteProduct = async (userId,productId) => {
    const deletedProducts = await FavoriteProduct.
    updateOne({userId},{$pull:{favoriteProducts:{product:productId}}});
    console.log('deleted products ',deletedProducts);
    //const totalProducts = deletedProducts.favoriteProducts.length;
    if(deletedProducts)
    {
        const productList = await FavoriteProduct.findOne({userId});
        console.log('product list ',productList);

       // const totalProducts = productList.favoriteProducts.length;
        const populatedProductList = await productList.populate('favoriteProducts.product');
        return populatedProductList;
    }
}

module.exports = {getAllFavoriteProducts,createFavoriteProduct,deleteFavoriteProduct}