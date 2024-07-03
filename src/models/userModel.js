import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "please enter username"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "please enter email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "please enter password"],
        unique: true
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotpasswordToken: String,
    forgotpasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
