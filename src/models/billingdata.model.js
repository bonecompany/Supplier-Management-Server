import mongoose, { Schema } from "mongoose";

const bill_data = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "Suppliers"
    },
    latexId: {
        type: Schema.Types.ObjectId,
        ref: "Latex"
    },
    drcdata:{
        type:Schema.Types.ObjectId,
        ref:"DrcData"
    },
    dryQuantity: Number,
    drcPercentage: Number,
    wetWeight: Number,
    date: Date,
    rate:Number,

},
    { timestamps: true }
);

export const Bill = mongoose.model("Bill", bill_data);
