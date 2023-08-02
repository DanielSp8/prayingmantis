import axios from "axios";

const location = "http://192.168.1.184:3000";

export default axios.create({
  baseURL: location,
  headers: {
    dataType: "application/json",
  },
});
