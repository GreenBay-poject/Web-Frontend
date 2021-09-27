import { postRequest, getRequest } from "./utils";

const BASE_URL = "report";

export const getReport = (data) => postRequest(`${BASE_URL}/generate_land_report`, data);

export const getDates = (data) => getRequest(`${BASE_URL}/get_dates?lattitude=${data.lat}&longitude=${data.lon}`);

export const getImage = (data) =>  getRequest(`${BASE_URL}/get_image?lattitude=${data.lat}&longitude=${data.lon}&date=${data.date}`);