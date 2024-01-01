import express from "express";
import { deleteContactUs, findAllContactUs, findAllGetNotified, postContactUs, postGetNotified } from "./contactUsControllers";
const router = express.Router();

// Add A Contact Us and get Contact Us and delete
router.route('/').post(postContactUs).get(findAllContactUs).delete(deleteContactUs);

// Add A get Notify
router.route('/getNotified').post(postGetNotified).get(findAllGetNotified);

export const ContactUsRoutes = router;