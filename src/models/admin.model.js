import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },   
    daily_rate:{
        type:Number,
        default:235
    }
},

{timestamps:true}
);

export const Admin = mongoose.model('Admin', adminSchema); 