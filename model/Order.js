const mongoose = require('mongoose');
const schema = mongoose.Schema;

const productForCartOrderSchema = {
    _id:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    }
}

const cartSchema = new schema({
    // product:{
    //     type:schema.Types.ObjectId,
    //     ref:'Product',
    //     required:true
    // },
    product:productForCartOrderSchema,
    size:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true,
       // min:1
    },
    price:{
        type:Number,
        required:true
    },
    totalPrice:{
        type:Number,
        required:true,
    }
})

const OrderSchema = new schema({
    userId:{
        type:schema.Types.ObjectId,
        ref:'User'
    },
    cart:[cartSchema],
    payment:{
        type:String,
        required:true
    },
    totalOrderQuantity:{
        type:Number,
        required:true
    },
    totalOrderAmount:{
        type:Number,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model('Order',OrderSchema);