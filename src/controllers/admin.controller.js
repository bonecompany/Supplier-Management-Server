import { Admin } from "../models/admin.model.js";
import async_handler from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt";
import {ApiError} from "../utils/ApiError.js";


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
   if (!admin) 
      // return res.status(400).json({ error: 'Invalid username' });
   return res.json(new ApiError(200, 'Invalid username' ))

   const isMatch = await bcrypt.compare(password, admin.password);
   if (!isMatch) return res.status(400).json({ error: 'Incorrect password' });

   const token = jwt.sign({ id: admin._id, isAdmin: true }, process.env.JWT_SECRET, { expiresIn: '1h' });

   res.json({
      message: "Admin login successfully",
      token
   });
})

export default {
   admin_creating,
   admin_login
}

