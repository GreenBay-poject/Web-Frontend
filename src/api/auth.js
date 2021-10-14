import { postRequest } from "./utils";

const BASE_URL = "auth";

export const register = (data) => postRequest(`${BASE_URL}/register`, data);

export const login = (data) => postRequest(`${BASE_URL}/login`, data);

export const getUserDetails = (data) => postRequest(`${BASE_URL}/get_user_info`, data);

export const changepassword = (data) => postRequest(`${BASE_URL}/changepassword`, data);

export const forgetPassword = (data) => postRequest(`${BASE_URL}/forget`, data);
// export const resetPassword = (data) =>
// 	postRequest(`${BASE_URL}/reset-password`, data);