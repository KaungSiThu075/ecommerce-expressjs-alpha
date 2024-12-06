const categoryService = require('../service/CategoryService');

const getAllCategories = async (req, res, next) => {
    const categories = await categoryService.getAllCategories();
    return res.status(200).json(categories);
}

const createCategory = async (req, res, next) => {
    const categoryName = req.body.categoryName;
    console.log('category name in controller ',categoryName);
    try
    {
        const createdCategory = await categoryService.createCategory(categoryName);
        if(createdCategory)
        {
            return res.status(201).json(createdCategory);
        }
    }
    catch(err)
    {
        return res.status(400).json({err:err.message})
    }
}

module.exports = {createCategory,getAllCategories}