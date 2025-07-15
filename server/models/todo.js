import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
});

export const Todo = mongoose.model("Todo",userSchema);