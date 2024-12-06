const User = require('../model/User');
const bcrypt = require('bcrypt');

const userRegister = async (userEmail,userPassword) => {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(userPassword, salt);

    let newUser = new User({
        email:userEmail,
        password:hashPassword
    })

    const savedUser = await newUser.save()
    console.log('saved new user in service ',savedUser);

    return savedUser;
}

const userLogin = async (userEmail,userPassword) => {
    const userByEmail = await User.findOne({email: userEmail});

    console.log('user by email in service ',userByEmail);

    if(!userByEmail)
    {
        throw new Error(`Invalid User or Password`)
    }

    else
    {
        const validPass = await bcrypt.compare(userPassword, userByEmail.password);

        console.log('valid pass in service ',validPass)

        if(validPass)
        {
            return userByEmail;
        }

        else
        {
            throw new Error(`Invalid User or Password`)
        }
    }
}

const getUserById = async (userId) => {
    const userById = await User.findById(userId);

    console.log('user by id in service ',userById);

    if(userById)
    {
        return userById
    }

    else
    {
        throw new Error(`Can't find user`)
    }
}

const updateUser = async (userId,userEmail,userPassword) => {
    const userById = await User.findById(userId);
    console.log('user by id in service ',userById);

    if(userById)
    {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(userPassword, salt);

        const newUserData = {email:userEmail,password:hashPassword}

        const updatedUser = await User.findByIdAndUpdate(userId,newUserData,{new:true});
        console.log('updatedUser in service ',updatedUser)

        return updatedUser;
    }
    else
    {
        throw new Error(`Can't find user`)
    }
}

const deleteUser = async (userId) => {
    const userById = await User.findById(userId);
    console.log('user by id in service ',userById);

    if(userById)
    {
        const deletedUser = await User.findByIdAndDelete(userId);
        console.log('deleted user in service ',deleteUser)

        return deletedUser;
    }
}

module.exports = {userRegister,userLogin,getUserById,updateUser,deleteUser}