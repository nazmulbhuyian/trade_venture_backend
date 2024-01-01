import { Schema, model } from "mongoose";
import { IAdsInterface } from "./adsInterface";

// Ads Schema
const adsSchema = new Schema<IAdsInterface>({
    ads_banner: {
        required: true,
        type: String,
    },
    ads_url: {
        required: true,
        type: String,
    },
    ads_description: {
        type: String,
    },
    ads_topBadge: {
        type: String,
    },
    ads_offerPrice: {
        type: Number,
    }
},{
    timestamps: true
})

const AdsModel = model<IAdsInterface>("ads", adsSchema);

export default AdsModel;
