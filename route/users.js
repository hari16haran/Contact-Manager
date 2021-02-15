const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const {check, validationResult} = require('express-validator/check'); 
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

//@route    POST api/users
//@desc     Register a user
//@access   Public
router.post('/',[
    check('name','Please enter the name').not().isEmpty(),
    check('email','Please enter valid email').isEmail(),
    check('password','Please enter the password with 6 or more character').isLength({
        min: 6
    })
],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()});
    }

    const {name,email,password} = req.body;

    try {
        let user = await User.findOne({email});
        if(user) {
            res.status(400).json({msg: 'User already exists'})
        }

        user = new User({
            name,email,password
        });

        const salt = await bycrypt.genSalt(10);
        user.password = await bycrypt.hash(password, salt);

        await user.save();

        const payload = {
            user : {
                id : user.id
            }
        }
        
        jwt.sign(payload,config.get('jsonsecret'),{
            expiresIn: 36000
        },(err,token)=>{
            if(err) throw err;
            res.json({token})
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
})


module.exports = router;