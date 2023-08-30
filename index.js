const postRoutes=require("./routes/post")
const authRoutes=require("./routes/auth")
const express = require("express");
const mongoose = require("mongoose");
const dotenv=require("dotenv");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 6002;
app.use(cors())
app.use(express.json())
app.use("/api/posts",postRoutes)
app.use("/api/auth",authRoutes)
app.listen(PORT,()=>{
    
    mongoose
      .connect(
        process.env.MONGO_URI
        
      )
      .then(() => console.log(`Server is running at ${PORT} and DB is connected`))
      .catch((err) => console.log(err));
})
app.get("/",(req,res)=>{
  res.send("Kibra Times API")
})
dotenv.config()

