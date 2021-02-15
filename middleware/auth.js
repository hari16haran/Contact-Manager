const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req,res,next) {
    //Get Token from Header
    const token =  req.header('x-auth-token');

    if(!token) {
        return res.status(401).json({msg:'No Token,auth failed'});
    }
    
    try {
        let decoded = jwt.verify(token,config.get('jsonsecret'));
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json('Token is invalid');       
    }
}