const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema({
    organizationName: {
        type: String,
        required: true,
        trim: true,
    },
    organizationAddress: {
        type: String,
        required: true,
        trim: true,
    },
},
    {
        timestamps: true,
    }
);

const Organization = mongoose.model('Organization', organizationSchema);
module.exports = Organization;