import bcrypt from "bcrypt"
import async_handler from "../utils/asyncHandler.js";
import { supplierJoi } from "../validation/supplier.joi.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { supplierModel } from "../models/suppliers.model.js";



//supplier registration
const registration = async_handler(async (req, res) => {
  console.log("object");
  console.log(req.body)

  // checking existing 

  const exisitingUser = await supplierModel.findOne({ Bone_id: req.body.Bone_id })

  if (exisitingUser) {
    const apiError = new ApiError(400, "Supplier already exists");
    return res.status(apiError.statusCode).json(apiError);
  }

  const { error, value } = supplierJoi.validate(req.body, { abortEarly: false });
  console.log(value)
  console.log(error)

  if (error) {
    const errors = error.details.map(detail => detail.message);
    const apiError = new ApiError(400, errors);
    return res.status(apiError.statusCode).json(apiError);
  }

  const generatePassword = Math.floor(1000 + Math.random() * 9000)

  const password = value.Bone_id + generatePassword
  console.log(password)

  const hashPassword = await bcrypt.hash(password, 10)
  console.log(hashPassword, "hash");

  await supplierModel.create({
    ...value,
    password: hashPassword
  });

  return res.json(new ApiResponse(value, 201, "Supplier registered successfully", password))
})

//supplier login
const login = async_handler(async (req, res) => {
  const { error } = (req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map(detail => detail.message);
    const apiError = new ApiError(400, { message: "Validation error", errors });
    return res.status(apiError.statusCode).json(apiError);
  }
  const { Bone_id, password } = req.body;
  const user = await supplierModel.findOne({ Bone_id });
  if (!user) {
    const apiError = new ApiError(400, "Invalid Bone_id");
    return res.status(apiError.statusCode).json(apiError);
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    const apiError = new ApiError(400, "Invalid password ");
    return res.status(apiError.statusCode).json(apiError);
  }
  return res.json(new ApiResponse(200, "Success"))

})

export const supplier = {
  registration,
  login
}
