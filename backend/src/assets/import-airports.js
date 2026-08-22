const axios = require('axios');
const mongoose = require('mongoose');
const {MONGODB_URI} = require("../config/env");
const Airport = require('../models/airport.model');

const AIRPORTS_URL = "https://raw.githubusercontent.com/Vertisize-Solutions/data-airports-list/refs/heads/master/airport-codes.json";

const defaultAirports = [
    { code: "DXB", name: "Dubai International Airport", city: "Dubai", country: "United Arab Emirates" },
    { code: "JFK", name: "John F. Kennedy International Airport", city: "New York", country: "United States" },
    { code: "LHR", name: "London Heathrow Airport", city: "London", country: "United Kingdom" },
    { code: "SIN", name: "Singapore Changi Airport", city: "Singapore", country: "Singapore" },
    { code: "BOM", name: "Chhatrapati Shivaji Maharaj International Airport", city: "Mumbai", country: "India" },
];

const seedDefaultAirports = async() => {
    try {
        const existingCount = await Airport.countDocuments();
        if (existingCount > 0) {
            console.log(`Airports collection already has ${existingCount} records; skipping seed.`);
            return;
        }

        await Airport.insertMany(defaultAirports);
        console.log(`Seeded ${defaultAirports.length} default airports.`);
    } catch (error) {
        console.error("Airport seed failed:", error.message);
        throw error;
    }
};

const importAirports = async() => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("MongoDB Connected");
        const {data: airportObj} = await axios.get(AIRPORTS_URL);
        const airports = [];
        const uniqueValue = new Set();
        airportObj.forEach((airport) => {
            if (airport.airportCode && airport.airportName && airport.cityName && airport.countryName && !uniqueValue.has(airport.airportCode)) {
                uniqueValue.add(airport.airportCode);
                airports.push({
                    code: airport.airportCode,
                    name: airport.airportName,
                    city: airport.cityName,
                    country: airport.countryName,
                });
            }
        });
        await Airport.deleteMany({});
        await Airport.insertMany(airports);
        console.log(`Imported ${airports.length} airports successfully`);
        process.exit(0);
    } catch (error) {
        console.error("Import failed:", error.message);
        process.exit(1);
    }
};

module.exports = {
    defaultAirports,
    seedDefaultAirports,
    importAirports,
};

if (require.main === module) {
    importAirports();
}
