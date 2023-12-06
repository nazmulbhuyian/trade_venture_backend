import UserModel from "../userReg/UserModel";
import { IUserRegInterface } from "../userReg/userRegInterface";



export const getLogUsersService = async (email: string): Promise<IUserRegInterface | null> => {
    const user = await UserModel.findOne({ email: email });
    return user;
}

// exports.updateLogUsersNewPasswordService = async (email, password) => {
//     const findUser = await Users.findOneAndUpdate({email:email}, {password: password}, {
//         runValidators: true
//     });
//     return findUser;
//     // const findUser = await Users.findOne({email:email})
//     // if(findUser){
//     //     const users = await Users.updateOne(findUser, {password: password}, {
//     //         runValidators: true
//     //     });
//     //     return users;
//     // }
// }