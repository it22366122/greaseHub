import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { log } from 'console';

dotenv.config();


// Connect to MongoDB
mongoose.connect(process.env.dbURL).then(() => {
  log('Connected to MongoDB');
}).catch((err)=> {console.log(error);});

const app = express();
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});