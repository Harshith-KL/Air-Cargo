const mongoose = require('mongoose');

const statusHistorySchema = new mongoose.Schema({
    status: {
        type: String,
        required: true
    },
    remarks: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
},
{
    _id: false,
}
);

const shipmentSchema = new mongoose.Schema({
    shipmentNumber: {
        type: String,
        required: true,
        unique: true
    },
    cargoDescription: {
        type: String,
        required: true
    },
    commodityType: {
        type: String,
        enum: ["Electronics",
                "Pharmaceuticals",
                "Machine parts",
                "Textiles & apparel",
                "Perishable foods",
                "Automotive parts",
                "Aircraft components",
                "Consumer goods"],
        required: true
    },
    specialHandling: {
        type: String,
        enum: [ "None",
                "Fragile",
                "Temperature Controlled",
                "Dangerous Goods",
                "Live Animals",
                "Perishable"],
        required: true
    },
    originAirport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Airport",
    required: true
    },
    destinationAirport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Airport",
    required: true
    },
    pieces: {
        type: Number,
        required: true,
        min: 1,
    },
    grossWeight: {
        type: Number,
        required: true,
        min: 0.1,
    },
    length: {
        type: Number,
        required: true,
        min: 0.1,
    },
    width: {
        type: Number,
        required: true,
        min: 0.1
    },
    height: {
        type: Number,
        required: true,
        min: 0.1,
    },
    volume: {
        type: Number,
        required: true
    },
    consigneeCompany: {
        type: String,
        required: true
    },
    consigneeContactPerson: {
        type: String,
        required: true
    },
    consigneeEmail: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    consigneeAddress: {
        type: String,
        
    },
    preferredDepartureDate: {
        type: Date,
        required: true
    },
    preferredAirline: {
        type: String,
        enum: ["Lufthansa",
        "Emirates SkyCargo",
        "Singapore Airlines",
        "Cathay Cargo",
        "Qatar Airways",
        "Air France-KLM",
        "United Cargo"],
        required: true
    },
    serviceLevel: {
        type: String,
        enum: ["Standard",
                "Express",
                "Priority"],
        required: true
    },
    status: {
        type: String,
        enum: ["DRAFT","SUBMITTED","CONFIRMED","PICKED_UP","IN_TRANSIT","ARRIVED","DELIVERED","CANCELLED"],
        default: "DRAFT",
        required: true
    },  
    statusHistory: {
        type: [statusHistorySchema],
        default: []
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
    },
},
    {
        timestamps: true,
    }
);

const Shipment = mongoose.model("Shipment", shipmentSchema);
module.exports = Shipment;