import { Schema, model } from "mongoose";
import { IContactUsInterface } from "./contactUsInterface";

// User Role Schema
const contactUsSchema = new Schema<IContactUsInterface>({
    conatctUs_email: {
        required: true,
        type: String,
    },
    conatctUs_name: {
        type: String,
    },
    conatctUs_phone: {
        type: String,
    },
    conatctUs_subject: {
        type: String,
    },
    conatctUs_message: {
        type: String,
    }
},{
    timestamps: true
})

const ContactUsModel = model<IContactUsInterface>("contactus", contactUsSchema);

export default ContactUsModel;
