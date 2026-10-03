import { createError } from "../../common/utils/createError.js";
import User from "../users/user.model.js";
import addressMessages from "./address.messages.js";
import Address from "./address.model.js";

const createAddressService = async payload => {
    let { title, province, city, receiver_phone, receiver_name, address, postal_code, isDefault } = payload.body;
    const user = payload.user;
    if (!user) throw createError(401, addressMessages.notAuthorized);
    const existingUser = await User.findOne({ email: user.email });
    if (!existingUser) throw createError(401, addressMessages.notAuthorized);
    if (!receiver_name) {
        receiver_name = [existingUser.first_name, existingUser.last_name].filter(Boolean).join(" ");
    }
    if (existingUser.phone && !receiver_phone) receiver_phone = existingUser.phone;
    const existingDefaulAddress = await Address.findOne({ user: existingUser._id, isDefault: true });
    isDefault = existingDefaulAddress ? false : true;
    const initialData = {
        user: existingUser._id,
        title,
        receiver_name,
        receiver_phone,
        province,
        city,
        address,
        postal_code,
        isDefault
    }
    const createResult = await Address.create(initialData);
    if (!createResult) throw createError(500, addressMessages.serverError);
    return createResult;
}

const updateAddressService = async payload => {
    let { title, province, city, receiver_phone, receiver_name, address: addressData, postal_code, isDefault } = payload.body;
    const { id: addressId } = payload.params;
    const user = payload.user;
    if (!user) throw createError(401, addressMessages.notAuthorized);
    const existingUser = await User.findOne({ email: user.email });
    if (!existingUser) throw createError(401, addressMessages.notAuthorized);
    const address = await Address.findOne({ _id: addressId, user: existingUser._id });
    if (!address) throw createError(404, addressMessages.notFoundAddress);
    const updateData = {}
    if (title !== undefined) updateData.title = title;
    if (province !== undefined) updateData.province = province;
    if (city !== undefined) updateData.city = city;
    if (receiver_name !== undefined) updateData.receiver_name = receiver_name;
    if (receiver_phone !== undefined) updateData.receiver_phone = receiver_phone;
    if (addressData !== undefined) updateData.address = addressData;
    if (postal_code !== undefined) updateData.postal_code = postal_code;
    if (isDefault !== undefined) updateData.isDefault = isDefault;
    const updateResult = await Address.findByIdAndUpdate(addressId, {
        $set: updateData
    }, { returnDocument: "after" });
    if (!updateResult) throw createError(500, addressMessages.serverError);
    if (updateResult.isDefault === true) {
        try {
            const oldDefaultAddress = await Address.findOne({
                user: existingUser._id,
                isDefault: true,
                _id: { $ne: addressId }
            });
            if (oldDefaultAddress) {
                oldDefaultAddress.isDefault = false;
                await oldDefaultAddress.save();
            }
        } catch (error) {
            throw createError(500, addressMessages.serverError);
        }
    }
    return updateResult;
}

const deleteAddressService = async payload => {
    const { id } = payload.params;
    const user = payload.user;
    const isUser = await User.findOne({ email: user.email });
    if (!isUser) throw createError(401, addressMessages.notAuthorized);
    const address = await Address.findOne({ user: isUser._id, _id: id });
    if (!address) throw createError(404, addressMessages.notFoundAddress);
    const result = await Address.findByIdAndDelete(id, { returnDocument: "after" });
    if (!result) throw createError(500, addressMessages.serverError);
    return result;
}

const getAddressService = async payload => {
    const { id } = payload.params;
    const user = payload.user;
    const isUser = await User.findOne({ email: user.email });
    if (!isUser) throw createError(401, addressMessages.notAuthorized);
    const address = await Address.findOne({ user: isUser._id, _id: id });
    if (!address) throw createError(404, addressMessages.notFoundAddress);
    return address;
}

const getAddressByAdminService = async payload => {
    const { id } = payload;
    const address = await Address.findById(id);
    if (!address) throw createError(404, addressMessages.notFoundAddress);
    return address;
}

const getAddressesService = async payload => {
    const user = payload;
    const isUser = await User.findOne({ email: user.email });
    if (!isUser) throw createError(401, addressMessages.notAuthorized);
    const addresses = await Address.find({ user: isUser._id });
    return addresses;
}

const getAddressesByAdminService = async () => {
    const addresses = await Address.find();
    return addresses;
}

export {
    createAddressService,
    updateAddressService,
    deleteAddressService,
    getAddressService,
    getAddressesService,
    getAddressByAdminService,
    getAddressesByAdminService,
}