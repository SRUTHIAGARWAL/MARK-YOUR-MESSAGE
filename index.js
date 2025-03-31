const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const Chat=require("./models/chats.js");
const methodOverride = require('method-override'); // Import the module
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method')); // Use methodOverride middleware
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/telegram');
}
main().then(() => console.log("connection is succesfull")).catch(err => console.log(err));
// let chat1=new Chat({
//     from:"Shruthi",
//     to:"Bhoomi",
//     msg:"I love you",
//     created_at: new Date()
// });
// chat1.save().then((res)=>{console.log(res);}).catch((err)=>console.log(err));
//index route
app.get("/chat",async (req,res)=>{
    let chats=await Chat.find({});
    // console.log(chats);
    res.render("index.ejs",{chats});
});
//new post get request
app.get("/chat/new", (req,res)=>
    {
        res.render("new.ejs");
    });
//post request of new created post
app.post("/chat",(req,res)=>
{
    let {from,msg,to}=req.body;
    let newChat=new Chat(
        {
            from:from,
            msg:msg,
            to:to,
            created_at: new Date()
        }
    )
    newChat.save()
    .then((res)=>{console.log("chat saved successfully");})
    .catch((err)=>console.log(err));
    res.redirect("/chat");
});
//edit route
app.get("/chat/:id/edit",async (req,res)=>{
    let {id}=req.params;
    let chat= await Chat.findById(id);
    res.render("edit.ejs",{chat});
});
// edit post route
app.put("/chat/:id",async (req,res)=>{
    let {id}=req.params;
    let {msg: newmsg}=req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id, {msg:newmsg},{runValidator : true , new: true});
    console.log(updatedChat);
    res.redirect("/chat");
});

//delete route
app.delete("/chat/:id/delete", async(req,res)=>{
    let {id}=req.params;
    let chat = await Chat.findByIdAndDelete(id);
    res.redirect("/chat");
});

//root rounte
app.get("/", (req,res)=>{
    res.send("route is working");
});
app.listen(2901, ()=>
{
    console.log("server is listening on port 2901");
});