import UserModel from "./UserModel";
import { UserRegInterface } from "./userRegInterface";


export const getRegUserServices = async (email : string): Promise<UserRegInterface | null> => {
    const user = await UserModel.findOne({ email: email });
    return user;
}

export const postRegUserServices = async (data: UserRegInterface): Promise<UserRegInterface | []> => {
    const user = new UserModel(data);
    const user2 = await user.save();
    return user2;
}

// export const updateRegUserOTPServices = async (otp, id) => {
//     // const findUserAndUpdateOTP = await Users.findOneAndUpdate({_id: id}, {otp: otp}, {
//     //     runValidators: true
//     // });
//     // return findUserAndUpdateOTP;
//     const findUser = await UserModel.findOne({ _id: id })
//     const users = await UserModel.updateOne(findUser, { otp: otp }, {
//         runValidators: true
//     });
//     return users;
// }

// export const updateUserInfoService = async (data) => {
//     try {
//         const updateUserInfo = await UserModel.findOne({email: data?.email})
//         const users = await UserModel.updateOne(updateUserInfo, data, {
//             runValidators: true
//         });
//         return users;
//     } catch (error) {
//         console.log(error);
//     }
//     // try {
//     //     const updateUserInfo = await Users.findOneAndUpdate({email: data?.email}, data, {
//     //         runValidators: true
//     //     }).select('-password -otp -__v');
//     //     return updateUserInfo;
//     // } catch (error) {
//     //     console.log(error);
//     // }
// }