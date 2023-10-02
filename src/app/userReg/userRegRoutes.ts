const express = require("express");
const router = express.Router();
// import {postRegUser, updateUserInfo, postRegUserAccountVerify, postRegUserResendCode} from "./userRegControllers";
import {postRegUser} from "./userRegControllers";

// router.route('/').post(postRegUser).patch(updateUserInfo)
router.route('/').post(postRegUser)
// router.route('/verifyOTP').post(postRegUserAccountVerify)
// router.route('/resendOTP').post(postRegUserResendCode)

export default router;