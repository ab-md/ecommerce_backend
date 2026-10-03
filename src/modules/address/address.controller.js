import addressMessages from "./address.messages.js";
import { createAddressService, deleteAddressService, getAddressByAdminService, getAddressesByAdminService, getAddressesService, getAddressService, updateAddressService } from "./address.service.js";

const createAddress = async (req, res, next) => {
    try {
        const result = await createAddressService(req);
        return res.status(201).json({
            statusCode: 201,
            message: addressMessages.creationSuccess,
            data: result
        })
    } catch (error) {
        next(error);
    }
}

const updateAddress = async (req, res, next) => {
    try {
        const result = await updateAddressService(req);
        return res.status(201).json({
            statusCode: 201,
            message: addressMessages.updateSuccess,
            data: result
        })
    } catch (error) {
        next(error);
    }
}
const deleteAddress = async (req, res, next) => {
    try {
        await deleteAddressService(req);
        return res.status(200).json({
            statusCode: 200,
            message: addressMessages.deleteSuccess
        });
    } catch (error) {
        next(error);
    }
}

const getAddress = async (req, res, next) => {
    try {
        const address = await getAddressService(req);
        return res.status(200).json({
            statusCode: 200,
            data: address
        });
    } catch (error) {
        next(error);
    }
}

const getAddresses = async (req, res, next) => {
    try {
        const addresses = await getAddressesService(req.user);
        return res.status(200).json({
            statusCode: 200,
            data: addresses
        });
    } catch (error) {
        next(error);
    }
}

const getAddressByAdmin = async (req, res, next) => {
    try {
        const address = await getAddressByAdminService(req.params);
        return res.status(200).json({
            statusCode: 200,
            data: address
        });
    } catch (error) {
        next(error);
    }
}

const getAddressesByAdmin = async (req, res, next) => {
    try {
        const addresses = await getAddressesByAdminService();
        return res.status(200).json({
            statusCode: 200,
            data: addresses
        });
    } catch (error) {
        next(error);
    }
}

export {
    createAddress,
    updateAddress,
    deleteAddress,
    getAddress,
    getAddressByAdmin,
    getAddresses,
    getAddressesByAdmin,
}