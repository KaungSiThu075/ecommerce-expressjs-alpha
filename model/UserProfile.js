const mongoose = require('mongoose');
const schema = mongoose.Schema;
const UserProfileSchema = new schema({
    userId:{
        type:schema.Types.ObjectId,
        ref:'User'
    },
    name:{
        type: String,
        required: true
    },
    profileAvatar:{
        type:String
        //imgUrl: {type: String},
        //publicId:{type: String}
    },
    gender:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    },
    birthday:{
        type: Date,
    },
    // interestedCategory:{
    //     type: [String],
    // }
},{timestamps:true});

module.exports = mongoose.model('UserProfile', UserProfileSchema);