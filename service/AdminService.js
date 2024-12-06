const Admin = require('../model/Admin');
const bcrypt = require('bcrypt');

const adminLogIn = async (adminEmail,adminPassword) => {
    const existingAdmin = await Admin.findOne({email:adminEmail});
    console.log('existingAdmin in service ', existingAdmin);

    if(!existingAdmin)
    {
        throw new Error(`invalid email or password`)
    }
    else
    {
        const validPass = await bcrypt.compare(adminPassword,existingAdmin.password);

        if(validPass)
        {
            return existingAdmin;
        }
        else
        {
            throw new Error(`invalid email or password`)
        }
    }
}

module.exports = {adminLogIn}