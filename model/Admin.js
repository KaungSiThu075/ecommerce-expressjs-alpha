const mongoose = require('mongoose');
const schema = mongoose.Schema;
const AdminSchema = new schema({
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
        unique: true,
    },
    role:{
        type: String,
        default: 'admin',
    }
},{timestamps: true});

module.exports = mongoose.model('Admin',AdminSchema);