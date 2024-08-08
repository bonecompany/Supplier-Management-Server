
import async_handler from "../utils/asyncHandler.js";
import { supplierJoi } from "../validation/supplier.joi.js";
// import supplierModal from "../models/suppliers.model.js"
//supplier registration

const registration = async_handler(async (req, res) => {
  

    const { error, value } = supplierJoi.validate(req.body);
  console.log(value)

  if(error){await res.json({message:"created successfully"})}


})  

export const supplier = {
    registration
}
