import asyncHandler from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {User} from "../models/user.model.js"


const registerUser = asyncHandler(async (req , res) => {
   // get user details from frontend
   // validation - not empty
   // if user already exist
   // create a user object
   // remove password and refresh token field from response
   // check for user creation 
   // return res

   const {name, email, password, rollNo,collegeName,course,branch} = req.body
   console.log("Email :",email , "password :",password , "Name :", name , "rollNo :",rollNo)


   if(
     [name,email,password,rollNo].some((field) => field?.trim() === "")
   ){
     throw new ApiError(400,"All fileds are required")
   }


   const existedUser = User.findOne({
      $or : [{email},{rollNo}] 
   })

   if(existedUser) {
      throw new ApiError(400,"User already exist")
   }

   const user = await User.create({
    name,
    email,
    password,
    rollNo,
    collegeName,
    course,
    branch,
    role: "student"  
   });


   const createdUser = User.findById(user._id).select(
      "-password -refreshToken" 
   )


   if(!createdUser){
      throw new ApiError(500, "Something went wrong while registering the user")
   }

   return res.status(201).json(
      new ApiResponse(200,createdUser,"user  register successfully completed")
   )

})


export {registerUser}  