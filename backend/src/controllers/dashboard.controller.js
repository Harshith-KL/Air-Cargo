const {getDashboardStats, getDashboardPipeline, getDashboardRecentBookings, } = require("../services/dashboard.service");

const getDashboardStatsController = async(req, res) => {
    try {
        const stats = await getDashboardStats(req.user.organizationId);
        res.status(200).json({
            success: true,
            data: stats,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getDashboardPipelineController = async(req, res) => {
    try {
        const pipeline = await getDashboardPipeline(req.user.organizationId);
        res.status(200).json({
            success: true,
            data: pipeline,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getDashboardRecentBookingsController = async(req, res) => {
    try {
        const {status} = req.query;
        const bookings = await getDashboardRecentBookings(status, req.user.organizationId);
        res.status(200).json({
            success: true,
            data: bookings,
        });        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });        
    }
};

module.exports = {
    getDashboardStatsController,
    getDashboardPipelineController,
    getDashboardRecentBookingsController,
};
