import mongoose, { Schema } from "mongoose";

const supplier_schema = new Schema(
    {
        name: { type: String, index: true },

        phone: { type: Number, },

        Bone_id: { type: String, unique: true },

        GST: { type: String },

        state: { type: String },

        state_code: { type: Number },

        address: { type: String },

        location: { type: String },

        account_no: { type: String },

        ifsc: { type: String },

        RBD_no: { type: String },

        remarks: { type: String },

        password: { type: String },

        refresh_token: { type: String },

        min_latex: { type: Number },

        category: {
            type: String, enum: ["Daily Collection",
                "Alternative Day Collection",
                "Barrel Collection",
                "Lease Plantation",
                "Slaughter Plantation",]
        },

        isActive: { type: Boolean, default: true },

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

export const supplierModel = mongoose.model("Suppliers", supplier_schema)