import asyncHandler from "../utils/asyncHandler.js";
import {User} from '../models/user.model.js';
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {uploadOnCloudinary} from "../utils/Cloudinary.js";
import jwt from "jsonwebtoken";

// const checkValidation = (fields)=>{
//     emptyField =  fields.find((field)=> field?.trim()==="")
//     if(emptyField){
//         return new ApiError(400, "All fields are required")
//     }
// }
// Register USer Todos
// Data Recive from User  -----ok
    // Check Empty Data and Response with Error.Validation ---ok 
    // Check User Already Exists.if  yes then response with Error.Validation ----ok
    // save Password in Hash formate and save user data in database ---ok
    // check avatar url required ---ok
    // check avatar url ---ok
    // create user object and save ---ok
    // validate data for responce exit password and refresh token from data 
    // then send response with success and user data
const registerUser = asyncHandler(
    
    async(req,res)=>{

        const {username,fullname,email,password} = req.body

        if ([username,fullname,email,password].some((field)=> field?.trim()==="")) {
            throw new ApiError(400, "All fields are required")
            
        }

        const existedUser = await User.findOne({
            $or:[
                {username},{email}
            ]
        })

        if(existedUser){
            throw new ApiError(400,"user already exists")
        }


        const avatarLocalPath = req.files?.avatar[0]?.path

        if (!avatarLocalPath) {
            throw new ApiError(400,"Avatar image is required")
        }

        const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

        const avatar = await uploadOnCloudinary(avatarLocalPath)
       const  coverImage = await uploadOnCloudinary(coverImageLocalPath)

        if (!avatar) {
            throw new ApiError(400,"Avatar image is required on cloudinary")
        }

        const user =  await User.create({
            fullname,
            avatar: avatar.url,
            coverImage:coverImage?.url || "",
            email,
            password,
            username:username.toLowerCase(),
        })

        const createdUser = await User.findById(user._id).select("-password -refreshToken")

        if (!createdUser) {
            throw new ApiError(500,"some thing were wrong while saving the user")
        }

        return res.status(200).json(
            new ApiResponse(200,createdUser,"User created successfully")
        )

    }
)



export{registerUser}