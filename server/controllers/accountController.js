const database = require('../connect');
const objectId = require('mongodb').ObjectId;

const { createAccountInDb } = require('../services/accountService');

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
    let data = await db.collection('accounts').findOne({ _id: new objectId(req.params.id) });
    //check if accounts exists or not
    if (Object.keys(data).length > 0){
        res.json(data);
    }
    else{
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
    let data = await db.collection('accounts').updateOne({ _id: new objectId(req.params.id) } , mongoObj);
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
        let user = await db.collection("accounts").findOne({email: req.params.email});
        let data = await db.collection("accounts").updateOne( { _id: new objectId(user._id) }, objEvents );
        res.json(data);
    }catch(error){
        console.error("This code is not working: ", error);
        throw error;
    }
}

// delete account
const deleteAccount = async (req, res) => {
    let db = database.getDatabase();
    let data = await db.collection('accounts').deleteOne({ _id: new objectId(req.params.id) });
    res.json(data);
}


module.exports = {
    createAccount,
    getOneAccount,
    getAllAccounts,
    deleteAccount,
    updateAccount,
    updateEvents,
}