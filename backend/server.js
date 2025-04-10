//imports
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

//route imports
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import budgetRoutes from "./routes/budget.route.js";


//database import
import { connectDB } from "./lib/db.js";
dotenv.config();

//app & Port
const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

if(process.env.NODE_ENV !== "production"){
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))
}

app.use(express.json({ limit:"5mb" }));
app.use(cookieParser());

//app routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/budgets", budgetRoutes);


if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "/frontend/dist")))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend" , "dist", "index.html"))
  })
}


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
})