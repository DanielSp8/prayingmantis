import axios from "axios";

const API_KEY = "320d35b3f1c0";

export default axios.create({
  baseURL: "https://api.joshuaproject.net",
  headers: {
    dataType: "json",
  },
  params: {
    api_key: API_KEY,
  },
});
