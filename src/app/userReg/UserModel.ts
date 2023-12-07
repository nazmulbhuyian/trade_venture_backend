import { Schema, model } from "mongoose";
import { IUserRegInterface } from "./userRegInterface";

// User Schema
const usersRegSchema = new Schema<IUserRegInterface>({
    email: {
        required: true,
        type: String,
        unique: true,
        validate: {
            validator: (value: string) => {
                const emailRegex = /@/
                return emailRegex.test(value);
            },
            message: (props: any) => `${props.value} is not a valid email address!`,
        },
    },
    password: {
        required: true,
        type: String
    },
    role: {
        required: true,
        type: String,
        default: "Startup",
    },
    otp: {
        required: true,
        type: Number
    },
    status: {
        required: true,
        type: String,
        enum: ['Active', 'In Active'],
        default: "Active",
    },
    name: {
        required: true,
        type: String,
        minLength: [2, "At least 2 caracted must be provide"],
        maxLength: [30, "Name is to large"],
    },
},{
    timestamps: true
})

const UserModel = model<IUserRegInterface>("users", usersRegSchema);

export default UserModel;
