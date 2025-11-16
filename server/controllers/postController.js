/* Routing:
1: Create One
2: Read One
3: Update One
4: Delete One
5: Read All
*/

const database = require('../connect');
const objectId = require('mongodb').ObjectId;

// create a new post
const createPost = async (request, response) => {
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
}

// get a single post
const getOnePost = async (request, response) => {
    let db = database.getDatabase();
    let data = await db.collection('posts').findOne({ _id: new objectId(request.params.id) });
    //check if accounts exists or not
    if (Object.keys(data).length > 0){
        response.json(data);
    }
    else{
        throw new Error("Account not found");
    }
}

// get all posts
const getAllPosts = async (request, response) => {
    let db = database.getDatabase();
    let data = await db.collection('posts').find({}).toArray();
    response.json(data);
}

// update a post
const updatePost = async (request, response) => {
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
}

// delete a post
const deletePost = async (request, response) => {
    let db = database.getDatabase();
    let data = await db.collection('posts').deleteOne({ _id: new objectId(request.params.id) });
    response.json(data);
}


module.exports = {
    createPost,
    getOnePost,
    getAllPosts,
    updatePost,
    deletePost
};