import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs"
// import { getRegUserServices, postRegUserServices, updateRegUserOTPServices, updateUserInfoService } from "./userRegServices";
import { getRegUserServices, postRegUserServices } from "./userRegServices";
const saltRounds = 10
// const { SendMail } = require("../midleware/authenticationEmail/maiGunSendOTP");

export const postRegUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        if (!data?.email) {
            return res.send({ message: 'Please Provide A Email' })
        }
        const inserted = await getRegUserServices(data?.email);
        if (inserted) {
            return res.send({ message: 'Previously Added' })
        }
        const otp = Math.floor(1000 + Math.random() * 9000);
        bcrypt.hash(data?.password, saltRounds, async function (err: Error | null, hash: string) {
            const newUser = {
                email: data.email,
                password: hash,
                name: data.name,
                otp: otp
            }
            const result = await postRegUserServices(newUser);
            if (!result) {
                return res.send('User Not Added. Something Wrong');
            } else {
                // await SendMail(result?.otp, result?.email)
                res.status(200).json({
                    status: 'Successfully',
                    data: result
                })
            }

        });
    } catch (error) {
        res.status(400).json({
            status: 'Failled',
            message: "User Registration Failed"
        })
    }
}


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

