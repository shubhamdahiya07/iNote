const express = require('express');
const User = require('../models/Users');  
const router = express.Router();
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const JWT_SECRET="ManhaDoesn'tWorkButSleeps";
const fetchuser=require('../middleware/fetchuser');

let success = false;

//Route 1:create a user using:POST "/api/auth/createuser" :doesn't require login
router.post('/createuser',

//validates input items
[
body('name',"minimum length should be of 3 chars").isLength({min:3}),
body('email',"not a valid email").isEmail(),
body('password',"minimum length should be of 5 chars").isLength({min:5})
],

async(req,res)=>{
    //if there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try{
    //checks whether the user with this email already exists
    let user = await User.findOne({email:req.body.email});
    //if already present
    if(user)
    {
        return res.status(400).json({error:"Sorry a user with this email already exists"})
    }
    user = await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      })
      const data = {
      user:{
        id:user.id
      }
    }
    let authToken=jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({success,authToken});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("internal server error occured");
    }
})

//Route 2:Authenticate a user using:POST "/api/auth/login" :doesn't require login
router.post('/login',

//validates input items
[
body('email',"not a valid email").isEmail(),
body('password',"minimum length should be of 5 chars").isLength({min:5})
],

async(req,res)=>{
    //if there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email,password}=req.body;
    try{
    //checks whether the user with this email already exists
    let user = await User.findOne({email});
    //if not present
    if(!user)
    {
        return res.status(400).json({error:"Try again with correct credentials"})
    }
    //check password
    if(password!==user.password)
    {
      return res.status(400).json({error:"Try again with correct credentials"})
    }
      const data = {
      user:{
        id:user.id
      }
    }
    let authToken=jwt.sign(data, JWT_SECRET);
    success=true;
    res.json({success,authToken});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }
})

//Route 3:fetch a user using:POST "/api/auth/fetch" :require login
router.post('/fetch',fetchuser,
async(req,res)=>{
    try{
      const userId=req.user.id;
      //req.user contains
      //{ id: '63a467ea6123ad6166eab258' }
    const user = await User.findById(userId).select("-password")
    success = true;
    res.send(success,user);
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }
})
module.exports = router