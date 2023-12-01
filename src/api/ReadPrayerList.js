import axios from "axios";

const location = "https://prayingmantisserver-26146efa45c9.herokuapp.com/";

export default axios.create({
  baseURL: location,
  headers: {
    dataType: "application/json",
  },
});
