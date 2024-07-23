import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import errorHandler from "../utils/error.js";
import jwt from "jsonwebtoken";

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


export const signout = async (req, res, next) => {
  try {
    res.clearCookie("token"); // Assuming 'token' is the name of the cookie
    res.status(200).json({ message: "Signout Successful!" });
  } catch (error) {
    next(error);
  }
};






export const google = async (req, res, next) => {
  try {
    // Find user by email
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      // If user exists, generate a token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      // Destructure to omit the password from the response
      const { password, ...rest } = user._doc;

      // Set cookie and send response
      res.cookie("token", token, { httpOnly: true }).status(200).json(rest);
    } else {
      // If user does not exist, create a new one
      const pass = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(pass, 10);
      const newUser = new User({
        username: req.body.name.split(" ").join("").toLowerCase(),
        email: req.body.email,
        password: hashedPassword,
        photo: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

      const { password, ...rest } = newUser._doc;

      res.cookie("token", token, { httpOnly: true }).status(200).json(rest);
    }
  } catch (error) {
    next(error);
  }
};