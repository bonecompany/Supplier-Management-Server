import async_handler from "../utils/asyncHandler.js";
import { supplierModel } from "../models/suppliers.model.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// admin login

const admin_login = async_handler(async (req, res) => {

   const { username, password } = req.body

   console.log(username)
   console.log(password)

   await res.json(username)

})

// suppliers listing

const supplier_listing = async_handler(async (req, res) => {
   try {
      const data = await supplierModel.find();

      if (!data || data.length === 0) {
         const apiError = new ApiError(404, "No suppliers found");
         return res.status(apiError.statusCode).json(apiError);
      }

      return res.json(new ApiResponse(200, data, "Suppliers retrieved successfully"));

   } catch (error) {

      const apiError = new ApiError(500, "An error occurred while retrieving suppliers");
      return res.status(apiError.statusCode).json(apiError);
   }
});

export default {
   admin_login,
   supplier_listing
}