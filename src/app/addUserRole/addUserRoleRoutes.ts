import express from "express";
import { deleteUserRole, findUserAllRole, postUserRole } from "./addUserRoleControllers";
const router = express.Router();

// Add A User Role
router.route('/').post(postUserRole).get(findUserAllRole);
router.route('/:id').delete(deleteUserRole);

export const UserRoleRoutes = router;