import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// const { createClient } = require('@supabase/supabase-js');
// const dotenv = require('dotenv');
// Load environment variables from .env file
dotenv.config();

const supabaseUrl = process.env.BACKEND_SUPABASE_URL;
const supabaseKey = process.env.BACKEND_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and Key must be provided in environment variables.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// module.exports = supabase;
export default supabase;
// This module initializes the Supabase client with the provided URL and key.
// It can be imported in other parts of the application to interact with the Supabase database.