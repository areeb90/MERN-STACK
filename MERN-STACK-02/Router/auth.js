const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>{
    res.send("THIS IS A HOME PAGE FROM ROUTER ")
})

// To get data from Backend to Frontend
router.post('/register', (req, res)=>{
    console.log(req.body)
    res.json({message: req.body})
})




module.exports = router;