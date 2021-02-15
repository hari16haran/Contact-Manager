const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check'); 
const auth = require('../middleware/auth');

const User = require('../models/Users');
const Contact = require('../models/Contacts');



//@route    GET api/contacts
//@desc     get all users in contact
//@access   Private
router.get('/',auth,async (req,res)=>{
    try {
        const contacts = await Contact.find({user: req.user.id}).sort({date : -1});
        res.json(contacts);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error')
    }
});

//@route    POST api/contacts
//@desc     Add new contact
//@access   Private
router.post('/',(req,res)=>{
    res.send('Add new contact');
})

//@route    PUT api/contacts:id
//@desc     Delete contact
//@access   Public
router.put('/:id',(req,res)=>{
    res.send('Update contact');
})


module.exports = router;