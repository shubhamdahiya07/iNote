//work of this middleware is to extract id from auth-token

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
        // data contains
        //{ user: { id: '63a467ea6123ad6166eab258' }, iat: 1671739308 }
        req.user=data.user; 
        //passing control to async(req,res) of route 3 of auth.js
        next();
    } catch (error) {
        res.status(401).send({error:"Please authenticate using valid token"});
    }
}

module.exports = fetchuser;