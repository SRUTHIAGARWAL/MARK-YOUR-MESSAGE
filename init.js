const mongoose=require("mongoose");
const Chat=require("./models/chats.js");

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/telegram');
}
main().then(() => console.log("connection is succesfull")).catch(err => console.log(err));

let allChats=[
    {
        from:"Shruthi",
    to:"Bhoomi",
    msg:"I am at your support",
    created_at: new Date()
    },
    {
        from:"bhoomi",
    to:"shruthi",
    msg:"thank u di",
    created_at: new Date()
    },
    {
        from:"Shruthi",
    to:"Tarun",
    msg:"I am there for you",
    created_at: new Date()
    },
    {
        from:"Tarun",
    to:"Shruthi",
    msg:"I am at your support too",
    created_at: new Date()
    }   
]
Chat.insertMany(allChats).then((res)=>{console.log(res);}).catch((err)=>{console.log(err);});
