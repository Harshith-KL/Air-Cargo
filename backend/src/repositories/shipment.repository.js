const mongoose = require('mongoose');
const Shipment = require('../models/shipment.model');

const scopedOrganizationId = (organizationId) => mongoose.Types.ObjectId.isValid(organizationId)
    ? new mongoose.Types.ObjectId(organizationId)
    : organizationId;

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
    if (filters.shipmentNumber) mongo.shipmentNumber = filters.shipmentNumber;
    if (filters.status) mongo.status = filters.status;
    if (filters.originAirport) mongo.originAirport = filters.originAirport;
    if (filters.destinationAirport) mongo.destinationAirport = filters.destinationAirport;
    if (filters.serviceLevel) mongo.serviceLevel = filters.serviceLevel;
    if (filters.commodityType) mongo.commodityType = filters.commodityType;
    if (filters.preferredAirline) mongo.preferredAirline = filters.preferredAirline;
    if (filters.preferredDepartureDate) mongo.preferredDepartureDate = { $gte: new Date(filters.preferredDepartureDate.startDate || "1970-01-01"), $lte: new Date(filters.preferredDepartureDate.endDate || "2999-12-31") };
    return await Shipment.find(mongo).populate("originAirport").populate("destinationAirport").limit(limit).sort({createdAt:-1});
};

const aggregateStatistics = async(organizationId) => {
    const match = { $match: { organizationId: scopedOrganizationId(organizationId) } };
    const group = { $group: { _id: "$status", count: { $sum: 1 }, totalGrossWeight: { $sum: "$grossWeight" }, totalPieces: { $sum: "$pieces" } } };
    const res = await Shipment.aggregate([match, group]);
    return res;
};

const aggregateOperationalStatistics = async(organizationId) => {
    const match = { $match: { organizationId: scopedOrganizationId(organizationId) } };
    const [summary] = await Shipment.aggregate([
        match,
        { $group: { _id: null, totalShipments: { $sum: 1 }, totalGrossWeight: { $sum: "$grossWeight" }, totalPieces: { $sum: "$pieces" } } },
    ]);
    const byStatus = await Shipment.aggregate([
        match,
        { $group: { _id: "$status", count: { $sum: 1 }, totalGrossWeight: { $sum: "$grossWeight" }, totalPieces: { $sum: "$pieces" } } },
    ]);
    const byAirport = async (field) => Shipment.aggregate([
        match,
        { $group: { _id: `$${field}`, count: { $sum: 1 }, totalGrossWeight: { $sum: "$grossWeight" } } },
        { $lookup: { from: "airports", localField: "_id", foreignField: "_id", as: "airport" } },
        { $unwind: { path: "$airport", preserveNullAndEmptyArrays: true } },
        { $project: { _id: 0, code: "$airport.code", name: "$airport.name", count: 1, totalGrossWeight: 1 } },
    ]);
    return { summary: summary || { totalShipments: 0, totalGrossWeight: 0, totalPieces: 0 }, byStatus, byOrigin: await byAirport("originAirport"), byDestination: await byAirport("destinationAirport") };
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
    aggregateOperationalStatistics,
    findShipmentsByDateRange,
    findRecentShipments,
    countShipments,
};