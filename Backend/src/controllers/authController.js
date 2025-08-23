import asyncHandler from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {User} from "../models/user.model.js"

const generateAccessAndRefreshToken = async (userId) => {

 try {
     const user = await User.findById(userId)
  
     const refreshToken = await generateRefreshToken()
     const accessToken = await generateAccessToken()
  
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
      new ApiResponse(200,createdUser,"User register successfully completed")
   )

})

const loginUser = asyncHandler(async (res,req) => {
  // req.body
  // login access from email and password 
  // find user 
  // check password 
  // generate accesstoken and refresh token
  // send cookies

  const {email,password} = req.body

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

const logoutUser = asyncHandler(async (res,req) => {
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







export {registerUser,loginUser,logoutUser}  