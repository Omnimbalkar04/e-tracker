import { User } from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";


export const getPublicProfile = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select("-password");

    if(!user){
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error in getPublicProfile", error.message);
    res.status(500).json({ message: "Server Error" });
  }
}

export const updateProfile = async (req, res) => {
  try {
    const allowedFields = [
      "name",
      "username",
      "profilePicture"
    ];

    const updateData = {};

    for(const field of allowedFields){
      if(req.body[field]){
        updateData[field] = req.body[field];
      }
    }

    // check for the images

    if(req.body.profilePicture){
      const result = await cloudinary.uploader.upload(req.body.profilePicture);
      updateData.profilePicture = result.secure_url;
    }


    

    const user = await User.findByIdAndUpdate(req.user._id, {$set: updateData}, {new: true}).select("-password");

    res.json(user);
  } catch (error) {
    console.error("Error in updateProfile", error.message);
    res.status(500).json({ message: "Server Error" });
  }
}