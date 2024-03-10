const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
   
    image:{
        type:String,
        required:true,
        default:'/img/default.png' // Replace this with the actual path to your default image
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model("User", userModel);
