import Joi from "joi";

export const supplierJoi = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        "string.base": `name must be a string`,
        "string.empty": "Name is required",
        "string.min": `name must be at least 3 characters long`,
        "string.max": `name must be at most 30 characters long`,
        "any.required": `name is required`
    }),
    password: Joi.string().min(4).max(10).messages({
        "string.base": `password must be a string`,
        "string.empty": "Password is required",
        "string.min": `password must be at least 4 characters long`,
        "string.max": `password must be at most 10 characters long`,
        "any.required": `password is required`
    }),
    phone: Joi.string().pattern(new RegExp("^((\\+91)|(91))?[6-9]\\d{9}$")).required().messages({
        "string.base": "Phone number should be a type of text",
        "string.empty": "Phone number is required",
        "any.required": "Phone number is required",
        "string.pattern.base": "Enter a valid phone number"
    }),
    Bone_id: Joi.string().required().messages({
        "number.base": "Bone id must be a string",
        "any.required": "Bone id is required"
    }),
    address: Joi.string().required().messages({
        "string.base": `address must be a string`,
        "string.empty": "Address is required",
        "any.required": `address is required`
    }),
    GST: Joi.string().optional(),
    state: Joi.string().optional(),
    state_code: Joi.number().optional(),
    account_no: Joi.string().optional(),
    RDB: Joi.string().optional(),
    remarks: Joi.string().optional(),
    refresh_token: Joi.string().optional(),
    min_latex: Joi.number().optional(),
    tappers: Joi.array().items(Joi.string().hex().length(24)).optional().messages({
        "string.base": "Tappers should be an array of valid ObjectId references"
    }),
    drivers: Joi.array().items(Joi.string().hex().length(24)).optional().messages({
        "string.base": "Drivers should be an array of valid ObjectId references"
    })
});
