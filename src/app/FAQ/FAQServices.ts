import { IFAQInterface } from "./FAQInterface";
import FAQModel from "./FAQModel";

// Create A FAQ
export const postFAQServices = async (data: IFAQInterface): Promise<IFAQInterface | {}> => {
    const createFAQ = await FAQModel.create(data);
    return createFAQ;
}

// Find FAQ
export const findAllFAQServices = async (): Promise<IFAQInterface[]> => {
    const findFAQ = await FAQModel.find({}).sort({ "_id": -1 }).select("-__v -createdAt -updatedAt");
    return findFAQ;
}

// Delete A FAQ
export const deleteFAQServices = async (id: String): Promise<IFAQInterface | any> => {
    const findFAQ: IFAQInterface | any = await FAQModel.findOne({_id: id});
    const deleteFAQ = await FAQModel.deleteOne(findFAQ, { runValidators: true } );
    return deleteFAQ;
}

