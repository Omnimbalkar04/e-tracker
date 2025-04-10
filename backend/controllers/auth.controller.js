import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


export const signup = async (req, res) => {
 
  try {
    const { name, email,  password, username } = req.body;

    if(!name  || !email  || !password || !username ) {
      return res.status(400).json({message:"All fields are required"});
    }

    const emailAlreadyExists = await User.findOne({email})
    if(emailAlreadyExists) {
      return res.status(400).json({success:false,message:"Email already exists"});
    }

    const userAlreadyExists = await User.findOne({ username });
    if (userAlreadyExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      email,
      password: hashedPassword,
      username,
      name,
    })

    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

 
   res.cookie("jwt-expense", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 3 * 24 * 60 * 60 * 1000
    
  });

     res.status(201).json({success:true, message: "User created"});

  } catch (error) {
    console.error("Error in signup", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
}

export const login = async (req, res) => {
 
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if(!user){
      return res.status(400).json({success: false, message: "Invalid Credentials"});
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
      return res.status(400).json({success: false, message: "Invalid Credentials"});
    }


      // Create and send token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    res.cookie("jwt-expense", token, {
      httpOnly: true, //prevent XSS attack
      maxAge: 3 * 24 * 60 * 60 * 1000,
      sameSite: "strict", //prevent CSRF attacks,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(201).json({ message: "User logged in successfully" });

  } catch (error) {
    console.error("Error in login", error.message);
    res.status(400).json({ success: false, message: error.message });
  };
}

export const logout = (req, res) => {
  res.clearCookie("jwt-expense");
  res.json({ success:true, message:"Logout Successfully"});
}

export const getCurrentUser = async (req, res) => {
  try {
     res.json(req.user);
  } catch (error) {
    console.error("Error in getCurrentUser", error.message);
    res.status(400).json({ success: false, message: "Server error" });
  }
}