const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const { FRONTEND_URL } = require("./config/env");
const authRoutes = require("./routes/auth.routes");
const shipmentRoutes = require("./routes/shipment.routes");
const airportRoutes = require("./routes/airport.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const aiRoutes = require("./ai/ai.routes");

const app = express();

app.disable("x-powered-by");
app.use(helmet());
app.set("trust proxy", 1);
app.use(express.json({ limit: "1mb" }));
app.use(
    cors({
        origin: FRONTEND_URL,
    })
);

app.get("/health",(req, res) => {
    res.status(200).json({
        success: true,
        message:"healthy"
    });
});

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