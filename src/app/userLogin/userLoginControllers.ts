import { RequestHandler } from "express";
import bcrypt from "bcryptjs"
const saltRounds = 10
const dotenv = require("dotenv").config();
import jwt from 'jsonwebtoken'
import { getLogUsersService } from "./userLoginServices";
import { IUserRegInterface } from "../userReg/userRegInterface";

export const postLogUser: RequestHandler = async (req, res, next): Promise<IUserRegInterface | any> => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                status: 'Failled',
                message: "Please Provide Email"
            })
        }

        const user: any = await getLogUsersService(email)
        if (!user) {
            return res.status(400).json({
                status: 'Failled',
                message: "user get Failed"
            })
        }
        const isPasswordValid = await bcrypt.compare(password, user?.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                status: 'Failled',
                message: "Password Not Match"
            })
        }

        const token = jwt.sign({ email }, process.env.ACCESS_TOKEN as string);
        return res.send({ 
            tradeVentureLogInToken: token,
            message: "Successfully Login",
            status: "Successfull"
         })

    } catch (error: Error | any) {
        res.status(400).json({
            status: 'Failled',
            message: "user get Failed",
            error: error.message
        })
    }
}

// exports.postForgotPasswordUser = async (req, res, next) => {
//     try {
//         const { email } = req.body;

//         const user = await getLogUsersService(email)
//         if (!user) {
//             return res.status(400).json({
//                 status: 'Failled',
//                 message: "Wrong Email",
//                 error: error.message
//             })
//         }

//         // await sendForgotPasswordLink(user?.email);
//         await SendMailForgotPassword(user?.email);

//         // const token = jwt.sign({ email }, process.env.ACCESS_TOKEN);
//         // ovigoForgotToken: token,
//         return res.send({
//             message: "Check Your Email",
//             status: "Success",
//             ovigoForgotTokenEmail: user?.email
//         })

//     } catch (error) {
//         res.status(400).json({
//             status: 'Failled',
//             message: "user get Failed",
//             error: error.message
//         })
//     }
// }

// exports.postNewtPasswordUser = async (req, res, next) => {
//     try {
//         const { email, password } = req.body;

//         bcrypt.hash(password, saltRounds, async function (err, hash) {
//             const users = await updateLogUsersNewPasswordService(email, hash);
//             if (users?.modifiedCount > 0) {
//                 return res.send({
//                     message: "Password Change Successfully",
//                     status: "Success"
//                 });
//             } else {
//                 return res.send({
//                     message: "Password Not Change",
//                     status: "Error"
//                 })
//             }
//         });

//     } catch (error) {
//         res.status(400).json({
//             status: 'Failled',
//             message: "user get Failed",
//             error: error.message
//         })
//     }
// }