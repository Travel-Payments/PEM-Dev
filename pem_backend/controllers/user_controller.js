import supabase from "../db/db_init.js"; // Import the initialized Supabase client
const users = 'users'; 
// const express = require('express');
// const supabase = require('../db/db_init.js');

const getAllUsers = async (req,res) => {
    try{
        const {data,error} = await supabase.from('users').select('*');
        if(error){
            console.error('Error fetching all users:', error);
            return res.status(500).json({error: 'Internal Server Error'});
        }
        if(!data || data.length === 0){
            return res.status(404).json({error: 'No users found'});
        }
        return res.status(200).json(data);
    }
    catch(err){
        console.error('Error in /allUsers route:', err);
        return res.status(500).json({error: 'Internal Server Error'});
    }
}

const getUserByEmail = async (req,res) =>{
     try{
        const email = req.query.email;
        if(!email){
            return res.status(400).json({error: 'Email query parameter is required'});
        }
        const {data,err} = await supabase.from('users').select('*').eq('email',email).single();
        if(err){
            console.error('Error fetching users:', err);
            return res.status(500).json({error: 'Internal Server Error'});
        }
        if(!data){
            return res.status(404).json({error: 'User not found'});
        }
        console.log('User data fetched successfully:', data);
        return res.status(200).json(data);
    }
    catch(err){
        console.error('Error in /users route:', err);
        return res.status(500).json({error: 'Internal Server Error'});
    }
}

const findUserByEmail = async (email) => {
    try {
        const { data, error } = await supabase
            .from(users)
            .select('*')
            .eq('email', email)
            .single();
        if (error) {
            console.error('Error fetching user by email:', error);
            return { status: 500, data: null };
        }
        if (!data) {
            console.log('User not found for email:', email);
            return { status: 404, data: null };
        }
        console.log('User found:', data);
        return { status: 200, data: data };
    } catch (err) {
        console.error('Error in findUserByEmail function:', err);
        return { status: 500, data: null };
    }
}

const addUser = async (req,res) => {
    try{
        console.log('Request body:', req.body);
        console.log('Request headers:', req.headers);
        const existingUser = await findUserByEmail(req.body.email);
        if(existingUser.status === 200){
            console.error('User already exists:', existingUser.data);
            return res.status(400).json({error: 'User already exists'});
        }
        const {data,error} = await supabase
            .from(users)
            .insert({
                email:req.body.email,
                name:req.body.name,
                role:req.body.role
            })
        if(error){
            console.error('Error adding user:', error);
            return res.status(500).json({error: 'Internal Server Error'});
        }
        console.log('User added successfully:', data);
        return res.status(201).json({message: 'User added successfully'});
    }
    catch(err){
        console.error('Error in addUser function:', err);
        return res.status(500).json({error: 'Internal Server Error'});
    }
}

const deleteUser = async (req,res) =>{
    try{
        const email = req.body.email;
        const existingUser = await findUserByEmail(email);
        if(existingUser.status !== 200){
            console.error('User not found:', existingUser.data);
            return res.status(404).json({error: 'User not found'});
        }
        const {data,error} = await supabase
            .from(users)
            .delete()
            .eq('email',email);
        if(error){
            console.error('Error deleting user:', error);
            return res.status(500).json({error: 'Internal Server Error'});
        }
        console.log('User deleted successfully:', data);
        return res.status(200).json({message: 'User deleted successfully'});
    }
    catch(err){
        console.error('Error in deleteUser function:', err);
        return res.status(500).json({error: 'Internal Server Error'});
    }
}

// module.exports = {
//     addUser: addUser,
//     getUserByEmail: getUserByEmail,
//     getAllUsers: getAllUsers,
//     deleteUser: deleteUser
// };

export{
    addUser,
    getUserByEmail,
    getAllUsers,
    deleteUser,
    findUserByEmail
}