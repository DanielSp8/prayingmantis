import axios from "axios";

const location = "http://localhost:3000";

export default axios.create({
  baseURL: location,
  headers: {
    dataType: "json",
  },
});
