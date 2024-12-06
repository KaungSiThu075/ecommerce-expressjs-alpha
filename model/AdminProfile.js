const mongoose = require('mongoose')
const schema = mongoose.Schema;
const AdminProfileSchema = new schema({
    name:{
        type: String,
        required: true
    },
    profileAvatar:{
        type: String
    },
    gender:{
        type: String,
        required:true
    },
    phoneNumber:{
        type: String,
        required: true
    }
},{timestamps:true});

module.exports = mongoose.model('AdminProfile',AdminProfileSchema);