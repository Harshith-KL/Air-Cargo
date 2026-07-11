const express = require("express");
const {getAllAirportsController} = require("../controllers/airport.controller");
const {authenticate} = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", authenticate, getAllAirportsController);

module.exports = router;
