import axiosInstance from "../../../api/axios";

export const getDashboardStats = async () => {
  const response = await axiosInstance.get("/dashboard/stats");
  return response.data.data;
};

export const getDashboardPipeline = async () => {
  const response = await axiosInstance.get("/dashboard/pipeline");
  return response.data.data;
};

export const getDashboardRecentBookings = async (status = "All") => {
  const response = await axiosInstance.get("/dashboard/recent-bookings", {
    params: { status: status === "All" ? undefined : status },
  });
  return response.data.data;
};
