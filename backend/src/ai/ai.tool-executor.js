const crypto = require("crypto");
const shipmentService = require("../services/shipment.service");
const airportService = require("../services/airport.service");
const schemas = require("./ai.schemas");

const pendingCreations = new Map();
const validators = {
  get_shipment_by_number: schemas.getShipmentByNumberSchema,
  search_shipments: schemas.searchShipmentsSchema,
  get_recent_shipments: schemas.recentShipmentsSchema,
  get_shipment_statistics: schemas.statisticsSchema,
  get_airport_by_code: schemas.airportCodeSchema,
  get_airport_by_name: schemas.airportNameSchema,
  create_shipment: schemas.createShipmentSchema,
};

const publicAirport = (airport) => airport && ({ code: airport.code, name: airport.name, city: airport.city, country: airport.country });
const publicShipment = (shipment) => shipment && ({ shipmentNumber: shipment.shipmentNumber, status: shipment.status, origin: publicAirport(shipment.originAirport), destination: publicAirport(shipment.destinationAirport), pieces: shipment.pieces, grossWeight: shipment.grossWeight, commodityType: shipment.commodityType, serviceLevel: shipment.serviceLevel, preferredDepartureDate: shipment.preferredDepartureDate });
const safeError = (code, message) => ({ success: false, error: { code, message } });

const executeTool = async (toolName, rawArgs, ctx) => {
  const validator = validators[toolName];
  if (!validator) return safeError("TOOL_NOT_FOUND", "That operation is not available.");
  const normalizedArgs = Object.fromEntries(Object.entries(rawArgs || {}).filter(([, value]) => value !== null));
  const parsed = validator.safeParse(normalizedArgs);
  if (!parsed.success) return safeError("VALIDATION_ERROR", "The tool arguments were invalid.");
  const args = parsed.data;
  if (!ctx?.organizationId || !ctx?.userId) return safeError("UNAUTHORIZED", "Authentication is required.");

  try {
    if (toolName === "get_airport_by_code") return { airport: publicAirport(await airportService.getAirportByCode(args.code)) };
    if (toolName === "get_airport_by_name") return { airport: publicAirport(await airportService.getAirportByName(args.name)) };
    if (toolName === "get_shipment_by_number") return { shipment: publicShipment(await shipmentService.getShipmentByNumber(args.shipmentNumber.toUpperCase(), ctx.organizationId)) };
    if (toolName === "search_shipments") {
      const filters = { ...args };
      if (filters.startDate || filters.endDate) filters.preferredDepartureDate = { startDate: filters.startDate, endDate: filters.endDate };
      delete filters.startDate; delete filters.endDate;
      if (filters.originAirportCode) filters.originAirport = (await airportService.getAirportByCode(filters.originAirportCode))._id;
      if (filters.destinationAirportCode) filters.destinationAirport = (await airportService.getAirportByCode(filters.destinationAirportCode))._id;
      delete filters.originAirportCode; delete filters.destinationAirportCode;
      const results = await shipmentService.searchShipments(filters, ctx.organizationId, args.limit || 10);
      return { results: results.map(publicShipment) };
    }
    if (toolName === "get_recent_shipments") return { results: (await shipmentService.getRecentShipments(args.limit || 10, ctx.organizationId)).map(publicShipment) };
    if (toolName === "get_shipment_statistics") return { stats: await shipmentService.getStatistics(ctx.organizationId) };
    if (toolName === "create_shipment") {
      if (ctx.role !== "ADMIN") return safeError("FORBIDDEN", "Only administrators can create shipments through the assistant.");
      const key = `${ctx.userId}:${ctx.conversationId}`;
      if (!args.confirmation) {
        const token = crypto.randomBytes(18).toString("hex");
        pendingCreations.set(key, { token, args, expiresAt: Date.now() + 10 * 60 * 1000 });
        return { type: "confirmation_required", action: "create_shipment", details: { originAirportCode: args.originAirportCode, destinationAirportCode: args.destinationAirportCode, pieces: args.pieces, grossWeight: args.grossWeight } };
      }
      if (!ctx.explicitConfirmation) return safeError("CONFIRMATION_REQUIRED", "Explicit user confirmation is required before creating a shipment.");
      const pending = pendingCreations.get(key);
      if (!pending || pending.expiresAt < Date.now()) return safeError("CONFIRMATION_REQUIRED", "Please provide the shipment details again to start a new confirmation.");
      const origin = await airportService.getAirportByCode(args.originAirportCode);
      const destination = await airportService.getAirportByCode(args.destinationAirportCode);
      const { confirmation, ...data } = pending.args;
      const created = await shipmentService.createShipment({ ...data, originAirport: origin._id, destinationAirport: destination._id }, ctx.userId, ctx.organizationId);
      pendingCreations.delete(key);
      return { success: true, shipment: publicShipment(created) };
    }
    return safeError("TOOL_NOT_FOUND", "That operation is not available.");
  } catch (error) {
    if (error.message === "Shipment not found") return safeError("SHIPMENT_NOT_FOUND", "The shipment was not found.");
    if (error.message === "Airport not found") return safeError("AIRPORT_NOT_FOUND", "The airport was not found.");
    throw error;
  }
};

module.exports = { executeTool };
