import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    comment:[{
        type:Schema.Types.ObjectId,
        ref:"comment"
    }]

},

{timestamps:true}
);

export const User = mongoose.model('user', userSchema); 