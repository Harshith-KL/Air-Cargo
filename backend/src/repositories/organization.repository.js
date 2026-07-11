const Organization = require("../models/organization.model");

const createOrganization = async(data) => {
    return await Organization.create(data);
};

module.exports = {
    createOrganization,
}