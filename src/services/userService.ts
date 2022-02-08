import axios from "axios";
import authHeader from "./authHeader";

import { API_URL } from '../constants/constants';

export const getUser = () => {
  
  return axios.get(API_URL + "user", { headers: authHeader() });
};

