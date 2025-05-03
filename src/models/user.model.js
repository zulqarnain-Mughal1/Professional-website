import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        index:true,
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    avatar: {
        type: String, //from cloudinary
        required: true,
    },
    avatar: {
        type: String, //from cloudinary
    },
    watchHistory: {
        type: Schema.type.objectid,
        ref:"video"
    },
    password: {
        type: String,
        required: [true,"password is required"]
    },
    refreshToken: {
        type: String,
    }},
    {
        timestamps: true,
    }
)

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")){
        return next()
    }
    this.pssword =  await bcrypt.hash(this.password,10)
    next
})

userSchema.methods.isPasswordCorect = async function (password) {
    return await bcrypt.compare(password,this.password)
    
}
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("user",userSchema)