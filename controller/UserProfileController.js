const userProfileService = require('../service/UserProfileService');
const { cloudinary } = require('../config/cloudinaryConfig');
const { Readable,stream } = require('stream');

const getAllUserProfiles = async (req, res, next) => {
        const userProfiles = await userProfileService.getAllUserProfiles();
        if(userProfiles)
        {
            return res.status(200).json(userProfiles);
        }
}

const createUserProfile = async (req, res, next) => {
    try {
        const profile = req.body;
        const userId = req.user.id;
        console.log('user in controller ', userId);
        console.log('profile in controller ', profile);
        console.log('image in controller ', req.file);

        // const profileImageFile = await cloudinary.uploader.
        // upload(req.file.path,{folder:'E-Commerce-Project/UserProfileImages'});

        // const userProfileForUse = {...profile,
        //     userId:userId,
        //     //profileAvatar:{imgUrl:profileImageFile.secure_url,publicId:profileImageFile.public_id}}
        //     profileAvatar:profileImageFile.secure_url}
        // console.log('userProfileForUse in controller ',userProfileForUse);

        // const stream = Readable.from(req.file.buffer);
        // const cloudinaryUpload = () =>
        //     new Promise((resolve, reject) => {
        //         const uploadStream = cloudinary.uploader.upload_stream(
        //             { folder: 'E-Commerce-Project/UserProfileImages' },
        //             (error, result) => {
        //                 if (error) reject(error);
        //                 else resolve(result);
        //             }
        //         );
        //         stream.pipe(uploadStream);
        //     });
        //
        // const profileImage = await cloudinaryUpload();
        //
        // console.log('profile image ',profileImage);

        // Stream upload function using Cloudinary
        const streamUpload = (buffer) =>
            new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "E-Commerce-Project/UserProfileImages" }, // Specify folder
                    (error, result) => {
                        if (result) resolve(result);
                        else reject(error);
                    }
                );

                // Create a readable stream from the buffer and pipe it
                Readable.from(buffer).pipe(stream);
            });

        // Perform upload and get the result
        const uploadResult = await streamUpload(req.file.buffer);

        console.log('uploadResult', uploadResult);

        const userProfileForUse = {
            ...profile,
            userId: userId,
            profileAvatar: uploadResult.secure_url,
        };

            console.log('userProfileForUse in controller ', userProfileForUse);

            const createdUserProfile = await userProfileService.createUserProfile(userProfileForUse);
            console.log('createdUserProfile in controller ',createdUserProfile);

            if(createdUserProfile)
            {
                return res.status(201).json(createdUserProfile);
            }
        }
        catch(err)
        {
            return  res.status(400).json({err:err.message})
        }
}

const getUserProfileById  = async (req,res,next) => {
    const userId = req.user.id;
    console.log('user id in controller ',userId)

    try
    {
        const userProfileById = await userProfileService.getUserProfileById(userId);
        console.log('userProfileById in controller ',userProfileById);

        if(userProfileById)
        {
            return res.status(200).json(userProfileById);
        }
    }
    catch(err)
    {
        return res.status(404).json({err:err.message})
    }
}

const updateUserProfile = async (req,res,next) => {
console.log('update user profile in controller run')
    try
    {
        const profile = req.body;
        const userId = req.user.id;
        const img = req.file;
        console.log('profile in controller ',profile);
        console.log('user id in controller ',userId)
        console.log('img in controller ',img);

        if(!img)
        {
           const profileForUse = {...profile};

            const updatedUserProfile = await userProfileService.updateUserProfile(userId, profileForUse);
            console.log('updatedUserProfile in controller ', updatedUserProfile);

            if (updatedUserProfile) {
                return res.status(200).json(updatedUserProfile);
            }
        }
        else
        {
            // const newImageFile = await cloudinary.uploader.upload(req.file.path, {folder: 'E-Commerce-Project/UserProfileImages'})
            // console.log('new image file ', newImageFile);
            //
            // const profileForUse = {...profile, profileAvatar: newImageFile.secure_url};
            // console.log('profile for use ', profileForUse)
            //
            // const updatedUserProfile = await userProfileService.updateUserProfile(userId, profileForUse);
            // console.log('updatedUserProfile in controller ', updatedUserProfile);
            //
            // if (updatedUserProfile) {
            //     return res.status(200).json(updatedUserProfile);
            // }

            const stream = Readable.from(req.file.buffer);
            const cloudinaryUpload = () =>
                new Promise((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        { folder: 'E-Commerce-Project/UserProfileImages' },
                        (error, result) => {
                            if (error) reject(error);
                            else resolve(result);
                        }
                    );
                    stream.pipe(uploadStream);
                });

            const newImageFile = await cloudinaryUpload();
            console.log('new image file:', newImageFile);

            const profileForUse = { ...profile, profileAvatar: newImageFile.secure_url };
            console.log('profile for use:', profileForUse);

            const updatedUserProfile = await userProfileService.updateUserProfile(userId, profileForUse);
            console.log('updatedUserProfile in controller:', updatedUserProfile);

            if (updatedUserProfile) {
                return res.status(200).json(updatedUserProfile);
            }
        }
    }
    catch(err)
    {
        return res.status(404).json({err:err.message})
    }
}

const deleteUserProfile = async (req, res, next) => {
    const userId = req.user.id;

    try
    {
        const userProfileById = await userProfileService.getUserProfileById(userId);

        if(userProfileById)
        {
            const destroy = await cloudinary.uploader.destroy(userProfileById.profileAvatar.publicId)
            console.log('destroy ',destroy)
        }

        const deletedUserProfile = await userProfileService.deleteUserProfile(userProfileId);
        console.log('deletedUserProfile in controller ',deletedUserProfile);
        if(deletedUserProfile)
        {
            return res.status(200).json(deletedUserProfile);
        }
    }
    catch(err)
    {
        return res.status(404).json({err:err.message})
    }
}

module.exports = {getAllUserProfiles,createUserProfile,getUserProfileById,updateUserProfile,deleteUserProfile}