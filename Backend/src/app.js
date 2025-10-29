import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// Import routes
import userRouter from "./routes/auth.routes.js"
import certificateRouter from "./routes/certificates.routes.js"
import OrganizationRouter from "./routes/org.routes.js"
// import orgStudentsRoutes from './routes/orgStudents.routes.js';

// ✅ CORRECTED: Use consistent route paths
app.use("/api/v1/auth", userRouter)
app.use("/api/v1/certificates", certificateRouter)
app.use("/api/v1/verify", certificateRouter) // If needed for verification
app.use("/api/v1/organizations", OrganizationRouter)
// app.use("/api/v1/org", orgStudentsRoutes) // ✅ CHANGE: This matches frontend calls

export { app }