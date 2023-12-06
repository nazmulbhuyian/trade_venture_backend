
import UserModel from "./UserModel";
import { IUserRegInterface } from "./userRegInterface";

// Find A User is Exist ?
export const getFindOneRegUserServices = async (email: string): Promise<IUserRegInterface | null> => {
    const FindUser = await UserModel.findOne({ email: email });
    return FindUser;
}

// Registration A User
export const postRegUserServices = async (data: IUserRegInterface): Promise<IUserRegInterface | {}> => {
        const createUser = await UserModel.create(data);
        return createUser;
}
