
import axios from "axios";
import { config } from "../../../config/config";

export const login = async (value) => {
  try {
    const response = await axios.post(`${config.userApi}/login`, value);

    if (!response || !response.data) {
      throw new Error("Invalid response received");
    }

    if (response.data.isActivated === false) {
      throw new Error(response.data.message);
    }

    localStorage.setItem("token", response.data.token);
    console.log(response.data);
  } catch (error) {
    throw new Error(error.response?.data?.message || "Please Activate Your Account");
  }
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
};