import mongoose, { Model } from "mongoose";

interface Uinterface {
    _id: string,
    fullname: string,
    email: string,
    password: string,
    isVerified: boolean,
    lastLogin: Date,
    verificationToken: string,
    verificationTokenExpiresAt: Date,
    forgotPasswordToken: string,
    forgotPasswordTokenExpiresAt: Date,
    createdAt: Date,
    updatedAt: Date
}

const UserSchema = new mongoose.Schema<Uinterface>({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    lastLogin: {
        type: Date,
        default: Date.now()
    },
    verificationToken: String,
    verificationTokenExpiresAt: Date,
    forgotPasswordToken: String,
    forgotPasswordTokenExpiresAt: Date
}, { timestamps: true })

const User: Model<Uinterface> = mongoose.models.User || mongoose.model<Uinterface>("User", UserSchema)

export default User;