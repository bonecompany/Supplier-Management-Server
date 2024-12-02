import mongoose, { Schema } from "mongoose";


const commentSchema = new mongoose.Schema({
  text:{type:String},
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Suppliers"
},


},

{timestamps:true}
);

export const Comment = mongoose.model('comment', commentSchema); 