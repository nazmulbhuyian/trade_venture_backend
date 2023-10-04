import express from 'express'
import { getMeUser, getUserInformation } from './getMeControllers';
const router = express.Router();


router.route('/').get(getMeUser)
router.route('/:email').get(getUserInformation)


export default router;