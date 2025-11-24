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
        author : request.body.author,
        category: request.body.category,
        // convert incoming date strings to Date objects to ensure correct type in DB
        eventDate: request.body.eventDate ? new Date(request.body.eventDate) : null,
        dateCreated : request.body.dateCreated ? new Date(request.body.dateCreated) : new Date(),
        location: request.body.location || null,
        capacity: request.body.capacity ? Number(request.body.capacity) : null,
        participants: request.body.participants || []
    };
    let data = await db.collection('posts').insertOne(mongoObj);
    response.json(data);
}


// get all posts with filters
const getFilteredPosts = async (request, response) => {
    console.log("Received query:", request.query);
    let db = database.getDatabase();
    let query = {};

    // Filter by category if provided (case-insensitive)
    if (request.query.category && request.query.category !== '') {
        // escape special regex chars from input
        const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const cat = request.query.category;
        query.category = { $regex: new RegExp(`^${escapeRegExp(cat)}$`, 'i') };
    }

    // Filter by event date range if provided
    if (request.query.eventStartDate || request.query.eventEndDate) {
        const dateFilter = {};

        if (request.query.eventStartDate) {
            dateFilter.$gte = new Date(request.query.eventStartDate);
        }

        if (request.query.eventEndDate) {
            const end = new Date(request.query.eventEndDate);
            end.setDate(end.getDate() + 1);
            dateFilter.$lte = end;
        }

        // Only add if there is actually a condition
        if (Object.keys(dateFilter).length > 0) {
            query.eventDate = dateFilter;
        }
    }

    try {
        console.log("Mongo query:", query);
        let data = await db.collection('posts').find(query).toArray();
        response.json(data);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
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
            category: request.body.category,
            eventDate: request.body.eventDate,
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
    getFilteredPosts,
    getOnePost,
    getAllPosts,
    updatePost,
    deletePost
};