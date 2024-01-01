import express from "express";
import { FileUploadHelper } from "../../helpers/ImageUpload";
import { deleteAds, findAAds, findAllAds, postAds, updateAds } from "./adsControllers";
const router = express.Router();

// Add A Ads and get Ads update Ads delete Ads
router.route('/').post(FileUploadHelper.ImageUpload.fields([{ name: 'ads_banner', maxCount: 1 }]), postAds).get(findAllAds).patch(FileUploadHelper.ImageUpload.fields([{ name: 'ads_banner', maxCount: 1 }]), updateAds).delete(deleteAds);

// find a Ads
router.route('/:id').get(findAAds);

export const AdsRoutes = router;