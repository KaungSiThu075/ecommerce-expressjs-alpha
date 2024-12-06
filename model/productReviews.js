const mongoose = require('mongoose');
const schema = mongoose.Schema;
const ProductReviewSchema = new schema({
    user:{
        type:schema.Types.ObjectId,
        ref:'User',
    },
    userProfile:{
        type:schema.Types.ObjectId,
        ref:'UserProfile'
    },
    // profileCreated:{
    //     type:Boolean,
    //     default:false
    // },
    product:{
        type:schema.Types.ObjectId,
        ref:'Product'
    },
    rating:{
        type:Number,
        required:true
    },
    review:{
        type:String,
        required:true
    }
},{timestamps: true});

module.exports = mongoose.model('ProductReview', ProductReviewSchema);