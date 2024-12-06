const Product = require('../model/Product');

const createProduct = async (product) => {
    const newProduct = new Product(product);
    console.log('new product in service ',newProduct);

    const savedNewProduct = await newProduct.save();
    console.log('saved new product in service ',savedNewProduct);

    return savedNewProduct;
}

const getAllProducts = async (page,skip,limit,sort) => {

    if(sort === 0)
    {
        console.log('no sort run');
        const products = await Product.find().skip(skip).limit(limit);

        console.log('products by get all products in service ', products);

        const totalProducts = await Product.countDocuments();
        console.log('total products in service ',totalProducts);

        const totalPages = Math.ceil(totalProducts / limit);
        console.log('total pages in service ',totalPages);

        if (products.length)
        {
            return {currentPage:page,totalPages,totalProducts,products}
        }

        else
        {
            return [];
        }
    }
    else
    {
        console.log('sort run');
        sortOption = sort === "desc" ? -1 : 1;

        const products = await Product.find().skip(skip).limit(limit).sort({price:sortOption});

        console.log('products by get all products in service ', products);

        const totalProducts = await Product.countDocuments();
        console.log('total products in service ',totalProducts);

        const totalPages = Math.ceil(totalProducts / limit);
        console.log('total pages in service ',totalPages);

        if (products.length)
        {
            return {currentPage:page,totalPages,totalProducts,products}
        }

        else
        {
            return [];
        }
    }

}

const getProductById = async (productId) => {
    const productById = await Product.findById(productId);
   // console.log('product by Id in service ',productById);

    if(!productById)
    {
        throw new Error(`can't find product`)
    }

    else
    {
        return productById;
    }
}

const getProductsByCategory = async (category,page,limit,skip,sort) => {
    //
    // const productsByCategory = await Product.find({category});
    // console.log('products by category in service ',productsByCategory);
    //
    // if(productsByCategory.length)
    // {
    //     return productsByCategory;
    // }
    //
    // else
    // {
    //     return [];
    // }

    if(sort === 0)
    {
        console.log('no sort run');
        const products = await Product.find({category}).skip(skip).limit(limit);

        console.log('products by get all products in service ', products);

        const totalProductsByCategory = await Product.find({category}).count();

        const totalPages = Math.ceil(totalProductsByCategory / limit);
        console.log('total pages in service ',totalPages);

        if (products.length)
        {
            return {currentPage:page,totalPages,totalProducts:totalProductsByCategory,products}
        }

        else
        {
            return [];
        }
    }
    else
    {
        console.log('sort run');
        sortOption = (sort === "desc" ? -1 : 1);

        const products = await Product.find({category}).skip(skip).limit(limit).sort({price:sortOption});

        console.log('products by get all products in service ', products);

        const totalProductsByCategory = await Product.find({category}).count();
        //console.log('total products in service ',totalProducts);

        const totalPages = Math.ceil(totalProductsByCategory / limit);
        console.log('total pages in service ',totalPages);

        if (products.length)
        {
            return {currentPage:page,totalPages,totalProducts:totalProductsByCategory.length,products}
        }

        else
        {
            return [];
        }
    }
}

const getProductsByBrand = async (category,brand) => {
    const productsByCategory = await Product.find({category});

    if(productsByCategory)
    {
        const productsByBrand = await Product.find({category,brand});
        console.log('products by brand in service ',productsByBrand);

        if(productsByBrand.length)
        {
            return productsByBrand;
        }
        else
        {
            return [];
        }
    }
}

const getProductsByColor = async (category,query) => {

}

const getProductsBySorting = async (page,limit,skip,sort) => {
    const sortOrder = (sort === "desc") ? -1 : 1;

        const products = await Product.find().skip(skip).limit(limit).sort({price:sortOrder});
        console.log('products in service ',products);

        const totalProducts = await Product.countDocuments();

        const totalPages = Math.ceil(totalProducts / limit);

        if(products.length)
        {
            return {currentPage:page,totalPages,totalProducts,products}
        }
        else
        {
            return [];
        }
}

const getProductsByKeyword = async (keyword) => {
    const productsByKeyword = await Product.find({name:{ $regex:keyword, $options: 'i'}});

    console.log('products by keyword in service ',productsByKeyword);
    if(productsByKeyword.length)
    {
        return productsByKeyword;
    }
    else
    {
        return [];
    }
}

const updateProduct = async (productId,product) => {
    const productById = await Product.findById(productId);
    console.log('product by Id in service ',productById);

    if(!productById)
    {
        throw new Error(`can't find product`)
    }

    else
    {
        const updateProduct = await Product.findByIdAndUpdate(productId,product,{new:true});
        console.log('updated product in service ',updateProduct);

        return updateProduct;
    }
}

const deleteProduct = async (productId) => {
    console.log('product id in service ',productId);

    const productById = await Product.findById(productId);
    console.log('product by Id in service ',productById);

    if(!productById)
    {
        throw new Error(`can't find product`)
    }

    const deleteProduct = await Product.findByIdAndDelete(productId);
    console.log('delete product in service ',deleteProduct);

    return deleteProduct;
}

module.exports = {createProduct,getAllProducts,getProductsByKeyword,getProductsBySorting,getProductById,getProductsByCategory,getProductsByBrand,updateProduct,deleteProduct};