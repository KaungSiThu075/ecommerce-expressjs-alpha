const mongoose = require('mongoose')
const schema = mongoose.Schema;
const SuperAdminSchema = new schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
        unique: true,
    },
    role:{
        type: String,
        default:'super admin'
    }
},{timestamps: true});

module.exports = mongoose.model('SuperAdmin',SuperAdminSchema);