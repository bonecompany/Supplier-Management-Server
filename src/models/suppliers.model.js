import mongoose, { Schema } from "mongoose";

const supplier_schema = new Schema(
    {
        name: { type: String, required: true, index: true },

        phone: { type: Number, require: [true, "enter mobile number"] },

        Bone_id: { type: Number, require: true, unique: true },

        GST: { type: String },

        state: { type: String, require: true },

        code: { type: Number, require: true },

        address: { type: String, require: true },

        account_no: { type: String },

        RDB: { type: String },

        remarks: { type: String, require: true },

        password: { type: String, required: true },

        refresh_token: { type: String },

        avatar: { type: String },

        tappers: [
            {
                type: Schema.Types.ObjectId,
                ref: "Tappers"
            }
        ],

        drivers : [
            {
                type: Schema.Types.ObjectId,
                ref:"Drivers"
            }
        ]

    },
    { timestamps: true }

)

export const supplier = mongoose.model("Suppliers", supplier_schema)