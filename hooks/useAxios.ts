import axios from "axios";
// import { API_URL } from "./useEnv";

export const useAxios = () =>
  axios.create({
    baseURL: "http://3.125.43.204:7777/v1",
  });
