const mongoose=require("mongoose");
const chatSchema= new mongoose.Schema({
    from:{
        type:String,
        required: true
    },
    to:{
        type:String,
        requited: true
    },
    msg:{
        type:String,
        maxlength:50
    },
    created_at:{
        type: Date
    }
});
const Chat=new mongoose.model("Chat",chatSchema);
module.exports=Chat;