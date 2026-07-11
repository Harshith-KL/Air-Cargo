import axiosInstance from "../../../api/axios";

export const login = async(data) => {
    const response = await axiosInstance.post("/auth/signin", data);
    return response.data;
};

export const getProfile = async () => {
  const response = await axiosInstance.get("/auth/profile");
  return response.data;
};

export const signup = async (data) => {
  const response = await axiosInstance.post("/auth/signup", data);
  return response.data;
};
