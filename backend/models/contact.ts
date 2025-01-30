import mongoose from "mongoose";


const contactSchema = new mongoose.Schema({
    name:{type:String,require:true},
    surname:{type:String,require:true},
    phone:{type:Number,require:true},
    email:{type:String,require:true},
    message:{type:String,require:true},
    ip:String,
    location:String,
    createdAt:{type:Date,default:Date.now}
})


export const Contact = mongoose.model(`contact`,contactSchema)