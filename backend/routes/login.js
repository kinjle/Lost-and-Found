const express = require('express')

//controller function
const {signupUser, logInUser, sendOtp} = require('../controllers/userController')
const router = express.Router()

//login route
router.post('/login', logInUser)

//signup route
router.post('/signup', signupUser)

router.post('/sendOtp', sendOtp)

module.exports = router;