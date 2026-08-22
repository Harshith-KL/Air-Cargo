const shipmentService = require("../services/shipment.service");

const TOOLS = {
  get_shipment_by_number: async (args, ctx) => {
    const { shipmentNumber } = args;
    const shipment = await shipmentService.getShipmentByNumber(shipmentNumber, ctx.organizationId);
    return shipment ? { shipment } : { shipment: null };
  },

  search_shipments: async (args, ctx) => {
    const { limit = 10, ...filters } = args;
    const results = await shipmentService.searchShipments(filters, ctx.organizationId, Math.min(limit, 50));
    return { results };
  },

  get_shipment_statistics: async (_, ctx) => {
    const stats = await shipmentService.getStatistics(ctx.organizationId);
    return { stats };
  },

  get_recent_shipments: async (args, ctx) => {
    const limit = Math.min(args.limit || 5, 50);
    const results = await shipmentService.getRecentShipments(limit, ctx.organizationId);
    return { results };
  },

  get_shipments_by_date_range: async (args, ctx) => {
    const { startDate, endDate, status } = args;
    const results = await shipmentService.getShipmentsByDateRange(startDate, endDate, status, ctx.organizationId);
    return { results };
  },

  get_shipment_summary: async (_, ctx) => {
    const summary = await shipmentService.getShipmentSummary(ctx.organizationId);
    return { summary };
  },
};

module.exports = {
  TOOLS,
};
