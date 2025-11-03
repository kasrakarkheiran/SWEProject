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

let postsRoutes = express.Router();

//1
postsRoutes.route('/posts/create').post(async (request, response) => {
    let db = database.getDatabase();
    let mongoObj = {
        title : request.body.title,
        description: request.body.description,
        content : request.body.content,
        author : request.body.author,
        dateCreated : request.body.dateCreated
    };
    let data = await db.collection('posts').insertOne(mongoObj);
    response.json(data);
})

//2
postsRoutes.route('/posts/:id').get(async (request, response) => {
    let db = database.getDatabase();
    let data = await db.collection('posts').findOne({ _id: new objectId(request.params.id) });
    //check if accounts exists or not
    if (Object.keys(data).length > 0){
        response.json(data);
    }
    else{
        throw new Error("Account not found");
    }
})

//3 
postsRoutes.route('/posts/update/:id').put(async (request, response) => {
    let db = database.getDatabase();
    let mongoObj = {
        $set: {
            title : request.body.title,
            description: request.body.description,
            content : request.body.content,
            author : request.body.author,
            dateCreated : request.body.dateCreated
        }
    };
    let data = await db.collection('posts').updateOne({ _id: new objectId(request.params.id) } , mongoObj);
    response.json(data);
})

//4
postsRoutes.route('/posts/delete/:id').delete(async (request, response) => {
    let db = database.getDatabase();
    let data = await db.collection('posts').deleteOne({ _id: new objectId(request.params.id) });
    response.json(data);
})



//5
postsRoutes.route('/posts').get(async (request, response) => {
    let db = database.getDatabase();
    let data = await db.collection('posts').find({}).toArray();
    response.json(data);
})


module.exports = postsRoutes;