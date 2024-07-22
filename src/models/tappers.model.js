import mongoose, { Schema } from "mongoose";

const tappers_schema = new Schema(
    {
        name: { type: String, required: true, index: true },

        phone: { type: Number, require: [true, "enter mobile number"] },

        address: { type: String, require: true },

        password: { type: String, required: true },

        refresh_token: { type: String },

        // avatar: { type: String },

        suppliers : [
            {
                type: Schema.Types.ObjectId,
                ref: "Suppliers"
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

export const tappers = mongoose.model("Tappers", tappers_schema)