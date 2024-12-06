const mongoose = require('mongoose');
const schema = mongoose.Schema;
const CategorySchema = new schema({
    categoryName:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Category', CategorySchema);