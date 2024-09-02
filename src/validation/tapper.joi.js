import Joi from "joi";

export const tapperJoi = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        "string.base": `name must be a string`,
        "string.empty": "Name is required",
        "string.min": `name must be at least 3 characters long`,
        "string.max": `name must be at most 30 characters long`,
        "any.required": `name is required`
    }),
    password: Joi.string().min(4).messages({
        "string.base": `password must be a string`,
        "string.empty": "Password is required",
        "string.min": `password must be at least 4 characters long`,
    }),
    supplier: Joi.string().required().messages({
        "string.base": `Supplier ID must be a string`,
        "string.empty": "Supplier ID is required",
    }),
    phone: Joi.string().pattern(new RegExp("^((\\+91)|(91))?[6-9]\\d{9}$")).required().messages({
        "string.base": "Phone number should be a type of text",
        "string.empty": "Phone number is required",
        "string.pattern.base": "Enter a valid phone number"
    }),
    place: Joi.string().messages({
        "string.base": `location must be a string`,
        "string.empty": "Location is required",
        "any.required": `location is required`
    }),
    rating:Joi.number().optional()
})