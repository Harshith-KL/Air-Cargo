const app = require("./src/app");
const connectDB = require("./src/config/db");
const {PORT} = require("./src/config/env");

const startServer = async() => {
    try {
        await connectDB();
        app.listen(PORT,() => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("server failed:", error.message);
    }
};

startServer();