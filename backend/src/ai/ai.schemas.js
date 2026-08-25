const { z } = require("zod");

const chatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(4000),
}).strict();

const chatSchema = z.object({
  message: z.string().trim().min(1).max(4000),
  conversationId: z.string().trim().min(1).max(100).optional(),
  history: z.array(chatMessageSchema).max(20).optional(),
}).strict();

const getShipmentByNumberSchema = z.object({
  shipmentNumber: z.string().regex(/^SHP(?:-\d{4})?-\d{1,8}$/i),
}).strict();

const searchShipmentsSchema = z.object({
  status: z.string().optional(),
  shipmentNumber: z.string().regex(/^SHP(?:-\d{4})?-\d{1,8}$/i).optional(),
  originAirportCode: z.string().trim().min(2).max(4).optional(),
  destinationAirportCode: z.string().trim().min(2).max(4).optional(),
  startDate: z.string().datetime({ offset: true }).optional(),
  endDate: z.string().datetime({ offset: true }).optional(),
  serviceLevel: z.string().optional(),
  commodityType: z.string().optional(),
  preferredAirline: z.string().optional(),
  limit: z.number().int().min(1).max(50).optional(),
}).strict().superRefine((value, ctx) => {
  if (value.startDate && value.endDate && new Date(value.startDate) > new Date(value.endDate)) {
    ctx.addIssue({ code: "custom", path: ["endDate"], message: "endDate must be after startDate" });
  }
});

const recentShipmentsSchema = z.object({
  limit: z.number().int().min(1).max(50).optional(),
}).strict();

const statisticsSchema = z.object({}).strict();

const dateRangeSchema = z.object({
  startDate: z.string().refine((s) => !isNaN(Date.parse(s)), { message: "Invalid startDate" }),
  endDate: z.string().refine((s) => !isNaN(Date.parse(s)), { message: "Invalid endDate" }),
  status: z.string().optional(),
}).strict().superRefine((value, ctx) => {
  if (new Date(value.startDate) > new Date(value.endDate)) {
    ctx.addIssue({ code: "custom", path: ["endDate"], message: "endDate must be after startDate" });
  }
});

const airportCodeSchema = z.object({
  code: z.string().trim().regex(/^[A-Za-z]{3}$/),
}).strict();

const airportNameSchema = z.object({
  name: z.string().trim().min(2).max(120),
}).strict();

const createShipmentSchema = z.object({
  cargoDescription: z.string().trim().min(1).max(500),
  commodityType: z.enum(["Electronics", "Pharmaceuticals", "Machine parts", "Textiles & apparel", "Perishable foods", "Automotive parts", "Aircraft components", "Consumer goods"]),
  specialHandling: z.enum(["None", "Fragile", "Temperature Controlled", "Dangerous Goods", "Live Animals", "Perishable"]),
  originAirportCode: z.string().trim().regex(/^[A-Za-z]{3}$/),
  destinationAirportCode: z.string().trim().regex(/^[A-Za-z]{3}$/),
  pieces: z.number().int().min(1).max(100000),
  grossWeight: z.number().positive().max(1000000),
  length: z.number().positive().max(100000),
  width: z.number().positive().max(100000),
  height: z.number().positive().max(100000),
  consigneeCompany: z.string().trim().min(1).max(200),
  consigneeContactPerson: z.string().trim().min(1).max(120),
  consigneeEmail: z.string().email(),
  consigneeAddress: z.string().trim().max(500).optional(),
  preferredDepartureDate: z.string().datetime({ offset: true }),
  preferredAirline: z.enum(["Lufthansa", "Emirates SkyCargo", "Singapore Airlines", "Cathay Cargo", "Qatar Airways", "Air France-KLM", "United Cargo"]),
  serviceLevel: z.enum(["Standard", "Express", "Priority"]),
  confirmation: z.boolean().default(false),
}).strict();

module.exports = {
  chatSchema,
  getShipmentByNumberSchema,
  searchShipmentsSchema,
  recentShipmentsSchema,
  statisticsSchema,
  dateRangeSchema,
  airportCodeSchema,
  airportNameSchema,
  createShipmentSchema,
  chatMessageSchema,
};
