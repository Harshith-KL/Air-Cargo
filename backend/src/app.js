const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const shipmentRoutes = require("./routes/shipment.routes");
const airportRoutes = require("./routes/airport.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const aiRoutes = require("./ai/ai.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/shipments", shipmentRoutes);
app.use("/api/airports", airportRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/ai", aiRoutes);

app.get("/",(req, res) => {
    res.status(200).json({
        success: true,
        message:"server is running"
    });
});

module.exports = app;