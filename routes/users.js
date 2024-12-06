const express = require('express');
const router = express.Router();
const users = require('../controller/UserController')

router.post('/register',users.userRegister);
router.post('/login',users.userLogin);
router.get('/:userId',users.getUserById);
router.put('/:userId',users.updateUser);
router.delete('/:userId',users.deleteUser)

module.exports = router;
