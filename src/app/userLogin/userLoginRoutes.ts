import express from "express";
const router = express.Router();
import { postLogUser } from "./userLoginControllers";

router.route('/').post(postLogUser)
// router.route('/forgotPassword').post(usersLogControllers.postForgotPasswordUser)
// router.route('/newPassword').post(usersLogControllers.postNewtPasswordUser)


export default router;