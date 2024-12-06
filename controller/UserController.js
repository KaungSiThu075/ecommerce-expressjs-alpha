const userService = require('../service/UserService')
const {secret} = require('../config/tokenSecret');
const jwt = require('jsonwebtoken');

const userRegister = async (req,res,next) => {
    const userEmail = req.body.email;
    const userPassword = req.body.password;

    console.log('user email in controller ',userEmail);
    console.log('user password in controller ',userPassword);

    try
    {
        const registeredUser = await userService.userRegister(userEmail,userPassword);
        console.log('registered user in controller ',registeredUser);

        let payload = {id:registeredUser._id};

        const token = jwt.sign(payload,secret.USER_TOKEN_SECRET);

        return res.status(200).send({token});
    }

    catch(err)
    {
        return res.status(400).send({message:`User already exist`})
    }
}

const userLogin = async (req,res,next) => {
    const userEmail = req.body.email;
    const userPassword = req.body.password;

    console.log('user email in controller ',userEmail);
    console.log('user password in controller ',userPassword);

    try
    {
        const registeredUser = await userService.userLogin(userEmail,userPassword);
        console.log('registered user in controller ',registeredUser);

        let payload = {id:registeredUser._id};

        const token = jwt.sign(payload,secret.USER_TOKEN_SECRET);

        return res.status(200).send({token});
    }

    catch(err)
    {
        return res.status(401).send({message:`Invalid User`})
    }
}

const getUserById = async (req, res, next) => {
    const userId = req.params.userId;
    console.log('userId in controller ',userId);

    const userById = await userService.getUserById(userId);
    console.log('userById in controller ',userById);

    if(userById)
    {
        return res.status(200).json(userById);
    }

    else
    {
        return res.status(401).send({message:`Invalid User`})
    }
}

const updateUser = async (req,res,next) => {
    const userId = req.params.userId;
    const userEmail = req.body.email;
    const userPassword = req.body.password;

    console.log('user id in controller ',userId)
    console.log('userEmail in controller ',userEmail);
    console.log('user password in controller ',userPassword);

    try
    {
        const updatedUser = await userService.updateUser(userId,userEmail,userPassword);
        console.log('updated user in controller ',updatedUser)

        if(updatedUser)
        {
            return res.status(200).json(updatedUser)
        }
    }
    catch(err)
    {
        return res.status(401).json({err:err.message})
    }
}

const deleteUser = async (req,res,next) => {
    const userId = req.params.userId;

    console.log('user id in controller ',userId);

    try
    {
        const deletedUser = await userService.deleteUser(userId);
        console.log('deletedUser in controller ',deletedUser);
        if(deletedUser)
        {
            return res.status(200).json(deletedUser)
        }
    }
    catch(err)
    {
        return res.status(404).json({err:err.message})
    }
}

module.exports = {userRegister,userLogin,getUserById,updateUser,deleteUser}