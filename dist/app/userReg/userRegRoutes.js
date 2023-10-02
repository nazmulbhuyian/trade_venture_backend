"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
// import {postRegUser, updateUserInfo, postRegUserAccountVerify, postRegUserResendCode} from "./userRegControllers";
const userRegControllers_1 = require("./userRegControllers");
// router.route('/').post(postRegUser).patch(updateUserInfo)
router.route('/').post(userRegControllers_1.postRegUser).get(userRegControllers_1.getRegUser);
router.route('/:email').get(userRegControllers_1.getOneRegUser);
// router.route('/verifyOTP').post(postRegUserAccountVerify)
// router.route('/resendOTP').post(postRegUserResendCode)
exports.default = router;
