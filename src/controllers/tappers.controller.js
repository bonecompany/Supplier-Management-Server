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

  const { error, value } = tapperJoi.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.map(detail => detail.message);
    const apiError = new ApiError(400, errors);
    return res.status(apiError.statusCode).json(apiError);
  }


  const addSupplier = await supplierModel.findOne({ Bone_id: req.body.supplier })

  const data = {
    ...value,
    username: value.phone,
    supplier: addSupplier?._id,
    password: hashPassword
  }
  

 addSupplier.updateOne({tappers:data._id})

 

  await tappers.create(data)

  return res.json(new ApiResponse(data, 201, "tapper registered successfully"))
})


export default {
  register
}