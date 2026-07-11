const {getAllAirports} = require("../services/airport.service");

const getAllAirportsController = async(req, res) => {
    try {
        const airports = await getAllAirports();
        res.status(200).json({
            success: true,
            data: airports,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getAllAirportsController,
}
