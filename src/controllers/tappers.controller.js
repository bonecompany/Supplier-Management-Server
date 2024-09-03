import async_handler from "../utils/asyncHandler.js"
import ApiResponse from "../utils/ApiResponse.js"
import ApiError from "../utils/ApiError.js"
import { tapperJoi } from "../validation/tapper.joi.js"
import { tappers } from "../models/tappers.model.js"
import { supplierModel } from "../models/suppliers.model.js"
import bcrypt from "bcrypt"


// tapper Registration

const register = async_handler(async (req, res) => {

  console.log(req.body)
  const exisitingSupplier = await supplierModel.findOne({ Bone_id: req.body.supplier })

  if (!exisitingSupplier) {
    const apiError = new ApiError(400, "Supplier not exists");
    return res.status(apiError.statusCode).json(apiError);
  }

  const { error, value } = tapperJoi.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.map(detail => detail.message);
    const apiError = new ApiError(400, errors);
    return res.status(apiError.statusCode).json(apiError);
  }
  const generatePassword = Math.floor(1000 + Math.random() * 9000)

  const hashPassword = await bcrypt.hash(generatePassword.toString(), 10)
  console.log(hashPassword, "hash");

  const data = {
    ...value,
    username: value.phone,
    supplier: exisitingSupplier?._id,
    password: hashPassword
  }

  await tappers.create(data)

  return res.json(new ApiResponse(data, 201, "tapper registered successfully"))
})


export default {
  register
}