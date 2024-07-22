import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import errorHandler from "../utils/error.js";
import jwt from "jsonwebtoken";
import exp from "constants";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  //hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {

  const { username, password } = req.body;


  try {

    const validUser = await User.findOne({username});
    if(!validUser){
      return next(errorHandler("User credentials not Registered", 401));

    }
    const validPassword =  bcrypt.compareSync(password, validUser.password);
    if(!validPassword){
      return next(errorHandler("Invalid Username of Password", 401));
    }

    const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
    res.cookie("token", token, {httpOnly: true}).status(200).json(validUser);

    

}
catch (error) {
  next(error);
}

}

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({email: req.body.email});
    if(user){
      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
      const {password:pass ,...rest} = user._doc;

      res.cookie("token", token, {httpOnly: true}).status(200).json(user);
      
    }
    else{
      const pass = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(pass, 10);
      const newUser = new User({username: req.body.name.split(" ").join("").toLowerCase(), email: req.body.email, password: hashedPassword, photo: req.body.photo});
      await newUser.save();
      const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
      res.cookie("token", token, {httpOnly: true}).status(200).json(newUser);
    }



    
  } catch (error) {
    next(error)
    
  }
}