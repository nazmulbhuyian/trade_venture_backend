import UserModel from "../userReg/UserModel";
import { IUserRegInterface } from "../userReg/userRegInterface";

// Find A Single User.
export const getMeUsersService = async (email: string): Promise<IUserRegInterface | null> => {
    const users = await UserModel.findOne({email:email})
    return users;
}