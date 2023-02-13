const UserSchema=require("../models/user")
const ChatSchema=require("../models/chats")
const MsgSchema=require("../models/message")
require("dotenv").config()
const bcrypt = require("bcrypt")
const jwt=require("jsonwebtoken")

//user functions 

exports.AddUser = async (req,res)=>{
    const {email,password,firstName,lastName} = req.body
    const hash = await bcrypt.hash(password,10)
    const newUser = new UserSchema({email,password:hash,firstName,lastName})
    newUser.save((error,userSchema)=>{
        if(error){
            res.status(500).send("failed" + error)
        }
        else{
            res.status(200).json({userSchema})
        }
    })
}

exports.GetName = (req,res)=>{
    UserSchema.findOne({email:req.body.email},(error,userSchema)=>{
        if(error){
            res.status(500).send(error)
        }
        else{
            res.status(200).send(userSchema.firstName)
        }
    })
}

exports.Login = (req,res)=>{
    UserSchema.findOne({email:req.body.email},(error,userSchema)=>{
        if(error){
            res.status(500).send(error)
        }
        else if(!userSchema){
            res.status(403).json(error)
        }
        else{
            bcrypt.compare(req.body.password,userSchema.password,(error,Ismatch)=>{
                if(error || !Ismatch){
                    res.status(402).json({message:"error"+error})
                }
                // else if(!Ismatch){
                //     res.status(401).json({message:"not match"})
                // }
                else{
                    const token=jwt.sign({id:userSchema._id},process.env.JWT_SECRET)
                    res.status(200).send(token)
                }
            })  
        }
    }
    )
}

exports.GetId = (req,res)=>{
    UserSchema.findOne({email:req.body.email},(error,userSchema)=>{
        if(error){
            res.status(500).send(error)
        }
        else if(!userSchema){
            res.status(403).json({userSchema})
        }
        else{
           res.status(200).send(userSchema._id)
        }
    }
    )
}

//chats function
exports.CreateNewChat = (req,res)=>{
    ChatSchema.findOne({room:req.body.room},(error,chat)=>{
        if(error){
            res.status(500).send("failed" + error)
        }
        else if(chat){
            res.status(200).json(chat)
        }
        else{
            const newChat = new ChatSchema(req.body)
            newChat.save((error,newchat)=>{
                if(error){
                    res.status(500).send("failed" + error)
                }
                else{
                    res.status(200).json(newchat)
                }
            })
        }
    })
}

exports.AddToChat = (req,res)=>{
   ChatSchema.findOne({room:req.body.room},(error,chat)=>{
    if(error){
        res.status(500).send("failed" + error)
    }
    else{
        res.status(200).json(chat)
    }
   })
}

exports.UpdateChat = (req,res)=>{
    ChatSchema.findOneAndUpdate({room:req.body.room},{messages:req.body.messages},(error,chat)=>{
        if(error){
            res.status(500).send("failed" + error)
        }
        else{
            res.status(200).send(chat)
        }
    })
}

exports.getAllRooms = (req,res)=>{
    ChatSchema.find((error,chat)=>{
        if(error){
            res.status(500).send(error)
        }
        else{
            res.status(200).json(chat)
        }
    })
}


//msg sender functions

exports.UpdateSenderId = (req,res)=>{
    MsgSchema.findOne({from:req.body.from},(error,msgSchema)=>{
        if(msgSchema){
            res.status(200).json(msgSchema)
        }
        else if(error){
            res.status(500).send(error)
       }
        else{
            const newMsg = new MsgSchema({from:req.body.from})
            newMsg.save((error,newmsg)=>{
                if(error){
                    res.status(500).send(error)
                }
                else{
                    res.status(200).json(newmsg)
                }
            })
        }
    })
}

exports.UpdateSenderMsg = (req,res)=>{
    MsgSchema.findOneAndUpdate({from:req.body.from},{message:req.body.message},(error,msgSchema)=>{
        if(error){
            res.status(500).send(error)
        }
        else{
            res.status(200).json(msgSchema)
        }
    })
}

