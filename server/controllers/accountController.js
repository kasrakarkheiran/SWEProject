const { ReturnDocument } = require('mongodb');
const database = require('../connect');
const objectId = require('mongodb').ObjectId;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const { createAccountInDb } = require('../services/accountService');
const validator = require('validator')



const getMe = async (req, res) => {
    try {
    let db = database.getDatabase()
    // Expecting route: /me/:email
    const emailParam = req.params.email || req.params.id;
    const user = await db.collection('accounts').findOne({ email: emailParam });
        if (!user) return res.status(404).json({ error: "user not found" });
        res.json(user);
    } catch (err) {
        res.status(400).json(err)
    } 
}

// create account using service function (used by authcontroller too)
const createAccount = async (req, res) => {
  try {
    let db = database.getDatabase()
    const user = await createAccountInDb(db, req.body)
    res.status(201).json(user)
  } catch (err) {
    res.status(400).json(err)
  }
}


// get one account
const getOneAccount = async (req, res) => {
    let db = database.getDatabase();
    try{
        // route uses '/accounts/:id' so the param is named 'id' (which contains the email)
        const emailParam = req.params.email || req.params.id;
        let data = await db.collection('accounts').findOne({ email: emailParam });
        //check if accounts exists or not
        res.json(data);
    }
    catch(error){
        console.log("Account error: ", error);
        throw new Error("Account not found");
    }
}

// get all accounts
const getAllAccounts = async (req, res) => {
    let db = database.getDatabase();
    let data = await db.collection('accounts').find({}).toArray();
    // TODO: maybe create a data check here
    res.json(data);
}

const updateAccount = async (req, res) => {
  try{
    const db = database.getDatabase();
    //updated user name, email, password
    const { name, email, currentPassword, newPassword } = req.body;

    const user = await db.collection('accounts').findOne({ email: req.params.email });
    if (!user) throw Error("User not found");

    // validates fields
    const hashedPassword = await updateAccountHelper(user, name, email, currentPassword, newPassword)

    const updateObj = { $set: { name, email } };

    if (hashedPassword) {
        updateObj.$set.password = hashedPassword; 
    }

    const data = await db.collection('accounts').updateOne(
        { email: req.params.email }, 
        updateObj
    );

    res.json(data);
    } catch (err) {
        res.status(400).json({error: err.message})
    }
  
}

const updateEvents = async (req, res) => {
    let db = database.getDatabase();
    let objEvents = {
        $set: {
            events: req.body.events
        }
    };
    try{
        // use correct option name and return the updated document value
        let result = await db.collection("accounts").findOneAndUpdate(
            { email: req.params.email },
            objEvents,
            { returnDocument: "after" }
        );

        res.status(200).json(result.value);
    }catch(error){
        console.error("This code is not working: ", error);
        throw error;
    }
}

// delete account
const deleteAccount = async (req, res) => {
    let db = database.getDatabase();
    let data = await db.collection('accounts').deleteOne({ email: new objectId(req.params.id) });
    res.json(data);
}

const getSubscribedEvents = async (req, res) => {
  const db = database.getDatabase();
  const user = await db.collection("accounts").findOne({ email: req.params.email });

  const eventIds = user.events.map(id => new objectId(id));

  const events = await db.collection("posts").find({
    _id: { $in: eventIds }
  }).toArray();

  res.json(events);
};

const getUserEvents = async (req, res) => {
  const db = database.getDatabase();
  const user = await db.collection("accounts").findOne({ email: req.params.email });

  const eventIds = user.myEvents.map(id => new objectId(id));

  const events = await db.collection("posts").find({
    _id: { $in: eventIds }
  }).toArray();

  res.json(events);
};

const verifyEmail = async function (req, res) {
    try {
        const db = database.getDatabase();
        const token = req.params.token;

        const userId = jwt.verify(token, process.env.SECRET)._id;

        let mongoObj = {
            $set: {
                verified: true
            }
        }

        let result = await db.collection('accounts').findOneAndUpdate({ _id: new objectId(userId) }, mongoObj, { returnDocument: "after" });

        res.status(200).json(result.value);
  } catch (err) {
    return res.status(400).send("Invalid or expired token");
  }
}

/*---helper functions---*/
const updateAccountHelper = async function(user, name, email, currentPassword, newPassword){
    const db = database.getDatabase();

    //validation
    if (!name || !email || (currentPassword && !newPassword) || (!currentPassword && newPassword)){
        throw Error("All fields must be filled")
    }
    if (!validator.isEmail(email)){
        throw Error("Email is not valid")
    }

    const userWithUpdatedEmail = await db.collection('accounts').findOne({email})

    // Only throw error if the email belongs to someone else
    if (userWithUpdatedEmail && userWithUpdatedEmail._id.toString() !== user._id.toString()) {
        throw Error("Email already in use");
    }

    if (!currentPassword || !newPassword){
        return;
    }
   
    console.log(user)
    const match = await bcrypt.compare(currentPassword, user.password)
    if (!match) {
        throw Error('Incorrect password')
    }

    if (!validator.isStrongPassword(newPassword)){
        throw Error('Password not strong enough')
    }
    
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(newPassword, salt)

    return hash
}

module.exports = {
    createAccount,
    getOneAccount,
    getAllAccounts,
    deleteAccount,
    updateAccount,
    updateEvents,
    getSubscribedEvents,
    getUserEvents,
    getMe,
    verifyEmail
}