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
    const db = database.getDatabase();
    try {
        const authorName = request.body.author;
        const creatorEmail = request.body.creatorEmail || request.body.authorEmail || null;

        const mongoObj = {
            title: request.body.title,
            description: request.body.description,
            author: authorName,
            category: request.body.category,
            // convert incoming date strings to Date objects to ensure correct type in DB
            eventDate: request.body.eventDate ? new Date(request.body.eventDate) : null,
            dateCreated: request.body.dateCreated ? new Date(request.body.dateCreated) : new Date(),
            location: request.body.location || null,
            capacity: request.body.capacity ? Number(request.body.capacity) : null,
            participants: authorName ? [authorName] : (request.body.participants || [])
        };

        const result = await db.collection('posts').insertOne(mongoObj);

        // inserted id as string for storing in user documents
        const insertedIdStr = result.insertedId.toString();

        // If we have a creator identifier (email), add the post id to their events/myEvents arrays
        if (creatorEmail) {
            await db.collection('accounts').updateOne(
                { email: creatorEmail },
                { $addToSet: { events: insertedIdStr, myEvents: insertedIdStr } }
            );
        }

        // return the created post document
        const inserted = await db.collection('posts').findOne({ _id: result.insertedId });
        response.status(201).json(inserted);
    } catch (err) {
        console.error('Create post error:', err);
        response.status(500).json({ error: err.message });
    }
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
    
    // Build update object only with fields that are provided
    let updateFields = {};
    
    if (request.body.title !== undefined) updateFields.title = request.body.title;
    if (request.body.description !== undefined) updateFields.description = request.body.description;
    if (request.body.content !== undefined) updateFields.content = request.body.content;
    if (request.body.author !== undefined) updateFields.author = request.body.author;
    if (request.body.category !== undefined) updateFields.category = request.body.category;
    if (request.body.eventDate !== undefined) updateFields.eventDate = request.body.eventDate ? new Date(request.body.eventDate) : null;
    if (request.body.dateCreated !== undefined) updateFields.dateCreated = request.body.dateCreated;
    if (request.body.location !== undefined) updateFields.location = request.body.location;
    if (request.body.capacity !== undefined) updateFields.capacity = request.body.capacity;
    if (request.body.participants !== undefined) updateFields.participants = request.body.participants;
    
    let mongoObj = {
        $set: updateFields
    };
    
    try {
        let data = await db.collection('posts').updateOne({ _id: new objectId(request.params.id) }, mongoObj);
        
        // Return the updated document
        const updated = await db.collection('posts').findOne({ _id: new objectId(request.params.id) });
        response.json(updated);
    } catch (err) {
        console.error('Update post error:', err);
        response.status(500).json({ error: err.message });
    }
}

// delete a post
const deletePost = async (request, response) => {
    const db = database.getDatabase();
    try{
        const id = request.params.id;
        const oid = new objectId(id);

        // remove references to this post id from all user documents (events & myEvents)
        const postIdStr = id.toString();
        await db.collection('accounts').updateMany({}, { $pull: { events: postIdStr, myEvents: postIdStr } });

        // delete the post document
        const result = await db.collection('posts').deleteOne({ _id: oid });
        response.json(result);
    }catch(err){
        console.error('Delete post error:', err);
        response.status(500).json({ error: err.message });
    }
}


module.exports = {
    createPost,
    getFilteredPosts,
    getOnePost,
    getAllPosts,
    updatePost,
    deletePost
};