const express = require('express');

const {
    createPost,
    getFilteredPosts,
    getOnePost,
    getAllPosts,
    updatePost,
    deletePost
} = require('../controllers/postController.js')

let postsRoutes = express.Router();



// POST a new post
postsRoutes.post('/posts/create', createPost)

//GET filtered posts
postsRoutes.get('/posts/filter', getFilteredPosts)

// GET a single post
postsRoutes.get('/posts/:id', getOnePost)

// GET all posts
postsRoutes.get('/posts', getAllPosts)

// PATCH a post
postsRoutes.patch('/posts/update/:id', updatePost)

// DELETE a post
postsRoutes.delete('/posts/delete/:id', deletePost)


module.exports = postsRoutes;