import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String, 
        required: true,
        minLength: 6
    },
    gender:{
        type: String,
        required: true,
        enum: ["male", "female"]
    },
    profilePic:{
        type: String,
        default: ""
    },
    email:{
        type: String,
        sparse: true  // Allow null but enforce uniqueness if present
    },
    resetToken:{
        type: String,
        sparse: true
    },
    resetTokenExpiry:{
        type: Date,
        sparse: true
    } // createdAt and updatedAt fields => Member since = User.createdAt;
}, {timestamps: true})

const User = mongoose.model("User", userSchema);

export default User;