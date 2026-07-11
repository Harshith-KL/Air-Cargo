const { z } = require("zod");

const createShipmentSchema = z.object({
    body:z.object({
        cargoDescription: z.string().min(3, "Cargo description must be at least 3 characters"),
        commodityType: z.enum([
            "Electronics",
            "Pharmaceuticals",
            "Machine parts",
            "Textiles & apparel",
            "Perishable foods",
            "Automotive parts",
            "Aircraft components",
            "Consumer goods",
        ]),
        specialHandling: z.enum([
            "None",
            "Fragile",
            "Temperature Controlled",
            "Dangerous Goods",
            "Live Animals",
            "Perishable",
        ]),
        // originAirport: z.string().regex(/^[0-9a-fA-F]{24}$/,"Invalid origin airport id"),
        // destinationAirport: z.string().regex(/^[0-9a-fA-F]{24}$/,"Invalid destination airport id"),
        pieces: z.number().int().min(1, "Pieces must be at least 1"),
        grossWeight: z.number().positive("Gross weight must be greater than 0"),
        length: z.number().positive("Length must be greater than 0"),
        width: z.number().positive("Width must be greater than 0"),
        height: z.number().positive("Height must be greater than 0"),
        consigneeCompany: z.string().min(2, "Consignee company is required"),
        consigneeContactPerson: z.string().min(2, "Contact person is required"),
        consigneeEmail: z.email("Invalid consignee email"),
        
        preferredDepartureDate: z.coerce.date(),
        preferredAirline: z.enum([
            "Lufthansa",
            "Emirates SkyCargo",
            "Singapore Airlines",
            "Cathay Cargo",
            "Qatar Airways",
            "Air France-KLM",
            "United Cargo",
        ]),
        serviceLevel: z.enum([
            "Standard",
            "Express",
            "Priority",
        ]),
    }),
});

const updateShipmentSchema = z.object({
    body: z.object({
        cargoDescription: z.string().min(3, "Cargo description must be at least 3 characters").optional(),
        commodityType: z.enum([
            "Electronics",
            "Pharmaceuticals",
            "Machine parts",
            "Textiles & apparel",
            "Perishable foods",
            "Automotive parts",
            "Aircraft components",
            "Consumer goods",
        ]).optional(),
        specialHandling: z.enum([
            "None",
            "Fragile",
            "Temperature Controlled",
            "Dangerous Goods",
            "Live Animals",
            "Perishable",
        ]).optional(),
        originAirport: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid origin airport id").optional(),
        destinationAirport: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid destination airport id").optional(),
        pieces: z.number().int().min(1, "Pieces must be at least 1").optional(),
        grossWeight: z.number().positive("Gross weight must be greater than 0").optional(),
        length: z.number().positive("Length must be greater than 0").optional(),
        width: z.number().positive("Width must be greater than 0").optional(),
        height: z.number().positive("Height must be greater than 0").optional(),
        consigneeCompany: z.string().min(2, "Consignee company is required").optional(),
        consigneeContactPerson: z.string().min(2, "Contact person is required").optional(),
        consigneeEmail: z.email("Invalid consignee email").optional(),
        consigneeAddress: z.string().min(5, "Consignee address is required").optional(),
        preferredDepartureDate: z.coerce.date().optional(),
        preferredAirline: z.enum([
            "Lufthansa",
            "Emirates SkyCargo",
            "Singapore Airlines",
            "Cathay Cargo",
            "Qatar Airways",
            "Air France-KLM",
            "United Cargo",
        ]).optional(),
        serviceLevel: z.enum([
            "Standard",
            "Express",
            "Priority",
        ]).optional(),
    }),
});

const updateShipmentStatusSchema = z.object({
    body: z.object({
        status: z.enum([
            "DRAFT",
            "SUBMITTED",
            "CONFIRMED",
            "PICKED_UP",
            "IN_TRANSIT",
            "ARRIVED",
            "DELIVERED",
            "CANCELLED",
        ]),
        remarks: z.string().trim().min(3, "Remarks must be at least 3 characters"),
    }),
});

module.exports = {
    createShipmentSchema,
    updateShipmentSchema,
    updateShipmentStatusSchema,
}

