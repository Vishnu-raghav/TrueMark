import { ApiError } from "../utils/ApiError.js"

export const isAdmin = (req,res,next) => {
    if(req.user?.role === "admin"){
        return next()
    } 

    throw new ApiError(403,"Admin access required")
}

export const isStudent = (req,res,next) => {
    if(req.user?.role === "student"){
        return next()
    } 

    throw new ApiError(403,"Student access required")
}