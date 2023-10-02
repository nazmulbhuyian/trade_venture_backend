"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRegUserServices = exports.postRegUserServices = exports.getRegUserServices = void 0;
const UserModel_1 = __importDefault(require("./UserModel"));
const getRegUserServices = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserModel_1.default.findOne({ email: email });
    return user;
});
exports.getRegUserServices = getRegUserServices;
const postRegUserServices = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new UserModel_1.default(data);
    const user2 = yield user.save();
    return user2;
});
exports.postRegUserServices = postRegUserServices;
const getAllRegUserServices = () => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserModel_1.default.find({});
    return user;
});
exports.getAllRegUserServices = getAllRegUserServices;
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
