const jwt = require('jsonwebtoken');
const {secret} = require('../config/tokenSecret');

const verifyUserToken = (req, res, next) => {
    const token = req.headers.authorization;

    if(!token)
    {
        return res.status(401).send(`Access Denied / Unauthorized Request`);
    }

    try
    {
        const tokenForCheck = token.split(' ')[1];

        if(tokenForCheck === null || !tokenForCheck)
        {
            return res.status(401).send(`Access Denied / Unauthorized Request`);
        }

        const verifiedUser = jwt.verify(tokenForCheck,secret.USER_TOKEN_SECRET);

        if(!verifiedUser)
        {
            return res.status(401).send(`Access Denied / Invalid Token`);
        }

        else
        {
            req.user = verifiedUser;
            next();
        }
    }

    catch(err)
    {
        return res.status(401).send(`Invalid Token`)
    }
}

const verifyAdminToken = (req, res, next) => {
    const token = req.headers.authorization;

    if(!token)
    {
        return res.status(401).send(`Access Denied / Unauthorized Request`);
    }

    try
    {
        const tokenForCheck = token.split(' ')[1];

        if(tokenForCheck === null || !tokenForCheck)
        {
            return res.status(401).send(`Access Denied / Unauthorized Request`);
        }

        const verifiedAdmin = jwt.verify(tokenForCheck,secret.ADMIN_TOKEN_SECRET);

        if(!verifiedAdmin)
        {
            return res.status(401).send(`Access Denied / Invalid Token`);
        }

        else
        {
            req.admin = verifiedAdmin;
            next();
        }
    }

    catch(err)
    {
        return res.status(401).send(`Invalid Token`)
    }
}

module.exports = {verifyUserToken,verifyAdminToken};