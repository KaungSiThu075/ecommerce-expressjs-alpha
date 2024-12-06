const bcrypt = require('bcrypt');
const Admin = require("../model/Admin");

const getAllAdmin = async () => {
    const allAdmins = await Admin.find();
    if(allAdmins.length)
    {
        return allAdmins;
    }
    else
    {
        return [];
    }
}

const createAdmin = async (adminEmail,adminPassword) => {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(adminPassword,salt);

    const newAdmin = new Admin({
        email:adminEmail,
        password:hashPassword
    })

    const savedAdmin = await newAdmin.save();
    console.log('saved admin ',savedAdmin);

    return savedAdmin;
}

const updateAdmin = async (adminId,adminEmail,adminPassword) => {
    const existingAdmin = await Admin.findById(adminId);
    if(!existingAdmin)
    {
        throw new Error(`can't find admin`);
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(adminPassword,salt);

    const newAdminData = {email:adminEmail,password:hashPassword}

    const updatedAdmin = await Admin.
    findByIdAndUpdate(adminId,newAdminData,{new:true});

    console.log('updated admin in service ',updatedAdmin);

    return updatedAdmin;
}

const deleteAdmin = async (adminId) => {
    const existingAdmin = await Admin.findById(adminId);
    if(!existingAdmin)
    {
        throw new Error(`can't find admin`);
    }

    const deletedAdmin = await Admin.findByIdAndDelete(adminId);
    console.log('deleted admin in controller ',deletedAdmin);

    if(deletedAdmin)
    {
        return deletedAdmin;
    }
}

const getAdminById = async (adminId) => {
    const adminById = await Admin.findById(adminId);
    console.log('admin by id in service ',adminById);

    if(adminById)
    {
        return adminById;
    }
}

module.exports = {getAllAdmin,createAdmin,updateAdmin,deleteAdmin,getAdminById}