import { Model } from "mongoose";


export interface UserRegInterface {
    name?: string;
    password?: string;
    email: string;
    role?: "user";
    otp?: number
}

export type UserRegInterfaceMethod = Model<UserRegInterface, object>