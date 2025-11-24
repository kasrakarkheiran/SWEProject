const { ReturnDocument } = require('mongodb');
const database = require('../connect');
const objectId = require('mongodb').ObjectId;

const { createAccountInDb } = require('../services/accountService');




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

// update account
const updateAccount = async (req, res) => {
    let db = database.getDatabase();
    let mongoObj = {
        $set: {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            dateCreated: req.body.dateCreated
        }
    };
    let data = await db.collection('accounts').updateOne({ email: req.params.email} , mongoObj);
    res.json(data);
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


module.exports = {
    createAccount,
    getOneAccount,
    getAllAccounts,
    deleteAccount,
    updateAccount,
    updateEvents,
    getSubscribedEvents,
    getUserEvents,
    getMe
}