import express from "express";
const router = express.Router();
import {postRegUser} from "./userRegControllers";

// Registration A User
router.route('/').post(postRegUser);

export const UserRegRoutes = router;