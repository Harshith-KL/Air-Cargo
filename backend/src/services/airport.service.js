const { findAllAirports, findAirportByCode, findAirportByName } = require("../repositories/airport.repository");

const getAllAirports = async() => {
    return await findAllAirports();
};

const getAirportByCode = async(code) => {
    const airport = await findAirportByCode(code);
    if (!airport) throw new Error("Airport not found");
    return airport;
};

const getAirportByName = async(name) => {
    const airport = await findAirportByName(name);
    if (!airport) throw new Error("Airport not found");
    return airport;
};

module.exports = {
    getAllAirports,
    getAirportByCode,
    getAirportByName,
};