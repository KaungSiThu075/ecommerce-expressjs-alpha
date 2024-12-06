const superAdminServices = require('../service/SuperAdminService');

const getAllAdmins = async (req, res, next) => {
    const allAdmins = await superAdminServices.getAllAdmin();
    return res.status(200).json(allAdmins)
}

const createAdmin = async (req, res, next) => {
    const adminEmail = req.body.email;
    const adminPassword = req.body.password;

    try
    {
        const createdAdmin = await superAdminServices.createAdmin(adminEmail,adminPassword);
        console.log('created admin in controller ',createdAdmin);

        if(createdAdmin)
        {
            return res.status(201).json(createdAdmin);
        }
    }
    catch(err)
    {
        return res.status(400).json({err:err.message})
    }
}

const updateAdmin = async (req, res, next) => {
    const adminEmail = req.body.email;
    const adminPassword = req.body.password;
    const adminId = req.params.adminId;

    try
    {
        const updatedAdmin = await superAdminServices.updateAdmin(adminId,adminEmail,adminPassword);
        console.log('updated admin in controller ',updatedAdmin);

        if(updatedAdmin)
        {
            return res.status(200).json(updatedAdmin);
        }
    }
    catch(err)
    {
        return res.status(404).json({err:err.message})
    }
}

const deleteAdmin = async (req, res, next) => {
    const adminId = req.params.adminId;

    try
    {
        const deletedAdmin = await superAdminServices.deleteAdmin(adminId);
        console.log('deleted admin in controller ',deletedAdmin);

        if(deletedAdmin)
        {
            return res.status(200).json(deletedAdmin);
        }
    }
    catch(err)
    {
        return res.status(404).json({err:err.message});
    }
}

const getAdminById = async (req, res, next) => {
    const adminId = req.params.adminId;

    try
    {
        const adminById = await superAdminServices.getAdminById(adminId);
        console.log('admin by id in controller ',adminById);
        if(adminById)
        {
            return res.status(200).json(adminById);
        }
    }
    catch(err)
    {
        return res.status(404).json({err:err.message});
    }
}

module.exports = {getAllAdmins,createAdmin,updateAdmin,deleteAdmin,getAdminById}