const express = require('express')

const UserCtrl = require('../controllers/user.controller');
const { createUser, getUserDetails } = UserCtrl
const router = express.Router()

router.post('/createuser', createUser) // Inserting user information.
router.post('/loginuser', getUserDetails) // Verifying and Getting All user details.
module.exports = router;