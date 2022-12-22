var jwt = require('jsonwebtoken');
const JWT_SECRET="ManhaDoesn'tWorkButSleeps";

const fetchuser = (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token)
    {
        res.status(401).send({error:"Please authenticate using valid token"});
    }
    try {
        //getting id
        const data = jwt.verify(token,JWT_SECRET);
        req.user=data.user; 
        //passing control to async(req,res) of route3 of auth.js
        next();
    } catch (error) {
        res.status(401).send({error:"Please authenticate using valid token"});
    }
}

module.exports = fetchuser;