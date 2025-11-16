const database = require('../connect');
const objectId = require('mongodb').ObjectId;

// create account
const createAccount = async (request, response) => {
    let db = database.getDatabase();
    let mongoObj = {
        name: request.body.name,
        email: request.body.email,
        password: request.body.password,
        dateCreated: request.body.dateCreated
    };
    let data = await db.collection('accounts').insertOne(mongoObj);
    response.json(data);
}

// get one account
const getOneAccount = async (request, response) => {
    let db = database.getDatabase();
    let data = await db.collection('accounts').findOne({ _id: new objectId(request.params.id) });
    //check if accounts exists or not
    if (Object.keys(data).length > 0){
        response.json(data);
    }
    else{
        throw new Error("Account not found");
    }
}

// get all accounts
const getAllAccounts = async (request, response) => {
    let db = database.getDatabase();
    let data = await db.collection('accounts').find({}).toArray();
    // TODO: maybe create a data check here
    response.json(data);
}

// update account
const updateAccount = async (request, response) => {
    let db = database.getDatabase();
    let mongoObj = {
        $set: {
            name: request.body.name,
            email: request.body.email,
            password: request.body.password,
            dateCreated: request.body.dateCreated
        }
    };
    let data = await db.collection('accounts').updateOne({ _id: new objectId(request.params.id) } , mongoObj);
    response.json(data);
}

// delete account
const deleteAccount = async (request, response) => {
    let db = database.getDatabase();
    let data = await db.collection('accounts').deleteOne({ _id: new objectId(request.params.id) });
    response.json(data);
}

module.exports = {
    createAccount,
    getOneAccount,
    getAllAccounts,
    deleteAccount,
    updateAccount
}