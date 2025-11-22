const jwt = require('jsonwebtoken')
const validator = require('validator')
const bcrypt = require('bcrypt')

const { createAccountInDb } = require('../services/accountService');
const database = require('../connect');

const createToken = (_id => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
})

// signup user
const signupUser = async (req, res) => { 
    const db = database.getDatabase();
    const {name, email, password} = req.body

    try {
        // validates all fields and hashes password
        const hashedPassword = await signupHelper(name, email, password)

        const user = await createAccountInDb(db, {name, email, password: hashedPassword, events: []});

        // create a token
        const token = createToken(user._id);

        res.status(200).json({name: user.name, email: user.email, token, events: []});
  } catch (err) {
        res.status(400).json({error: err.message})
  }
}

// login user
const loginUser = async (req, res) => {
    const {_, email, password} = req.body

    try {
        // validates fields, compares hashed passwords and gets user
        const user = await loginHelper(email, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const signupHelper = async function(name, email, password, events){
    const db = database.getDatabase();

    //validation
    if (!name || !email || !password){
        throw Error("All fields must be filled")
    }
    if (!validator.isEmail(email)){
        throw Error("Email is not valid")
    }
    if (!validator.isStrongPassword(password)){
        throw Error('Password not strong enough')
    }

    const exists = await db.collection('accounts').findOne({email})

    if (exists) {
        throw Error("Email already in use")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    return hash
}

// static login method
const loginHelper = async function(email, password) {
    const db = database.getDatabase();

    if (!email || !password){
        throw Error("All fields must be filled")
    }

    const user = await db.collection('accounts').findOne({email})

    if (!user) {
        throw Error("Incorrect email")
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect password')
    }

    return user
}

module.exports = {signupUser, loginUser}