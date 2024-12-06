const bcrypt = require('bcrypt');
const SuperAdmin = require('../model/SuperAdmin');

const superAdminStartUp = async () => {
    try
    {
        const existingSuperAdmin = await SuperAdmin.
        findOne({role:'super admin'})

        if(existingSuperAdmin)
        {
            console.log('super admin exist');
            return existingSuperAdmin;
        }

        const salt = await bcrypt.genSalt(10);

        //store super admin password in env
        const hashPassword = await bcrypt.hash('superadminpass',salt);

        const newSuperAdmin = new SuperAdmin({
            name:'super admin',
            email:'superadmin@gmail.com',
            password:hashPassword,
        })

        const savedSuperAdmin = await newSuperAdmin.save();

        return savedSuperAdmin;
    }
    catch(error)
    {
        console.log('err', error);
    }
}

module.exports = superAdminStartUp;
