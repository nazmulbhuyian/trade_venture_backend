import express from 'express'
import { getMeUser, getUserInformation } from './getMeControllers';
const router = express.Router();

// Find A User For FrontEnd Whole Page Excess For Context.
router.route('/').get(getMeUser)
// Get A Single User Information.
router.route('/:email').get(getUserInformation)


export const UserGetMeRoutes = router;