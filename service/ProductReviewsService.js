const ProductReview = require('../model/productReviews');
const Product = require('../model/Product');
const mongoose = require('mongoose');
const objectId = mongoose.Types.ObjectId;

const getAllProductReviewsByProductId = async (productId) => {
    const reviews = await
        ProductReview.find({product:productId}).
        populate({path:'user',select:'-password',populate:{
            path:'userProfile',model:'UserProfile',select:'name profileAvatar'
    }})
        // populate({path:'userProfile',model:'UserProfile',select:'name profileAvatar'});

    if(reviews.length)
    {
        console.log('reviews by product id in service ',reviews);
        return reviews;
    }
    else
    {
        return []
    }
}

const createProductReview = async (userId,review) => {
    const newProductReview = new ProductReview({
        user:new objectId(userId),
        product:new objectId(review.product),
        rating:review.rating,
        review:review.review
    })
    const savedProductReview = await newProductReview.save();

    if(savedProductReview)
    {
        const populatedSavedProductReview = await savedProductReview.
        populate({path:'user',select:'-password',populate:{
                path:'userProfile',model:'UserProfile',select:'name profileAvatar'
            }});
        console.log('populated saved product review ',populatedSavedProductReview);

        return populatedSavedProductReview;
    }
}

const updateProductReview = async (reviewId,review) => {
    review.product = new objectId(review.product);

    console.log('review in service ',review);

    const updatedProductReview = await ProductReview.
    findByIdAndUpdate(reviewId,review,{new:true});

    console.log('updated product review ',updatedProductReview);

    if(updatedProductReview)
    {
        const populatedProductReview = await updatedProductReview.
        populate({path:'user',select:'-password',populate:{
                path:'userProfile',model:'UserProfile',select:'name profileAvatar'
            }});
        return populatedProductReview;
    }
}

const deleteProductReview = async (reviewId) => {
    const deletedProductReview = await ProductReview.findByIdAndDelete(reviewId);
    console.log('deleted product review ',deletedProductReview);

    if(deletedProductReview)
    {
        return deletedProductReview;
    }
}

const getProductReviewById = async (reviewId) => {
    const productReviewById = await ProductReview.findById(reviewId);
    console.log('product review by id ',productReviewById);

    if(productReviewById)
    {
        return productReviewById;
    }
}

module.exports = {getAllProductReviewsByProductId,getProductReviewById,
    createProductReview,updateProductReview,deleteProductReview}