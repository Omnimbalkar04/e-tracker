import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({

  author:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  setincome:{
    type:Number,
    default:""
  },

  setbudget:{
    type:Number,
    default:""
  },
  month: { type: Number }, // Store month as a number (1-12)
  year: { type: Number },  // Store year (e.g., 2024)
  expenses: [
    {
      enteramount:{
        type:Number
      },
    
      reason:{
        type:String
      },
    
      paid:{
        type:String
      },
    
      category:{
        type:String
      },
      user:{ type: mongoose.Schema.Types.ObjectId, ref: "User" },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
},{timestamps: true}
);

export const Budget = mongoose.model("Budget", budgetSchema);
