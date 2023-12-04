import { Schema, model } from "mongoose";
import { UserRegInterface } from "./userRegInterface";

// User Schema
const usersRegSchema = new Schema<UserRegInterface>({
    email: {
        required: true,
        type: String,
        unique: true,
        validate: {
            validator: (value: string) => {
                const emailRegex = /^[^\s@]+@gmail\.com$/
                return emailRegex.test(value);
            },
            message: (props: any) => `${props.value} is not a valid email address!`,
        },
    },
    password: {
        type: String
    },
    role: {
        type: String,
        default: "Startup",
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

export default UserModel;
