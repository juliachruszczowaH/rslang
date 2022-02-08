import axios from "axios";
import { API_URL } from "constants/constants";

export const register = (username: string, email: string, password: string) => {
  return axios.post(API_URL + "users", { username, email, password });
};

export const login = (username: string, password: string) => {
  return axios
    .post(API_URL + "signin", { username, password })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};
export const logout = () => {
  localStorage.removeItem("user");
};
export const getCurrentUser = () => {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
  
    return null;
  };