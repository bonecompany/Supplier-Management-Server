// app
import express from "express"
import dotenv from "dotenv"
dotenv.config()
import cors from "cors"
import healthcheckRouter from "./routes/healthcheck.routes.js"
import admin from "./routes/admin.routes.js"
import supplier from "./routes/suppliers.routes.js"
const app = express()

// cors
// app.use(cors({
//     origin: process.env.CORS_ORGIN,
//     credentials: true
// }))

app.use(cors())

// common middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// routes
<<<<<<< HEAD
app.use("/api/v1/healtcheck", healthcheckRouter)
app.use("/api/admin", admin)
app.use("/api/supplier", supplier)

=======
app.use ("/api/v1/healtcheck",healthcheckRouter)
app.use ("/api/admin",admin)
>>>>>>> f5c1cdf8aec4f61595595905d8153bc680539c3c

export { app }