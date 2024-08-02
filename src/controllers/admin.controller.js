import  async_handler  from "../utils/asyncHandler.js";
// admin login

const admin_login = async_handler(async (req,res) => {

   const {username,password} = req.body

   console.log(username)
   console.log(password)

await res.json(username)

})

export default {
   admin_login
}