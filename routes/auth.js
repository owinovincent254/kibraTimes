const { check, validationResult } = require("express-validator");
const { model, models } = require("mongoose");
const bycrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const User=require("../models/user")
const router = require("express").Router();
router.post(
  "/signup",
  [
    check("email","Please enter a valid email").isEmail(),
    check("password", "Alphabet must have both letters and numbers").isAlphanumeric(),
    check("password","Password should be more than 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(408).json({ error: errors.array() });
      }
      const user= await User.findOne({email:email})
      if(user){
       return res.status(400).json({
          "error": [
              {
                  "msg": "User Already Exists"
              }
          ]
      })
      }
      const hashedPassword=await bycrypt.hash(password,10)
      // console.log(hashedPassword)
      const newUser=new User({
        name,
        email,
        password:hashedPassword
        
      })
      const savedUser=await newUser.save()
      const token=await jwt.sign(
        {id:savedUser._id,
          email:savedUser.email
        },
        process.env.JWT_SIGN,
        {expiresIn:"3d"}
        
      )
      console.log(token)
      res.status(200).json(savedUser);
    } catch (error) {
      res.status(400).json(error);
    }
  }
);
router.post( "/signin",[check("email","Please enter a valid email").isEmail(),
],  async (req,res)=>{
    try {
  const {email,password}=req.body
const errors=validationResult(req)
if (!errors.isEmpty()) {
  return res.status(408).json({ error: errors.array() });
}
const user= await User.findOne({email})
      if(!user){
       return res.status(400).json({
          "error": [
              {
                  "msg": "Invalid Credentials"
              }
          ]
      })
      }

      const checkPassword=await bycrypt.compare(password,user.password)
      if(!checkPassword){
        return res.status(400).json({
          "error":[
            {
              "msg":"Wrong Credentials"
            }
          ]
        })
      }
     
      
      const token=await jwt.sign(
        {id:user._id,
          email:user.email
        },
        process.env.JWT_SIGN,
        {expiresIn:"3d"}
        
      )
      console.log(token)

      const {password:userPassword, ...others} = user._doc;
      res.status(200).json({...others, token});


    } catch (error) {
      res.status(400).json(error);
    }
  }
)
module.exports = router;
