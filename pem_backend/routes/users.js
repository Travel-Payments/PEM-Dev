import express from 'express';
import { getAllUsers, getUserByEmail, addUser, deleteUser } from '../controllers/user_controller.js';

// const express = require('express');
const router = express.Router();
// const { getAllUsers, getUserByEmail, addUser, deleteUser } = require('./controllers/user_controller.js');

router.get('/allUsers', getAllUsers);
router.get('/users',getUserByEmail);
router.post('/addUser', addUser);
router.delete('/deleteUser', deleteUser);

// module.exports = router;

export default router;
// This code sets up the routes for user-related operations in the Express application.