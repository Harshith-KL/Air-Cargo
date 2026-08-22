const shipmentRepository = require("../repositories/shipment.repository");
const createShipment = async(data, userId, organizationId) => {
    if(!userId){
        throw new Error("User not authenticated");
    }

    const latestShipment = await shipmentRepository.findLatestShipment(organizationId);
    const year = new Date().getFullYear();
    let shipmentNumber;
    if(!latestShipment) {
        shipmentNumber = `SHP-${year}-000001`;
    } else {
        const lastNumber = parseInt(latestShipment.shipmentNumber.split("-")[2]);
        const nextNumber = String(lastNumber+1).padStart(6,"0");
        shipmentNumber = `SHP-${year}-${nextNumber}`;
    }

    const status = data.status && ["DRAFT", "SUBMITTED"].includes(data.status) ? data.status : "DRAFT";
    const volume = (data.length * data.width * data.height) / 1000000;
    const statusHistory = [{
        status,
        remarks: status === "SUBMITTED" ? "Shipment submitted" : "Shipment created",
    }];

    const shipment = await shipmentRepository.createShipment({
        ...data,
        shipmentNumber,
        volume,
        status,
        statusHistory,
        createdBy: userId,
        organizationId,
    });

    return shipment;
};

const findAllShipments = async(filters, page=1, limit=12, organizationId) => {
    const mongoFilters = {organizationId};
    if(filters.status){
        mongoFilters.status = filters.status;
    }

    if(filters.originAirport){
        mongoFilters.originAirport = filters.originAirport;
    }

    if(filters.destinationAirport){
        mongoFilters.destinationAirport = filters.destinationAirport;
    }

    if(filters.serviceLevel){
        mongoFilters.serviceLevel = filters.serviceLevel;
    }

    const skip = (page-1) * limit;
    const shipments = await shipmentRepository.findAllShipments(mongoFilters, skip, limit);
    const total = await shipmentRepository.countShipments(mongoFilters);
    return {
        shipments,
        organizationId,
        total,
        page,
        limit,
        totalPages: Math.ceil(total/limit),
    };
};

const getShipmentById = async(id, organizationId) => {
    const shipment = await shipmentRepository.findShipmentById(id, organizationId);
    if(!shipment) {
        throw new Error("Shipment not found");
    }
    return shipment;
};

const updateShipmentById = async(id, data, organizationId) => {
    const shipment = await shipmentRepository.findShipmentById(id, organizationId);
    if(!shipment) {
        throw new Error("Shipment not found");
    }
    if(shipment.status !== "DRAFT") {
        throw new Error("Only draft shipments can be edited");
    }

    const length = data.length ?? shipment.length;
    const width = data.width ?? shipment.width;
    const height = data.height ?? shipment.height;
    const volume = (length * width * height) / 1000000;

    const updatedShipment = await shipmentRepository.updateShipmentById(
        id,{
            ...data,
            volume,
        },
        organizationId
    );
    return updatedShipment;

};

const deleteShipmentById = async(id, organizationId) => {
    const shipment = await shipmentRepository.findShipmentById(id, organizationId);
    if(!shipment) {
        throw new Error("Shipment not found");
    }
    if(shipment.status !== "DRAFT" && shipment.status !== "CANCELLED") {
        throw new Error("Only draft or cancelled shipments can be deleted");
    }
    return await shipmentRepository.deleteShipmentById(id, organizationId);
};

const duplicateShipment = async(id, userId, organizationId) => {
    const shipment = await shipmentRepository.findShipmentById(id, organizationId);
    if(!shipment) {
        throw new Error("Shipment not found");
    }
    if (!userId) {
    throw new Error("User not authenticated");
    }

    const latestShipment = await shipmentRepository.findLatestShipment(organizationId);
    const year = new Date().getFullYear();
    let shipmentNumber;
    if (!latestShipment) {
    shipmentNumber = `SHP-${year}-000001`;
    } else {
    const lastNumber = parseInt(latestShipment.shipmentNumber.split("-")[2]);
    const nextNumber = String(lastNumber + 1).padStart(6, "0");
    shipmentNumber = `SHP-${year}-${nextNumber}`;
    }
    const duplicatedShipment =
    await shipmentRepository.createShipment({
        cargoDescription: shipment.cargoDescription,
        commodityType: shipment.commodityType,
        specialHandling: shipment.specialHandling,
        originAirport: shipment.originAirport._id,
        destinationAirport: shipment.destinationAirport._id,
        pieces: shipment.pieces,
        grossWeight: shipment.grossWeight,
        length: shipment.length,
        width: shipment.width,
        height: shipment.height,
        volume: shipment.volume,
        consigneeCompany: shipment.consigneeCompany,
        consigneeContactPerson: shipment.consigneeContactPerson,
        consigneeEmail: shipment.consigneeEmail,
        consigneeAddress: shipment.consigneeAddress,
        preferredDepartureDate: shipment.preferredDepartureDate,
        preferredAirline: shipment.preferredAirline,
        serviceLevel: shipment.serviceLevel,
        shipmentNumber,
        status: "DRAFT",
        statusHistory: [
            {
                status: "DRAFT",
                remarks: "Shipment duplicated",
            }
        ],
        createdBy: userId,
        organizationId,
    });

    return duplicatedShipment;
};

const updateShipmentStatus = async(id, status, remarks, organizationId) => {
    const shipment = await shipmentRepository.findShipmentById(id, organizationId);
    if(!shipment) {
        throw new Error("Shipment not found")
    }
    shipment.status = status;
    shipment.statusHistory.push({status, remarks});
    await shipment.save();
    return shipment;
};

module.exports = {
    createShipment,
    findAllShipments,
    getShipmentById,
    updateShipmentById,
    deleteShipmentById,
    duplicateShipment,
    updateShipmentStatus,
};