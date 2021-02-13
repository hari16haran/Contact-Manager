const express = require('express');
const router = express.Router();

//@route    GET api/contacts
//@desc     get all users in contact
//@access   Private
router.get('/',(req,res)=>{
    res.send('get contact');
})

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