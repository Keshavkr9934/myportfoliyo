const mongoose =require("mongoose");

const contactSchema= mongoose.Schema({
    email:{
        type:String, 
        required:true
    }
    ,
    username:{
        type:String, 
        required:true,
    }
    ,
    textarea:{
        type:String,
        required:true,
    }
});

const cotact=mongoose.model("contact", contactSchema);
module.exports=cotact;