const mongoose=require("mongoose")
const ChatSchema = new mongoose.Schema({
    messages:{
        type:Array
    },
    room:{
        type:String
    }
})

module.exports = mongoose.model("Chat",ChatSchema)