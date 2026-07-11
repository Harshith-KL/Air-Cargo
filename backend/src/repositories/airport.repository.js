const Airport = require("../models/airport.model");

const findAllAirports = async() => {
    return await Airport.find();
};

module.exports = {
    findAllAirports,
};
