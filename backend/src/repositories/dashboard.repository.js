const mongoose = require("mongoose");
const shipment = require("../models/shipment.model");

const countShipments = async(filter) => {
    return await shipment.countDocuments(filter)
};

const getPipelineData = async(organizationId) => {
    return await shipment.aggregate([
        {
            $match: {
                organizationId: new mongoose.Types.ObjectId(organizationId)
            }
        },
        {
            $group: {
                 _id: "$status",
                count: { $sum: 1 },
            }
        }
    ])
};

const getRecentBookings = async(filter) => {
    return await shipment.find(filter).populate("originAirport").populate("destinationAirport").sort({createdAt: -1}).limit(5)
};

module.exports = {
    countShipments,
    getPipelineData,
    getRecentBookings,
};