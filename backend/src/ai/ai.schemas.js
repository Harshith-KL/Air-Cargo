const { z } = require("zod");

const chatSchema = z.object({
  message: z.string().min(1).max(4000),
});

const getShipmentByNumberSchema = z.object({
  shipmentNumber: z.string().min(1),
});

const searchShipmentsSchema = z.object({
  status: z.string().optional(),
  originAirport: z.string().optional(),
  destinationAirport: z.string().optional(),
  serviceLevel: z.string().optional(),
  commodityType: z.string().optional(),
  preferredAirline: z.string().optional(),
  limit: z.number().int().min(1).max(50).optional(),
});

const recentShipmentsSchema = z.object({
  limit: z.number().int().min(1).max(50).optional(),
});

const dateRangeSchema = z.object({
  startDate: z.string().refine((s) => !isNaN(Date.parse(s)), { message: "Invalid startDate" }),
  endDate: z.string().refine((s) => !isNaN(Date.parse(s)), { message: "Invalid endDate" }),
  status: z.string().optional(),
});

module.exports = {
  chatSchema,
  getShipmentByNumberSchema,
  searchShipmentsSchema,
  recentShipmentsSchema,
  dateRangeSchema,
};
