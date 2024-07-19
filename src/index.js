// index
import {app} from "./app.js"
import dotenv from "dotenv"
import connectDB from "./database/index.js"

dotenv.config({
    path: "./.env"
})

const port = process.env.PORT || 7777

connectDB().then(()=>{
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`)
    })
}).catch((err) => {
    console.log("connection error on index",err);
})