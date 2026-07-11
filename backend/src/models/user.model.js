const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        fullName:{
            type: String,
            required: true,
            trim: true,
        },
        contactNumber:{
            type: String,
            required: true,
            trim: true,
        },
        email:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password:{
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["ADMIN", "CUSTOMER"],
            default: "CUSTOMER",
        },
        organizationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization",
}
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User;