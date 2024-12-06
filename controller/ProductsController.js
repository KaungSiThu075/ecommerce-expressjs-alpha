const productsService = require('../service/ProductsService');
const { cloudinary } = require('../config/cloudinaryConfig');

const createProduct = async (req, res, next) => {

    try
    {
        const product = req.body;

        const imageFile = await cloudinary.uploader.
        upload(req.file.path, {folder:'E-Commerce-Project/ProductImages'});

        console.log('product in controller ',product);
        console.log('image file in controller ',imageFile);

        // const productForUse = {...product,
        //     image:{imgUrl:imageFile.secure_url,publicId:imageFile.public_id}}

        const productForUse = {...product,image:imageFile.secure_url};

        const createdProduct = await productsService.createProduct(productForUse);
        console.log('created product in controller ',createdProduct);

        if(createdProduct)
        {
            return res.status(201).send(createdProduct);
        }
    }

    catch (err)
    {
        return res.status(400).json({err:err.message})
    }
}

const getAllProducts = async (req, res, next) => {
    const page = req.query.page || 1;
    const limit = 8;
    const skip = (page - 1) * limit;
    const sorting = req.query.sort || 0;

    console.log('skip in controller ',skip);
    console.log('page in controller ',page);

    try
    {
        const products = await productsService.getAllProducts(page,skip,limit,sorting);
        console.log('products by get all products in controller ', products);

        if (products)
        {
            return res.status(200).json(products);
        }
    }

    catch (err)
    {
        return res.status(404).json({err: err.message});
    }
}

const getProductById = async (req,res,next) => {
    const productId = req.params.productId;

    try
    {
        const productById = await productsService.getProductById(productId);
        console.log('product by id in controller ',productById);

        if(productById)
        {
            return res.status(200).json(productById)
        }
    }

    catch(err)
    {
        return res.status(404).json({err:err.message})
    }
}

const getProductsByCategory = async (req,res,next) => {
    const category = req.params.category;

    const page = req.query.page || 1;
    const limit = 8;
    const skip = (page - 1) * limit;
    const sorting = req.query.sort || 0;

    try
    {
        const productsByCategory = await productsService.getProductsByCategory(category,page,limit,skip,sorting);
        console.log('products by category in controller ',productsByCategory);

        if(productsByCategory)
        {
            return res.status(200).json(productsByCategory);
        }
    }

    catch(err)
    {
        return res.status(404).json({err:err.message})
    }
}

const getProductsByKeyword = async (req,res,next) => {
    console.log('controller run')
    const keyword = req.params.search;
    console.log('search key word in controller ',keyword);

    try
    {
        const products = await productsService.getProductsByKeyword(keyword);
        console.log('products by keyword in controller ',products);

        if(products)
        {
            return res.status(200).json(products);
        }
    }
    catch(err)
    {
        return res.status(404).json({err:err.message})
    }
}

const getProductsByBrand = async (req,res,next) => {
    const category = req.params.category;
    const brand = req.params.brand;

    try
    {
        const productsByBrand = await productsService.getProductsByBrand(category,brand);
        console.log('products by brand in controller ',productsByBrand);

        if(productsByBrand)
        {
            return res.status(200).json(productsByBrand)
        }
    }
    catch(err)
    {
        return res.status(404).json({err:err.message})
    }
}

const getProductsBySorting = async (req,res,next) => {
    const sorting = req.query.sort;
    const page = req.query.page || 1;
    const limit = 5;
    const skip = (page - 1) * limit;
    console.log('sorting in controller ',sorting);

    try
    {
        const products = await productsService.getProductsBySorting(page,limit,skip,sorting);
        if(products)
        {
            return res.status(200).json(products);
        }
    }
    catch(err)
    {
        return res.status(404).json({err:err.message});
    }
}

const updateProduct = async (req,res,next) => {
    const productId = req.body._id;
    const product = req.body;

    console.log('product id ',productId)

    try
    {
        const productById = await productsService.getProductById(productId);
        console.log('product by id in controller ',productById)

        if(productById)
        {
           const destroy= await cloudinary.uploader.destroy(productById.imagePublicId);
            console.log('destroy ',destroy)
        }

        const newImageFile = await cloudinary.uploader
            .upload(req.file.path,{folder:'E-Commerce-Project/ProductImages'})

        const productForUse = {...product,
           image:{imgUrl: newImageFile.secure_url,publicId: newImageFile.public_id}}

        const updatedProduct = await productsService.updateProduct(productId,productForUse);
        console.log('updated product in controller ',updatedProduct);

        if(updatedProduct)
        {
            return res.status(200).json(updatedProduct);
        }
    }

    catch(err)
    {
        return res.status(400).json({err:err.message})
    }
}

const deleteProduct = async (req,res,next) => {
    const productId = req.body._id;
    console.log('product id in controller ',productId);

    try
    {
        const deletedProduct = await productsService.deleteProduct(productId);
        console.log('deleted product in controller ',deletedProduct);

        if(deletedProduct)
        {
            return res.status(200).json(deletedProduct)
        }
    }

    catch(err)
    {
        return res.status(404).json({err:err.message})
    }
}

module.exports = {createProduct,getAllProducts,
    getProductById,getProductsByCategory,getProductsByKeyword,getProductsBySorting,getProductsByBrand
    ,updateProduct,deleteProduct}