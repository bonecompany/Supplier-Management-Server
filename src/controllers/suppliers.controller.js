import bcrypt from "bcrypt"
import async_handler from "../utils/asyncHandler.js";
import { supplierJoi } from "../validation/supplier.joi.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { supplierModel } from "../models/suppliers.model.js";


//supplier registration
const registration = async_handler(async (req, res) => {

  const { error, value } = supplierJoi.validate(req.body, { abortEarly: false });

  console.log(error)

  if (error) {
    const errors = error.details.map(detail => detail.message);
    const apiError = new ApiError(400, { message: "Validation error", errors });
    return res.status(apiError.statusCode).json(apiError);
  }

  // checking existing 

  const exisitingUser = await supplierModel.findOne({ Bone_id: value.Bone_id })

  if (exisitingUser) {
    const apiError = new ApiError(400, "Supplier already exists");
    return res.status(apiError.statusCode).json(apiError);
  }

  //hash password
  const salt = await bcrypt.genSalt(10)
  console.log(salt);

  const hashPassword = await bcrypt.hash(value.password, 10)
  console.log(hashPassword);

  await supplierModel.create({
    ...value,
    password: hashPassword
  });

  //  const compare = await bcrypt.compare(hashPassword,value.password)
  //  console.log(compare)
  return res.json(new ApiResponse(201, "Supplier registered successfully"))


})

export const supplier = {
  registration
}
