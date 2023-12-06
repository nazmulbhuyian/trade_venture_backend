import { Schema, model } from "mongoose";
import { IUserRoleAddInterface } from "./addUserRoleTypeInterface";

// User Role Schema
const usersRoleAddSchema = new Schema<IUserRoleAddInterface>({
    user_role_type_name: {
        required: true,
        type: String,
        unique: true
    }
},{
    timestamps: true
})

const UserRoleModel = model<IUserRoleAddInterface>("userroles", usersRoleAddSchema);

export default UserRoleModel;
