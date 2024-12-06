const mongoose = require('mongoose');
const schema = mongoose.Schema;

const productSchema = new schema({
    product:{
        type:schema.Types.ObjectId,
        ref:'Product',
    }
})

const FavoriteProductSchema = new schema ({
    userId:{
        type:schema.Types.ObjectId,
        ref:'User'
    },
    favoriteProducts:[productSchema]
});

module.exports = mongoose.model('FavoriteProduct',FavoriteProductSchema);