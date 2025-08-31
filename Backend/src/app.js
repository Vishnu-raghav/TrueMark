import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

app.use(express.json({limit : "16Kb"}))
app.use(express.urlencoded({extended : true , limit : "16Kb"}))
app.use(express.static("public"))

app.use(cookieParser())

// import routes

import userRouter from "./routes/user.routes.js"
import certificateRouter from "./routes/certificates.routes.js"



app.use("/api/v1/users",userRouter)
app.use("/api/v1/uploadCertificate",certificateRouter)
app.use("/api/v1/verifyCertificate",certificateRouter)
// app.use("/api/v1/uploadCertificate",express.static("certificates"))

// https://localhost:8000/users/login







export {app}



