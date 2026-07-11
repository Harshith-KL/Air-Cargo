import axiosInstance from "../../../api/axios";

export const getAllShipments = async (filters = {}, page = 1, limit = 12) => {
  const response = await axiosInstance.get("/shipments", {
    params: {
      page,
      limit,
      ...filters,
    },
  });
  return response.data.data;
};

export const getShipmentById = async (id) => {
  const response = await axiosInstance.get(`/shipments/${id}`);
  return response.data.data;
};

export const createShipment = async (shipmentData) => {
  const response = await axiosInstance.post("/shipments", shipmentData);
  return response.data.data;
};

export const updateShipment = async (id, shipmentData) => {
  const response = await axiosInstance.put(`/shipments/${id}`, shipmentData);
  return response.data.data;
};

export const deleteShipment = async (id) => {
  const response = await axiosInstance.delete(`/shipments/${id}`);
  return response.data.data;
};

export const duplicateShipment = async (id) => {
  const response = await axiosInstance.post(`/shipments/${id}/duplicate`);
  return response.data.data;
};

export const updateShipmentStatus = async (id, status) => {
  const response = await axiosInstance.patch(`/shipments/${id}/status`, {
    status,
  });
  return response.data.data;
};

export const getAirports = async () => {
  const response = await axiosInstance.get("/airports");
  return response.data.data;
};
