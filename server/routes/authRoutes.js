    const express = require('express')

// controller functions
const {signupUser, loginUser} = require('../controllers/authController')


const router = express.Router()


// login route
router.post('/accounts/login', loginUser)

// signup route
router.post('/accounts/signup', signupUser)

module.exports = router