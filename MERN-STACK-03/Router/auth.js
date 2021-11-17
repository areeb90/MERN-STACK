const express = require('express')
const User = require('../models/userSchema')
const router = express.Router()

router.get('/', (req, res)=>{
    res.send("THIS IS A HOME PAGE FROM ROUTER ")
})

require("../models/userSchema")

// To get data from Backend to Frontend

// USING PROMISES
router.post('/register', (req, res)=>{

    console.log(req.body)
    // res.json({message: req.body})
    const {name , email, phone, password, cpassword} = req.body
    if (!name || !email || !phone || !password || !cpassword){
        return res.json({error:"failed to signup"})
    }
    
    User.findOne({email:email})
        .then((userExist)=>{
            if (userExist){
                return res.json("User Already exist")
        }

        const user = new User({name , email , phone , password , cpassword})

        user.save().then(()=>{
            return res.status(201).json({message:"user registered sucessfully"})
        }).catch((err) => {return res.status(500).json("User registration failed")})
        }).catch(err =>{console.log(err)})

})



// ASYNC-AWAIT
router.post('/register', async (req, res)=>{

    console.log(req.body)
    // res.json({message: req.body})
    const {name , email, phone, password, cpassword} = req.body
    if (!name || !email || !phone || !password || !cpassword){
        return res.json({error:"failed to signup"})
    }

    try{

        const userExist=await User.findOne({email:email})
        if (userExist){
            return res.json("Email Already exist")
        }

        const user = new User({name , email , phone , password , cpassword})

        const response = await user.save()
        if (response){
            return res.status(201).json({message:"user registered sucessfully"})
        }else{
            return res.status(500).json("User registration failed")
        }

    } catch(err){console.log(err)}


})
     




module.exports = router;
