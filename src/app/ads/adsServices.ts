import ApiError from "../../errors/ApiError";
import AdsModel from "./AdsModel";
import { IAdsInterface } from "./adsInterface";

// Create A Ads
export const postAdsServices = async (data: IAdsInterface): Promise<IAdsInterface | {}> => {
    const createAdsData = await AdsModel.create(data);
    return createAdsData;
}

// Find Ads
export const findAllAdsServices = async (limit: number, skip: number): Promise<IAdsInterface[]> => {
    const findAdsdata = await AdsModel.find({}).sort({ "_id": -1 }).skip(skip).limit(limit);
    return findAdsdata;
}

// Find a Ads data
export const findAAdsServices = async (id: string): Promise<IAdsInterface | null> => {
    const findAAdsdata = await AdsModel.findOne({ _id: id })
    return findAAdsdata;
}

// Update A Ads
export const updateAdsServices = async (data: any): Promise<IAdsInterface | any> => {
    const findAds: IAdsInterface | any = await AdsModel.findOne({ _id: data._id });
    if(findAds){
        const deleteAds = await AdsModel.updateOne(findAds, data, { runValidators: true });
    return deleteAds;
    }else{
        throw new ApiError(400, 'Ads Update failed !')
    }
}

// Delete A Ads
export const deleteAdsServices = async (data: any): Promise<IAdsInterface | any> => {
    const findAds: IAdsInterface | any = await AdsModel.findOne({ _id: data.id });
    if (findAds) {
        const deleteAds = await AdsModel.deleteOne(findAds, { runValidators: true });
        return deleteAds;
    }else{
        throw new ApiError(400, 'Ads Delete failed !')
    }
}