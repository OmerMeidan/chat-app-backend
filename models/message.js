const mongoose = require("mongoose")
const MsgSchema = new mongoose.Schema({
    message:{
        //all of the messages that this id sended
        type:Array
    },
    from:{
        //the id of the sender
        type:String
    }
})

module.exports = mongoose.model('Msg',MsgSchema)