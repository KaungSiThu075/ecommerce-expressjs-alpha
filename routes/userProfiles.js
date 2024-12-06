const express = require('express');
const router = express.Router();
const upload = require('../middleware/ImageUploadMiddleware');
const userProfiles = require('../controller/UserProfileController');

router.get('/',userProfiles.getAllUserProfiles)
router.post('/',upload.single('profileAvatar'),userProfiles.createUserProfile)
router.get('/profile',userProfiles.getUserProfileById)
router.put('/',upload.single('profileAvatar'),userProfiles.updateUserProfile)
router.delete('/',userProfiles.deleteUserProfile)

module.exports = router;