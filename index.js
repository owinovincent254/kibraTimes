const express = require("express");
const mongoose = require("mongoose");
const dotenv=require("dotenv")
const app = express();
const PORT = process.env.PORT || 7000;
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

