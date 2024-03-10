const mongoose = require("mongoose");
// const express = require("express");

const userModel = new mongoose.Schema({
    _id: ObjectId,
    image:{
        type:String,
        required:true,
        default:"default.jpg"
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