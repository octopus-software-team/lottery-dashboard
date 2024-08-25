import axios from "axios";
axios.defaults.baseURL = "https://backend.jabriyacoop.pixelteckw.net/api/v1";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common.Accept = "application/json";

export const axiosInstance = axios.create();
