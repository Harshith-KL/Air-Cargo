const {findAllAirports} = require("../repositories/airport.repository");

const getAllAirports = async() => {
    return await findAllAirports();
};

module.exports = {
    getAllAirports,
};