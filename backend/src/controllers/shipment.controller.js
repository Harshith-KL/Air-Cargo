const {createShipment, findAllShipments, getShipmentById, updateShipmentById, deleteShipmentById, duplicateShipment, updateShipmentStatus, } = require("../services/shipment.service");

const createShipmentController = async(req, res) => {
    try {
        const create = await createShipment(req.body, req.user.userId, req.user.organizationId);
        res.status(201).json({
            success: true,
            message: "Shipment created Successfully",
            data: create,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const findAllShipmentsController = async(req, res) => {
    try {
        const {page = 1, limit = 12, ...filters} = req.query;
        const shipments = await findAllShipments(filters, Number(page), Number(limit), req.user.organizationId);
        res.status(200).json({
            success: true,
            data: shipments,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getShipmentByIdController = async(req,res) => {
    try {
        const {id} = req.params;
        const shipment = await getShipmentById(id, req.user.organizationId);
        res.status(200).json({
            success: true,
            data: shipment,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Invalid Id. Shipment not found",
        });
    }
};

const updateShipmentByIdController = async(req, res) => {
    try {
        const {id} = req.params;
        const updatedShipment = await updateShipmentById(id, req.body, req.user.organizationId);
        res.status(200).json({
            success: true,
            message: "Shipment updated successfully",
            data: updatedShipment,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteShipmentByIdController = async(req, res) => {
    try {
        const {id} = req.params;
        const deletedShipment = await deleteShipmentById(id, req.user.organizationId);
        res.status(200).json({
            success: true,
            message: "Shipment deleted successfully",
            data: deletedShipment,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

const duplicateShipmentController = async(req, res) => {
    try {
        const {id} = req.params;
        const duplicatedShipment = await duplicateShipment(id, req.user.userId, req.user.organizationId);
        res.status(201).json({
            success: true,
            message: "Shipment duplicated Successfully",
            data: duplicatedShipment,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

const updateShipmentStatusController = async(req, res) => {
    try {
        const {id} = req.params;
        const {status, remarks} = req.body;
        const shipment = await updateShipmentStatus(id, status, remarks, req.user.organizationId);
        res.status(200).json({
            success: true,
            message: "Shipment status updated successfully",
            data: shipment,
        });
    } catch (error) {
         res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};


module.exports = {
    createShipmentController,
    findAllShipmentsController,
    getShipmentByIdController,
    updateShipmentByIdController,
    deleteShipmentByIdController,
    duplicateShipmentController,
    updateShipmentStatusController,
};