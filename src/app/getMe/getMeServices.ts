import UserModel from "../userReg/UserModel";
import { UserRegInterface } from "../userReg/userRegInterface";


export const getMeUsersService = async (email: string): Promise<UserRegInterface | null> => {
    const users = await UserModel.findOne({email:email})
    return users;
}