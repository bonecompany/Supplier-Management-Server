import mongoose, { Schema, Types } from "mongoose";

// const letex_schema = new Schema({

//     supplier: {
//         type: Schema.Types.ObjectId,
//         ref: "Suppliers"

//     },
//     total_weight: Number,
//     jars: Number,
//     jars_weight: Number,
//     latex_weight: Number,
//     film_weight: Number,
//     drc_percentage: Number,
//     drc_quantity: Number,

//     daily_rate: {
//         type: Schema.Types.ObjectId,
//         ref: "Admin"
//     }
// },
//     { timestamps: true }
// )
// export const latex = mongoose.model("Latex", letex_schema)

const latexDataSchema = new Schema({
    date: { type: Date, required: true },
    supplierCode: { type: String, required: true },
    supplierName: String,
    grossWeight: Number,
    bigJarsCount: Number,
    smallJarsCount: Number,
    jarsWeight: Number,
    latexWeight: Number,
},
    { timestamps: true }
);

// Latex Data Model
export const latexModel = mongoose.model("Latex", latexDataSchema);