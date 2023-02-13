const { json } = require("express")
const mongoose=require("mongoose")
const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    }
})


module.exports = mongoose.model('User',UserSchema)