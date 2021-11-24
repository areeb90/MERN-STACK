const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})

// hashing the password and cpassword 
userSchema.pre("save", async function (next) {
    console.log('Hashing func call hogyaa Areeb bhai')
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12)
        this.cpassword = await bcrypt.hash(this.cpassword, 12)
    };
    next();
})


// generating the token and also attach it to the document
userSchema.methods.generateAuthToken = async function () {
    try {
        // jwt.sign ka 1st arg hamesha unique value/Payload hogi.. 2nd kui bhi secret key
        let tokenAssign = jwt.sign({ _id: this._id }, process.env.SECRET_KEY)

        // jab bhi ((((this.))))) krke kisi ko mention kreinge tu wo hamara document hoga jo database se aarha hoga
        this.tokens = this.tokens.concat({token: tokenAssign})

        // saving the document 
        this.save()
        // this is now being used by ((((generateAuthToken)))) in auth.js file, or retrieve this token where this function called
        return token

    } catch (err) {
        console.log(err)
    }
}


const User = mongoose.model("USER", userSchema)

module.exports = User;