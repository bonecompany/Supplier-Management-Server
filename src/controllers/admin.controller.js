import { Admin } from "../models/admin.model.js";
import async_handler from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt";
import ApiError from "../utils/ApiError.js";
import { supplierModel } from "../models/suppliers.model.js";
import ApiResponse from "../utils/ApiResponse.js";


// create_admin-----------------------------------------
const admin_creating = async_handler(async (req, res) => {
   const { username, password } = req.body;

   const hashedPassword = await bcrypt.hash(password, 10);
   const newAdmin = new Admin({ username, password: hashedPassword });
   await newAdmin.save();
   res.status(201).json({ message: 'Admin registered successfully' });
});

// admin login------------------------------------------
const admin_login = async_handler(async (req, res) => {

   const { username, password } = req.body

   const admin = await Admin.findOne({ username });
   if (!admin) return res.status(400).json({ error: 'Invalid username' });
   // return res.json(new ApiError(200, 'Invalid username' ))

   const isMatch = await bcrypt.compare(password, admin.password);
   if (!isMatch) return res.status(400).json({ error: 'Incorrect password' });

   const adminToken = jwt.sign({ id: admin._id, isAdmin: true }, process.env.JWT_SECRET, { expiresIn: '1h' });

   res.json({
      message: "Admin logined successfully",
      adminToken
   });
})

// suppliers listing

const supplier_listing = async_handler(async (req, res) => {

   try {
      const data = await supplierModel.find();
      if (!data || data.length === 0) {
         const apiError = new ApiError(404, "No suppliers found");
         return res.status(apiError.statusCode).json(apiError);
      }
      return res.json(new ApiResponse(data, 200, "Suppliers retrieved successfully"));

   } catch (error) {
      const apiError = new ApiError(500, "An error occurred while retrieving suppliers");
      return res.status(apiError.statusCode).json(apiError);
   }
});

// get specific supplier

const supplier_find = async_handler(async (req, res) => {
   const id = req.params.id
   const data = await supplierModel.findOne({ Bone_id: id })
   return res.json(new ApiResponse(data, 200, "Suppliers retrieved successfully"));
})


// Add latex

const daily_latex_add = async_handler (async (req,res) => {
try {

   const data = req.body
   const latex_wt = data["latex-wt"]
   const total_wt = data["total-wt"]

   const sendData = latex_wt * total_wt

   console.log(sendData)
 return res.json(new ApiResponse(sendData, 200, "Suppliers retrieved successfully"));
   
} catch (error) {
   res.send(error)
   
}


})


export default {

   admin_login,
   supplier_listing,
   supplier_find,
   daily_latex_add
   
}
