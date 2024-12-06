const mongoose = require('mongoose');
const schema = mongoose.Schema;
const UserSchema = new schema({
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
        unique: true,
    },
    profileCreated:{
        type:Boolean,
        default:false
    },
    userProfile:{
        type:schema.Types.ObjectId,
        ref:'UserProfile',
    },
    role:{
        type: String,
        default: 'user',
    }
},{timestamps:true})

module.exports = mongoose.model('User',UserSchema);