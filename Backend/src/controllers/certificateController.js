import {Certificate} from "../models/certificate.model.js"
import asyncHandler from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import {User} from "../models/user.model.js"


const issueCerificate = asyncHandler(async (req, res) => {
    const {userId} = req.params
    const {rollNo,certificateTitle,issueDate,issuedBy} = req.body

    if([rollNo,certificateTitle,issueDate,issuedBy].some(field => field?.trim() === "")){
        throw new ApiError(400,"All fields are required")
    }
    const user = await User.findById(userId)

    if(!user){
        throw new ApiError(404,"User not found")
    }

    const certificate = await certificate.create({
        rollNo,
        certificateTitle,
        issueDate,
        issuedBy,
        user: userId,
    })


    return res
    .status(201)
    .json(new ApiError(201,"certificate issued successfully",certificate))
})

