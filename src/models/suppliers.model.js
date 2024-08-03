import { string } from "joi";
import mongoose, { Schema } from "mongoose";

const supplier_schema = new Schema(
    {
        name: { type: String, index: true },

        username: { type: String, unique: true },

        phone: { type: String, require: [true, "enter mobile number"] },

        Bone_id: { type: Number, unique:true },

        GST: { type: String },

        state: { type: String },

        state_code: { type: Number },

        address: { type: String, require: true },

        account_no: { type: String },

        RDB: { type: String },

        remarks: { type: String, require: true },

        password: { type: String, required: true },

        refresh_token: { type: String },

        min_latex: { type: Number },

        tappers: [
            {
                type: Schema.Types.ObjectId,
                ref: "Tappers"
            }
        ],

        drivers: [
            {
                type: Schema.Types.ObjectId,
                ref: "Drivers"
            }
        ]

    },
    { timestamps: true }

)

export const supplier = mongoose.model("Suppliers", supplier_schema)