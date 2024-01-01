import { Schema, model } from "mongoose";
import { IFAQInterface } from "./FAQInterface";

// User Role Schema
const usersRoleAddSchema = new Schema<IFAQInterface>({
    faq_question: {
        required: true,
        type: String,
    },
    faq_answer: {
        required: true,
        type: String,
    }
},{
    timestamps: true
})

const FAQModel = model<IFAQInterface>("faq", usersRoleAddSchema);

export default FAQModel;
