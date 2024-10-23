import mongoose, { Schema } from "mongoose";

const drc_schema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "Suppliers"
    },
    latexId: {
        type: Schema.Types.ObjectId,
        ref: "Latex"
    },
    dryQuantity: Number,
    drcPercentage: Number,
    supplierName: String,
    supplierCode: String,
    filWeight: Number,
    date: Date,

    daily_rate: {
        type: Schema.Types.ObjectId,
        ref: "Admin"
    }
},
    { timestamps: true }
);

export const DrcData = mongoose.model("DrcData", drc_schema);
