const Airport = require("../models/airport.model");

const findAllAirports = async() => {
    return await Airport.find();
};

const findAirportByCode = async(code) => Airport.findOne({ code: code.toUpperCase() });
const findAirportByName = async(name) => Airport.findOne({ name: { $regex: name, $options: "i" } });

module.exports = {
    findAllAirports,
    findAirportByCode,
    findAirportByName,
};
