import UserRoleModel from "./addUserRoleModel";
import { IUserRoleAddInterface } from "./addUserRoleTypeInterface";

// Find A Role
export const findUserRoleExistServices = async (user_role_type_name: String): Promise<IUserRoleAddInterface | null> => {
    const createUserRole = await UserRoleModel.findOne({ user_role_type_name: user_role_type_name });
    return createUserRole;
}

// Create A User Role
export const postUserRoleServices = async (data: IUserRoleAddInterface): Promise<IUserRoleAddInterface | {}> => {
    const createUserRole = await UserRoleModel.create(data);
    return createUserRole;
}

// Find Roles
export const findUserAllRoleServices = async (): Promise<IUserRoleAddInterface[]> => {
    const findUserRole = await UserRoleModel.find({}).sort({ "_id": -1 }).select("-__v -createdAt -updatedAt");
    return findUserRole;
}

// Delete A Roles
export const deleteUserRoleServices = async (id: String): Promise<IUserRoleAddInterface | any> => {
    const findUserRole: IUserRoleAddInterface | any = await UserRoleModel.findOne({_id: id});
    const deleteUserRole = await UserRoleModel.deleteOne(findUserRole, { runValidators: true } );
    return deleteUserRole;
}

