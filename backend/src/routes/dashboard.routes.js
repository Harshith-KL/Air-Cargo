const express = require("express");
const {getDashboardStatsController, getDashboardPipelineController, getDashboardRecentBookingsController, } = require("../controllers/dashboard.controller");
const {authenticate} = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/stats", authenticate, getDashboardStatsController);
router.get("/pipeline", authenticate, getDashboardPipelineController);
router.get("/recent-bookings", authenticate, getDashboardRecentBookingsController)

module.exports = router;