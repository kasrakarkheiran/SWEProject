const express = require('express');

const {
    createAccount,
    getOneAccount,
    getAllAccounts,
    updateAccount,
    deleteAccount,
    updateEvents
} = require('../controllers/accountController.js')


let accRoutes = express.Router();

// POST new account
accRoutes.post('/accounts/create', createAccount);

// GET a single account
accRoutes.get('/accounts/:id', getOneAccount)

// PATCH account
accRoutes.patch('/accounts/update/:id', updateAccount)

// PATCH account events
accRoutes.patch('/accounts/uevents/:email', updateEvents);

// DELETE account
accRoutes.delete('/accounts/delete/:id', deleteAccount)

// GET all accounts
accRoutes.get('/accounts', getAllAccounts)


module.exports = accRoutes;