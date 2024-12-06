const adminService = require('../service/AdminService');
const jwt = require('jsonwebtoken');
const {secret} = require('../config/tokenSecret')

const adminLogIn = async (req, res, next) => {
    const adminEmail = req.body.email;
    const adminPassword = req.body.password;

    try
    {
        const admin = await adminService.adminLogIn(adminEmail, adminPassword);
        console.log('admin in controller ',admin)
        if(admin)
        {
            const payload = {id:admin._id}

            const token = jwt.sign(payload,secret.ADMIN_TOKEN_SECRET);

            return res.status(200).send({token})
        }
    }
    catch(err)
    {
        console.log('err ',err)
        return res.status(401).send({message:`Invalid Admin`})
    }
}

module.exports = {adminLogIn}