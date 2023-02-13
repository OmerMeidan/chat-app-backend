const io = require("socket.io")(2000,{
    cors:{
        origin:['http://localhost:3000']
    }
})
const mongoose=require("mongoose")
const express=require("express")
const bodyParser=require("body-parser")
const app=express()
const cors = require("cors")
const authController=require('./controllers/authController')
mongoose.connect("mongodb+srv://omerMeidan:cvProject@cluster0.gxalgb8.mongodb.net/?retryWrites=true&w=majority",{})
    .then(()=>console.log("sucsses"))
    .catch((error)=>{
        console.log("failed to connect")
        console.log(error)
    })
io.on('connection',(socket)=>{
   socket.on("sent-message",(room,msg,name)=>{
    if(room===""){
        socket.broadcast.emit("recived-msg",msg,name)
    }
    else{
        socket.to(room).emit("recived-msg",msg,name)
    }
   })
   socket.on("join-room",(room,callBack)=>{
    socket.join(room)
    callBack(room)
})

})

app.use(cors())
app.use(bodyParser.json())
app.post('/GetMsg',authController.AddToChat)
app.post('/CreateNewChat',authController.CreateNewChat)
app.post('/GetId',authController.GetId)
app.post('/UpdateChat',authController.UpdateChat)
app.post('/Login',authController.Login)
app.post('/SignIn',authController.AddUser)
app.post('/GetName',authController.GetName)
app.post('/UpdateSenderId',authController.UpdateSenderId)
app.post('/UpdateSenderMsg',authController.UpdateSenderMsg)
app.get('/getAllRooms',authController.getAllRooms)
app.listen(2001,()=>console.log("listen to port 2001"))