import express from 'express';
import usersRouter from './routes/users.js';
import cors from 'cors';

// const express = require('express');
const app = express();
// const usersRouter = require('./routes/users.js');
// const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000', // Adjust this to your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}))
app.use(express.json());
app.use('/', usersRouter);

app.listen(5000,()=>{
    console.log('Server is running on port 5000');
});