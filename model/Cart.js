const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ProductSchemaForCart = new schema({
    product:{
        type:schema.Types.ObjectId,
        ref:'Product'
    },
    size:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
    },
    quantity:{
        type:Number,
        required:true
    },
    totalPrice:{
        type:Number,
        required:true
    }
})

const CartSchema = new schema({
    userId:{
        type:schema.Types.ObjectId,
        ref:'User'
    },
    cart:[ProductSchemaForCart],
    totalPriceInCart:{
        type:Number,
    },
    totalQuantityInCart:{
        type:Number,
    }
},{timestamps:true});

module.exports = mongoose.model('Cart',CartSchema);