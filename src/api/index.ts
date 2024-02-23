import axios from "axios";

const instance = axios.create({
  baseURL: "/public/",
  timeout: 1000,
});

export default instance;
