const Category = require('../model/Category');

const getAllCategories = async () => {
    const categories = await Category.find();
    return categories;
}

const createCategory = async (categoryName) => {
    const newCategory = new Category({categoryName});
    const savedCategory = await newCategory.save();
    return savedCategory;
}

module.exports = {createCategory,getAllCategories}