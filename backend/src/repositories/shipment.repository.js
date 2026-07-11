const Shipment = require('../models/shipment.model');

const createShipment = async(data) => {
    return await Shipment.create(data)
};

const findAllShipments = async(filters, skip, limit) => {
    return await Shipment.find(filters).populate("originAirport").populate("destinationAirport").skip(skip).limit(limit)
};

const findShipmentById = async(id, organizationId) => {
    const query = {_id: id, organizationId: organizationId};
    return await Shipment.findOne(query).populate("originAirport").populate("destinationAirport")
};

const updateShipmentById = async(id, data, organizationId) => {
    const query = {_id: id, organizationId: organizationId};
    return await Shipment.findOneAndUpdate(query, data, {new:true, runValidators: true}).populate("originAirport").populate("destinationAirport")
};

const deleteShipmentById = async(id, organizationId) => {
    const query = {_id: id, organizationId: organizationId};
    return await Shipment.findOneAndDelete(query)
};

const findLatestShipment = async(organizationId) => {
    const query = {organizationId: organizationId};
    return await Shipment.findOne(query).sort({createdAt:-1})
};

const countShipments = async(filters) => {
    return await Shipment.countDocuments(filters);
};

module.exports = {
    createShipment,
    findAllShipments,
    findShipmentById,
    updateShipmentById,
    deleteShipmentById,
    findLatestShipment,
    countShipments,
};