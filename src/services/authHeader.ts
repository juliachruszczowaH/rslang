import { AxiosRequestHeaders } from 'axios';

export default function authHeader():AxiosRequestHeaders {
  const userStr = localStorage.getItem("user");
  let user = null;
  if (userStr) {
    user = JSON.parse(userStr);
  }

  if (user && user.token) {
    return { 'x-access-token': user.token };
  } else {
    return {};
  }
}