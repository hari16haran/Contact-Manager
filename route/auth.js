const express = require('express');
const router = express.Router();

const User = require('../models/Users');
const {check, validationResult} = require('express-validator/check'); 
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');


//@route    GET api/auth
//@desc     get logged in user
//@access   Private

router.get('/',auth,async(req,res)=>{
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error');
    }
});

//@route    POST api/auth
//@desc     Auth and login user
//@access   Public
router.post('/',[
    check('email','Please include a valid email').isEmail(),
    check('password','Password is required').exists()
],async (req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()});
    }

    const {email,password} = req.body;

    try {
        let user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({msg:'Invalid Email'});
        }
    
        let isMatch = await bycrypt.compare(password,user.password);
        if(!isMatch) {
            return res.status(400).json({msg: "Wrong password"});
        }
        const payload = {
            user:{
                id: user.id
            }
        }
        jwt.sign(payload,config.get('jsonsecret'),{
            expiresIn:3600
        },(err,token)=>{
            if(err) throw err;
            res.json({token})
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json('Server Error')        
    }
    


})

//@route    POST api/auth
//@desc     Auth user and get token
//@access   Public
router.post('/',(req,res)=>{
    res.send('Log in user');
})

module.exports = router;