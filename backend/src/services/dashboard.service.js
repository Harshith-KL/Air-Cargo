const { countShipments, getPipelineData, getRecentBookings, } = require("../repositories/dashboard.repository");

const getDashboardStats = async(organizationId) => {
    const activeShipments = await countShipments({
        organizationId,
        status: {
            $nin : ["DELIVERED", "CANCELLED"]
        }
    });

    const pendingBookings = await countShipments({
        organizationId,
        status: {
            $in: ["DRAFT", "SUBMITTED"]
        }
    });

    const confirmed = await countShipments({
        organizationId,
        status: "CONFIRMED"
    });

    const inTransit = await countShipments({
        organizationId,
        status: "IN_TRANSIT"
    });

    const delivered = await countShipments({
        organizationId,
        status: "DELIVERED"
    });

    return {
        activeShipments,
        pendingBookings,
        confirmed,
        inTransit,
        delivered,
    };
};

const getDashboardPipeline = async(organizationId) => {
    const pipelineData = await getPipelineData(organizationId);
    const result = {
        draft: 0,
        submitted: 0,
        confirmed: 0,
        pickedUp: 0,
        inTransit: 0,
        arrived: 0,
        delivered: 0,
    };
    pipelineData.forEach((item) => {
        switch(item._id) {
            case "DRAFT":
                result.draft = item.count;
                break;

            case "SUBMITTED":
                result.submitted = item.count;
                break;

            case "CONFIRMED":
                result.confirmed = item.count;
                break;

            case "PICKED_UP":
                result.pickedUp = item.count;
                break;

            case "IN_TRANSIT":
                result.inTransit = item.count;
                break;

            case "ARRIVED":
                result.arrived = item.count;
                break;

            case "DELIVERED":
                result.delivered = item.count;
                break;
        }
    });
    return result;
};

const getDashboardRecentBookings = async(status, organizationId) => {
    const filter = {organizationId};
    if(status) {
        filter.status = status;
    }
    const bookings = await getRecentBookings(filter);
    return bookings.map((shipment) => ({
        shipmentNumber: shipment.shipmentNumber,
        route: `${shipment.originAirport.code} -> ${shipment.destinationAirport.code}`,
        consignee: shipment.consigneeCompany,
        weight: shipment.grossWeight,
        pieces: shipment.pieces,
        departureDate: shipment.preferredDepartureDate,
        status: shipment.status,
    }));
};

module.exports = {
    getDashboardStats,
    getDashboardPipeline,
    getDashboardRecentBookings,
};