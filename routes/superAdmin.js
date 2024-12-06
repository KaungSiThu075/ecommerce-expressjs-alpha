const express = require('express');
const router = express.Router();
const superAdmin = require('../controller/SuperAdminController');

router.get('/',superAdmin.getAllAdmins)
router.get('/:adminId',superAdmin.getAdminById)
router.post('/',superAdmin.createAdmin)
router.put('/:adminId',superAdmin.updateAdmin)
router.delete('/:adminId',superAdmin.deleteAdmin)

module.exports = router;