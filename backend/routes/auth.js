const express = require('express');
const User = require('../models/Users');  
const router = express.Router();
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const JWT_SECRET="ManhaDoesn'tWorkButSleeps";


//create a user using:POST "/api/auth/createuser" :doesn't require login
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
    res.json({authToken});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("some error occured");
    }
})

module.exports = router