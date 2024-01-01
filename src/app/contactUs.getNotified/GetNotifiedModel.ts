import { Schema, model } from "mongoose";
import { IGetNotifiedInterface } from "./contactUsInterface";

// Get notifiedSchema
const getNotifiedSchema = new Schema<IGetNotifiedInterface>({
    notified_email: {
        required: true,
        type: String,
    }
},{
    timestamps: true
})

const GetNotifiedModel = model<IGetNotifiedInterface>("getnotifieds", getNotifiedSchema);

export default GetNotifiedModel;
