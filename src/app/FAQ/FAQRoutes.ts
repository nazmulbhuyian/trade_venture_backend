import express from "express";
import { deleteFAQ, findAllFAQ, postFAQ } from "./FAQControllers";
const router = express.Router();

// Add A FAQ and get FAQ
router.route('/').post(postFAQ).get(findAllFAQ);
// delete a faq
router.route('/:id').delete(deleteFAQ);

export const FAQRoutes = router;