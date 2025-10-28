/* Routing:
1: Create One
2: Read One
3: Update One
4: Delete One
5: Read All
*/

const express = require('express');
const database = require('./connect');
const objectId = require('mongodb').ObjectId;

let accRoutes = express.Router();

//1
accRoutes.route('/accounts/create').post(async (request, response) => {
    let db = database.getDatabase();
    let mongoObj = {
        name: request.body.name,
        email: request.body.email,
        password: request.body.password,
        dateCreated: request.body.dateCreated
    };
    let data = await db.collection('accounts').insertOne(mongoObj);
    response.json(data);
})

//2
accRoutes.route('/accounts/:id').get(async (request, response) => {
    let db = database.getDatabase();
    let data = await db.collection('accounts').findOne({ _id: new objectId(request.params.id) });
    //check if accounts exists or not
    if (Object.keys(data).length > 0){
        response.json(data);
    }
    else{
        throw new Error("Account not found");
    }
})

//3 
accRoutes.route('/accounts/update/:id').put(async (request, response) => {
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
})

//4
accRoutes.route('/accounts/delete/:id').delete(async (request, response) => {
    let db = database.getDatabase();
    let data = await db.collection('accounts').deleteOne({ _id: new objectId(request.params.id) });
    response.json(data);
})



//5
accRoutes.route('/accounts').get(async (request, response) => {
    let db = database.getDatabase();
    let data = await db.collection('accounts').find({}).toArray();
    // TODO: maybe create a data check here
    response.json(data);
})


module.exports = accRoutes;