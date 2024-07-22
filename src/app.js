// app
import express from "express"
import cors from "cors"
import healthcheckRouter from "./routes/healthcheck.routes.js"

const app = express()

// cors
app.use(cors({
    origin: process.env.CORS_ORGIN,
    credentials: true
}))

// common middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// routes
app.use ("/api/v1/healtcheck",healthcheckRouter)


export { app } 