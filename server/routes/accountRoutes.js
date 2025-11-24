const express = require('express');

const {
    createAccount,
    getOneAccount,
    getAllAccounts,
    updateAccount,
    deleteAccount,
    updateEvents,
    getUserEvents,
    getMe
} = require('../controllers/accountController.js')


let accRoutes = express.Router();

// POST new account
accRoutes.post('/accounts/create', createAccount);

// GET a single account
accRoutes.get('/accounts/:id', getOneAccount)

//GET subscribed to posts
accRoutes.get('/accounts/subscribed/:email', getUserEvents) 

// PATCH account
accRoutes.patch('/accounts/update/:id', updateAccount)

// PATCH account events
accRoutes.patch('/accounts/uevents/:email', updateEvents);

// DELETE account
accRoutes.delete('/accounts/delete/:id', deleteAccount)

// GET all accounts
accRoutes.get('/accounts', getAllAccounts)

accRoutes.get('/me/:email', getMe)
module.exports = accRoutes;