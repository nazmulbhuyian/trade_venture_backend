import ContactUsModel from "./ContactUsModel";
import GetNotifiedModel from "./GetNotifiedModel";
import { IContactUsInterface, IGetNotifiedInterface } from "./contactUsInterface";

// Create A Contact Us
export const postContactUsServices = async (data: IContactUsInterface): Promise<IContactUsInterface | {}> => {
    const createContactUsData = await ContactUsModel.create(data);
    return createContactUsData;
}

// Find Contact Us
export const findAllContactUsServices = async (limit: number, skip: number): Promise<IContactUsInterface[]> => {
    const findContactUsdata = await ContactUsModel.find({}).sort({ "_id": -1 }).skip(skip).limit(limit);
    return findContactUsdata;
}

// Create A Get Notified
export const postGetNotifiedServices = async (data: IGetNotifiedInterface): Promise<IGetNotifiedInterface | {}> => {
    const createGetNotifiedData = await GetNotifiedModel.create(data);
    return createGetNotifiedData;
}

// Find Get Notified
export const findAllGetNotifiedServices = async (limit: number, skip: number): Promise<IGetNotifiedInterface[]> => {
    const findGetNotifieddata = await GetNotifiedModel.find({}).sort({ "_id": -1 }).skip(skip).limit(limit);
    return findGetNotifieddata;
}

// Delete A Contact Us
export const deleteContactUsServices = async (id: String): Promise<IContactUsInterface | any> => {
    const findContactUs: IContactUsInterface | any = await ContactUsModel.findOne({ _id: id });
    const deleteContactUs = await ContactUsModel.deleteOne(findContactUs, { runValidators: true });
    return deleteContactUs;
}