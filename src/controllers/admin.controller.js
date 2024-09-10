import { Admin } from "../models/admin.model.js";
import async_handler from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt";
import ApiError from "../utils/ApiError.js";
import { supplierModel } from "../models/suppliers.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import { latexModel } from "../models/latex.model.js";


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

// suppliers listing----------------------------------------
const supplier_listing = async_handler(async (req, res) => {
   try {
      const data = await supplierModel.find().select('id Bone_id name location category phone createdAt isActive');
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


// get specific supplier---------------------------------
const supplier_find = async_handler(async (req, res) => {
   const id = req.params.id
   const supplierProfile = await supplierModel.findOne({ Bone_id: id }).populate("tappers")
   return res.json(new ApiResponse(supplierProfile, 200, "Suppliers retrieved successfully"));
})


// Add latex

const daily_latex_parchase = async_handler(async (req, res) => {
   try {

      const data = req.body
      const owner = data.id
      const total_weight = data.totalWeight
      const jars = data.jars
      const jars_weight = data.jarsWeight

      const sendData = {
         owner,
         total_weight,
         jars,
         jars_weight: jars * jars_weight,
         latex_weight: total_weight - jars * jars_weight
      }
      await latex.create(
         sendData
      )
      console.log(sendData)
      return res.json(new ApiResponse(sendData, 200, "Suppliers retrieved successfully"));

   } catch (error) {
      res.send(error)
   }
})

const latexParchase = async_handler(async (req, res) => {
   console.log(req.body);

   const latexData = new latexModel(req.body);
   await latexData.save();
   res.json({ message: "Latex data saved successfully" });
})

// update supplier profile-------------------------------------
const upadteSupplierProfile = async_handler(async (req, res) => {

   const { id } = req.params

   const updatedSupplier = await supplierModel
      .findByIdAndUpdate({ _id: id }, req.body, { new: true })
      .populate("tappers");
   // .populate("drivers")
   if (!updatedSupplier) {
      return res.status(404).json({ message: 'Supplier not found' });
   }

   return res.json(new ApiResponse(updatedSupplier, 200, "Profile updated successfully"))
})

// Delete Supplier----------------------------------------
const deleteSupplier = async_handler(async (req, res) => {
   const { id } = req.params
   const deletedSupplier = await supplierModel.findByIdAndDelete({ _id: id })
   return res.json(new ApiResponse(deletedSupplier, 200, "Supplier deleted successfully"))
})

//Get Tapper

const tapperFind = async_handler(async (req, res) => {

   try {
      const data = await tappers.find().select('id name phone supplier  createdAt place');
      if (!data || data.length === 0) {
         const apiError = new ApiError(404, "No suppliers found");
         return res.status(apiError.statusCode).json(apiError);
      }


      // const aggregateData = await tappers.aggregate([
      //    {
      //       $lookup: {
      //          from: 'supplierModel',
      //          localField: '_id',
      //          foreignField: 'tapper',
      //          as: 'supplierDetails'
      //       }
      //    }
      // ])
      const aggregateData = await tappers.find()
         .populate('supplier')

      console.log(aggregateData)

      return res.json(new ApiResponse(aggregateData, 200, "Suppliers retrieved successfully"));
   } catch (error) {
      const apiError = new ApiError(500, "An error occurred while retrieving suppliers");
      return res.status(apiError.statusCode).json(apiError);
   }
})


export default {
   admin_login,
   supplier_listing,
   supplier_find,
   daily_latex_parchase,
   upadteSupplierProfile,
   deleteSupplier,
   latexParchase,
   tapperFind
}
