const productReviewsService = require('../service/ProductReviewsService');

const getAllReviewsByProductId = async (req, res, next) => {
    const productId = req.params.productId;

    try
    {
        const reviewsByProductId = await productReviewsService.
        getAllProductReviewsByProductId(productId)

        console.log('reviews by product id in controller ',reviewsByProductId);

        if(reviewsByProductId)
        {
            return res.status(200).json(reviewsByProductId);
        }
    }
    catch(err)
    {
        return res.status(404).json({err:err.message})
    }
}

const createProductReview = async (req, res, next) => {
    const userId = req.user.id;
    const review = req.body;
    console.log('review in controller ',review);

    try
    {
        const createdProductReview = await productReviewsService.createProductReview(userId,review);
        console.log('created product review in controller ',createdProductReview);

        if(createdProductReview)
        {
            return res.status(201).json(createdProductReview);
        }
    }
    catch(err)
    {
        return res.status(400).json({err:err.message});
    }
}

const updateProductReview = async (req, res, next) => {
    const reviewId = req.params.reviewId;
    const review = req.body;

    try
    {
        const updatedProductReview = await productReviewsService.updateProductReview(reviewId,review);
        console.log('updated product review in controller ',updatedProductReview);

        if(updatedProductReview)
        {
            return res.status(200).json(updatedProductReview)
        }
    }
    catch(err)
    {
        return res.status(404).json({err:err.message})
    }
}

const deleteProductReview = async (req, res, next) => {
    const reviewId = req.params.reviewId;

    try
    {
        const deletedProductReview = await productReviewsService.deleteProductReview(reviewId);
        console.log('deleted product review in controller ',deletedProductReview);

        if(deletedProductReview)
        {
            return res.status(200).json(deletedProductReview);
        }
    }
    catch(err)
    {
        return res.status(404).json({err:err.message})
    }
}

const getProductReviewById = async (req, res, next) => {
    const reviewId = req.params.reviewId;

    try
    {
        const productReviewById = await productReviewsService.getProductReviewById(reviewId);
        console.log('product review by id in controller ',productReviewById);

        if(productReviewById)
        {
            return res.status(200).json(productReviewById)
        }
    }
    catch(err)
    {
        return res.status(404).json({err:err.message})
    }
}

module.exports = {getAllReviewsByProductId,
    getProductReviewById,createProductReview,updateProductReview,deleteProductReview}