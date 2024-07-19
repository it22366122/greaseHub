import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import errorHandler from '../utils/errorHandler.js';


export const signup = async (req, res, next) => {


  const {username, email, password} = req.body

  //hash the password
  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = new User({username,email,password:hashedPassword})


  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully!" });
    
  } catch (error) {
   next(error); 
    
  }
  
  

};
