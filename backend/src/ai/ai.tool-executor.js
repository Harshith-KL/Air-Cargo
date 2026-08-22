const { TOOLS } = require("./ai.tools");
const { getShipmentByNumberSchema, searchShipmentsSchema, recentShipmentsSchema, dateRangeSchema } = require("./ai.schemas");

const VALIDATORS = {
  get_shipment_by_number: getShipmentByNumberSchema,
  search_shipments: searchShipmentsSchema,
  get_recent_shipments: recentShipmentsSchema,
  get_shipments_by_date_range: dateRangeSchema,
};

const executeTool = async (toolName, args, ctx) => {
  const validator = VALIDATORS[toolName];
  if (validator) {
    const v = validator.safeParse(args);
    if (!v.success) {
      throw new Error('Invalid tool arguments');
    }
  }

  const tool = TOOLS[toolName];
  if (!tool) throw new Error('Unknown tool');
  return await tool(args, ctx);
};

module.exports = { executeTool };
