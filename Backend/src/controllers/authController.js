import asyncHandler from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {User} from "../models/user.model.js"
import jwt from "jsonwebtoken"


const generateAccessAndRefreshToken = async (userId) => {

 try {
     const user = await User.findById(userId)
  
     const accessToken = user.generateAccessToken()
     const refreshToken = user.generateRefreshToken()
  
     user.refreshToken = refreshToken
     await user.save({validateBeforeSave : false})
  
     return {refreshToken,accessToken}
 } catch (error) {
   throw new ApiError(500, "something went wrong while generating the access token and refresh token")
 }

}

const registerUser = asyncHandler(async (req , res) => {
   // get user details from frontend
   // validation - not empty
   // if user already exist
   // create a user object
   // remove password and refresh token field from response
   // check for user creation 
   // return res

   const {name, email, password, rollNo,collegeName,course,branch} = req.body

   if(
     [name,email,password,rollNo].some((field) => field?.trim() === "")
   ){
     throw new ApiError(400,"All fileds are required")
   }


   const existedUser = await User.findOne({
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
      new ApiResponse(200,createdUser,"User register successfully completed")
   )

})

const loginUser = asyncHandler(async (req, res) => {
  // req.body
  // login access from email and password 
  // find user 
  // check password 
  // generate accesstoken and refresh token
  // send cookies

  const {email , password} = req.body

  if(!email) {
   throw new ApiError(400,"Email is required")
  }

  const user = await User.findOne({email})

  if(!user){
   throw new ApiError(401,"Enable to find user please signup")
  }

  const userPassword = await user.isPasswordCorrect(password)

  if(!userPassword){
   throw new ApiError(400, "Invalid password")
  }

  const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user._id)

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

  const options = {
   httpOnly : true,
   secure : true,
  }

  return res
  .status(200)
  .cookie("accessToken",accessToken,options)
  .cookie("refreshToken",refreshToken,options)
  .json(
   new ApiResponse(
      200,
      {
         user : loggedInUser,refreshToken,accessToken
      },
      "User logged In successfully"
   )
  )


})

const logoutUser = asyncHandler(async (req,res) => {
  await User.findByIdAndUpdate(
      req.user._id,
      {
         $set : {
            refreshToken : undefined,
         }
      },
      {
         new : true
      }
   )

   const options = {
      httpOnly : true,
      secure : true,
   }

   res.status(200).clearCookie("accessToken",options).clearCookie("refreshToken", options).json(
      new ApiResponse(200,{},"User Logged Out successfully")
   )
})


const refreshAccessToken = asyncHandler(async (req,res) => {
   const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

   if(!incomingRefreshToken){
      throw new ApiError(401,"Unauthorized Request")
   }


   try {
      const decodedToken = jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
   
      const user = await User.findById(decodedToken?._id)
   
      if(!user){
         throw new ApiError(401,"Refresh token")
      }
   
      if(incomingRefreshToken !== user?.refreshToken){
         throw new ApiError(401,"Refresh token is expire or used")
      }
      
      const options = {
         httpOnly : true,
         secure : true
      }
   
       const {newRefreshToken , accessToken} = await generateAccessAndRefreshToken(user._id)
   
       return res
       .status(200)
       .cookie("accessToken",accessToken,options)
       .cookie("refreshToken",newRefreshToken,options)
       .json(
         new ApiResponse(
            200,
            {
              refreshToken : newRefreshToken , accessToken,
            },
            "Access Token is refreshed"
         )
       )
   } catch (error) {
      throw new ApiError(401,error?.message || "Invalid refresh Token")
   }

   
})

const changeCurrentPassword = asyncHandler( async (req,res) => {
    const {oldPassword,newPassword,confirmPassword} = req.body

    const user = await User.findById(req.user?._id)

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if(!isPasswordCorrect){
      throw new ApiError(400, "incorrect password")
    }
    
    if(newPassword !== confirmPassword){
      throw new ApiError(400, "Password do not Match")
    }

    user.password = newPassword
    await user.save({validateBeforeSave : false})


    return res
    .status(200)
    .json(
      new ApiResponse(200, "Password change successfully")
    )

    
})

const getCurrentUser = asyncHandler(async (req,res) => {
   return res
   .status(200)
   .json(
      200,
      req.user,
      "Current User fetch successfully"
   )
})



export {registerUser,loginUser,logoutUser,refreshAccessToken,changeCurrentPassword,getCurrentUser}  