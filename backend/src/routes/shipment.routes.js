const express = require("express");
const {createShipmentController, findAllShipmentsController, getShipmentByIdController, updateShipmentByIdController, deleteShipmentByIdController, duplicateShipmentController, updateShipmentStatusController, } = require("../controllers/shipment.controller");
const {authenticate} = require("../middleware/auth.middleware");
const {authorizeAdmin} = require("../middleware/admin.middleware");
const validate = require("../middleware/validate.middleware");
const {createShipmentSchema, updateShipmentSchema, updateShipmentStatusSchema, } = require("../schemas/shipment.schema")

const router = express.Router();

router.post("/", authenticate, validate(createShipmentSchema), createShipmentController);
router.get("/", authenticate, findAllShipmentsController);
router.get("/:id", authenticate, getShipmentByIdController);
router.put("/:id", authenticate, validate(updateShipmentSchema), updateShipmentByIdController);
router.delete("/:id", authenticate, deleteShipmentByIdController);
router.post("/:id/duplicate", authenticate, duplicateShipmentController);
router.patch("/:id/status", authenticate, authorizeAdmin, validate(updateShipmentStatusSchema), updateShipmentStatusController);

module.exports = router;