const express = require('express')
const User = require('../models/userSchema')
const router = express.Router()
const bcryptjs = require('bcryptjs')

router.get('/', (req, res) => {
    res.send("THIS IS A HOME PAGE FROM ROUTER ")
})

require("../models/userSchema")

// To get data from Backend to Frontend

// USING PROMISES
// router.post('/register', (req, res)=>{

//     console.log(req.body)
//     // res.json({message: req.body})
//     const {name , email, phone, password, cpassword} = req.body
//     if (!name || !email || !phone || !password || !cpassword){
//         return res.json({error:"failed to signup"})
//     }

//     User.findOne({email:email})
//         .then((userExist)=>{
//             if (userExist){
//                 return res.json("User Already exist")
//         }

//         const user = new User({name , email , phone , password , cpassword})

//         user.save().then(()=>{
//             return res.status(201).json({message:"user registered sucessfully"})
//         }).catch((err) => {return res.status(500).json("User registration failed")})
//         }).catch(err =>{console.log(err)})

// })



// ASYNC-AWAIT
router.post('/register', async (req, res) => {

    console.log(req.body)
    // res.json({message: req.body})
    const { name, email, phone, password, cpassword } = req.body
    if (!name || !email || !phone || !password || !cpassword) {
        return res.json({ error: "failed to signup" })
    }

    try {

        const userExist = await User.findOne({ email: email })
        if (userExist) {
            return res.json("Email Already exist")
        } else if (password != cpassword) {
            return res.json("Not mathing password and cpassword")
        } else {

            const user = new User({ name, email, phone, password, cpassword })

            // hashing the password through Bcrypt.js... function is at the userSchema.js file

            const response = await user.save()
            if (response) {
                return res.status(201).json({ message: "user registered sucessfully" })
            } else {
                return res.status(500).json("User registration failed")
            }

        }



    } catch (err) { console.log(err) }


})

router.post("/signin", async (req, res) => {
    console.log(req.body)
    // res.json({message: req.body}) 
    const { email, password } = req.body
    try {
        if (!email || !password) {
            res.json({ message: "Invalid credentials" })
        }

        const userr = await User.findOne({ email: email })
        

        // console.log(userr)
        if(userr){
            const isMatched = await bcryptjs.compare(password , userr.password);
            if (!isMatched){
                res.json({ message: "pass not matched" })
            }else{
                res.json({ message: "Pass matched" })
            }
        }else{
            res.status(400).json({ message: "Successsfully Login" })
        }
        

    } catch {
        err => { console.log(err) }
    }

})



module.exports = router;