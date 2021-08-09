import { postRequest } from "./utils";

const BASE_URL = "auth";

export const register = (data) => postRequest(`${BASE_URL}/register`, data);

export const login = (data) => postRequest(`${BASE_URL}/login`, data);

// export const resetPassword = (data) =>
// 	postRequest(`${BASE_URL}/reset-password`, data);