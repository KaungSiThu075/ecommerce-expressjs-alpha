const UserProfile = require('../model/UserProfile');
const User = require('../model/User');

const getAllUserProfiles = async () => {
    const userProfiles = await UserProfile.find();

    if(userProfiles.length)
    {
        return userProfiles;
    }
    else
    {
        return [];
    }
}

const createUserProfile = async (userProfile) => {
    const newUserProfile = new UserProfile(userProfile);
    console.log('created new user profile ',newUserProfile);

    const savedUserProfile = await newUserProfile.save();
    console.log('saved new user profile ',savedUserProfile);

    // const refinedProfile = await savedUserProfile.populate({
    //     path: 'profileAvatar',
    //     select: '-publicId'
    // });
    // console.log('refined profile ',refinedProfile);

    if(savedUserProfile)
    {
        const updatedUser = await User.findOneAndUpdate(
            {_id:savedUserProfile.userId},
            {profileCreated:true,userProfile:savedUserProfile._id});
        console.log('updated user ',updatedUser);

        return savedUserProfile;
    }
}

const getUserProfileById = async (userId) => {
    const userProfileById = await UserProfile.findOne({userId});
    console.log('getUserProfileById in service ',userProfileById);

    if(userProfileById)
    {
        return {profile:userProfileById};
    }
    else
    {
        return {profile:null};
    }
}

const updateUserProfile = async (userId,userProfile) => {
    const userProfileById = await UserProfile.findOne({userId});
    if(!userProfileById)
    {
        throw new Error(`can't find user profile`)
    }

    const updatedUserProfile = await UserProfile.findOneAndUpdate({userId},userProfile,{new:true});
    console.log('updated user profile ',updatedUserProfile);

    if(updatedUserProfile)
    {
        return updatedUserProfile;
    }
}

const deleteUserProfile = async (userId) => {
    const userProfileById = await UserProfile.findOne({userId});
    if(!userProfileById)
    {
        throw new Error(`can't find user profile`)
    }

    const deletedUserProfile = await UserProfile.findOneAndDelete({userId});
    if(deletedUserProfile)
    {
        return deletedUserProfile;
    }
}

module.exports = {createUserProfile,getUserProfileById,getAllUserProfiles,updateUserProfile,deleteUserProfile}