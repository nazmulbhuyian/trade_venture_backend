import { NextFunction } from "express";
import UserModel from "./UserModel";
import { UserRegInterface } from "./userRegInterface";

// Find A User is Exist ?
export const getFindOneRegUserServices = async (email: string): Promise<UserRegInterface | null> => {
    const FindUser = await UserModel.findOne({ email: email });
    return FindUser;
}

// Registration A User
export const postRegUserServices = async (data: UserRegInterface): Promise<UserRegInterface | {}> => {
        const createUser = await UserModel.create(data);
        return createUser;
}
