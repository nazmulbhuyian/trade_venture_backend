import { Schema, model } from "mongoose";
import { UserRegInterface } from "./userRegInterface";

const usersRegSchema = new Schema<UserRegInterface>({
    email: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    role: {
        type: String,
        default: "user",
    },
    otp: {
        type: String
    },
    name: {
        type: String,
        minLength: [2, "At least 2 caracted must be provide"],
        maxLength: [30, "Name is to large"],
    },
},{
    timestamps: true
})

const UserModel = model<UserRegInterface>("users", usersRegSchema);

export default UserModel