const User = require("../models/user.model");

const createUser = async(userData) =>{
    return await User.create(userData);
};

const findUserByEmail = async(email) =>{
    return await User.findOne({email}).populate("organizationId");
};

const findUserById = async(id) =>{
    return await User.findById(id).populate("organizationId");
};

module.exports = {
    createUser,
    findUserByEmail,
    findUserById,
};