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

const findShipmentByNumber = async(shipmentNumber, organizationId) => {
    const query = { shipmentNumber, organizationId };
    return await Shipment.findOne(query).populate("originAirport").populate("destinationAirport");
};

const searchShipments = async(filters, organizationId, limit=10) => {
    const mongo = { organizationId };
    if (filters.status) mongo.status = filters.status;
    if (filters.originAirport) mongo.originAirport = filters.originAirport;
    if (filters.destinationAirport) mongo.destinationAirport = filters.destinationAirport;
    if (filters.serviceLevel) mongo.serviceLevel = filters.serviceLevel;
    if (filters.commodityType) mongo.commodityType = filters.commodityType;
    if (filters.preferredAirline) mongo.preferredAirline = filters.preferredAirline;
    return await Shipment.find(mongo).populate("originAirport").populate("destinationAirport").limit(limit).sort({createdAt:-1});
};

const aggregateStatistics = async(organizationId) => {
    const match = { $match: { organizationId } };
    const group = { $group: { _id: "$status", count: { $sum: 1 }, totalGrossWeight: { $sum: "$grossWeight" }, totalPieces: { $sum: "$pieces" } } };
    const res = await Shipment.aggregate([match, group]);
    return res;
};

const findShipmentsByDateRange = async(startDate, endDate, status, organizationId, limit=50) => {
    const mongo = { organizationId, preferredDepartureDate: { $gte: new Date(startDate), $lte: new Date(endDate) } };
    if (status) mongo.status = status;
    return await Shipment.find(mongo).populate("originAirport").populate("destinationAirport").limit(limit).sort({preferredDepartureDate:1});
};

const findRecentShipments = async(limit=5, organizationId) => {
    const query = { organizationId };
    return await Shipment.find(query).populate("originAirport").populate("destinationAirport").sort({createdAt:-1}).limit(limit);
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
    findShipmentByNumber,
    searchShipments,
    aggregateStatistics,
    findShipmentsByDateRange,
    findRecentShipments,
    countShipments,
};