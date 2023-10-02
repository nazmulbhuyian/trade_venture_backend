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
exports.getOneRegUser = exports.getRegUser = exports.postRegUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// import { getRegUserServices, postRegUserServices, updateRegUserOTPServices, updateUserInfoService } from "./userRegServices";
const userRegServices_1 = require("./userRegServices");
const saltRounds = 10;
// const { SendMail } = require("../midleware/authenticationEmail/maiGunSendOTP");
const postRegUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        if (!(data === null || data === void 0 ? void 0 : data.email)) {
            return res.send({ message: 'Please Provide A Email' });
        }
        const inserted = yield (0, userRegServices_1.getRegUserServices)(data === null || data === void 0 ? void 0 : data.email);
        if (inserted) {
            return res.send({ message: 'Previously Added' });
        }
        const otp = Math.floor(1000 + Math.random() * 9000);
        bcryptjs_1.default.hash(data === null || data === void 0 ? void 0 : data.password, saltRounds, function (err, hash) {
            return __awaiter(this, void 0, void 0, function* () {
                const newUser = {
                    email: data.email,
                    password: hash,
                    name: data.name,
                    otp: otp
                };
                const result = yield (0, userRegServices_1.postRegUserServices)(newUser);
                if (!result) {
                    return res.send('User Not Added. Something Wrong');
                }
                else {
                    // await SendMail(result?.otp, result?.email)
                    res.status(200).json({
                        status: 'Successfully',
                        data: result
                    });
                }
            });
        });
    }
    catch (error) {
        res.status(400).json({
            status: 'Failled',
            message: "User Registration Failed"
        });
    }
});
exports.postRegUser = postRegUser;
const getRegUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, userRegServices_1.getAllRegUserServices)();
        if (!result) {
            return res.send('User Not Added. Something Wrong');
        }
        else {
            // await SendMail(result?.otp, result?.email)
            res.status(200).json({
                status: 'Successfully',
                data: result
            });
        }
    }
    catch (error) {
        res.status(400).json({
            status: 'Failled',
            message: "User Registration Failed"
        });
    }
});
exports.getRegUser = getRegUser;
const getOneRegUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.params.email;
        const result = yield (0, userRegServices_1.getRegUserServices)(email);
        if (!result) {
            return res.send('User Not Added. Something Wrong');
        }
        else {
            // await SendMail(result?.otp, result?.email)
            res.status(200).json({
                status: 'Successfully',
                data: result
            });
        }
    }
    catch (error) {
        res.status(400).json({
            status: 'Failled',
            message: "User Registration Failed"
        });
    }
});
exports.getOneRegUser = getOneRegUser;
// export const postRegUserAccountVerify = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const data = req.body;
//         const user = await getRegUserServices(data?.email);
//         if (!user) {
//             return res.send({ message: 'Something Wrong' });
//         }
//         const otp = user?.otp;
//         if (data?.otp == otp) {
//             res.status(200).json({
//                 status: 'Successfully'
//             })
//         } else {
//             res.status(400).json({
//                 status: 'Failled',
//                 message: "OTP not match"
//             })
//         }
//     } catch (error) {
//         res.status(400).json({
//             status: 'Failled',
//             message: "OTP not match",
//             error: error.message
//         })
//     }
// }
// export const postRegUserResendCode = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { email } = req.body;
//         const user = await getRegUserServices(email);
//         if (!user) {
//             return res.send({ message: 'Something Wrong' });
//         }
//         const otp = Math.floor(1000 + Math.random() * 9000);
//         const updateOTP = await updateRegUserOTPServices(otp, user?._id);
//         if (updateOTP?.modifiedCount > 0) {
//             const newOtp = await getRegUserServices(email);
//             await SendMail(newOtp?.otp, email);
//             res.send({
//                 message: "New OTP Send",
//                 otp: newOtp?.otp,
//                 data: updateOTP
//             })
//         } else {
//             res.status(400).json({
//                 status: 'Failled',
//                 message: "Something Wrong"
//             })
//         }
//     } catch (error) {
//         res.status(400).json({
//             status: 'Failled',
//             message: "Something Wrong",
//             error: error.message
//         })
//     }
// }
// export const updateUserInfo = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const data = req.body;
//         const result = await updateUserInfoService(data);
//         if (!result) {
//             return res.send('Nothing Update');
//         }
//         if (result?.modifiedCount > 0) {
//             res.status(200).json({
//                 status: 'Successfully Updated',
//                 data: result
//             })
//         } else {
//             res.status(400).json({
//                 status: 'Failled',
//                 message: "Something Wrong"
//             })
//         }
//     } catch (error) {
//         res.status(400).json({
//             status: 'Failled',
//             message: "Nothing Update",
//             error: error.message
//         })
//     }
// }
