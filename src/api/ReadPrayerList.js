import axios from "axios";
import * as SecureStore from "expo-secure-store";

// const location = "http://192.168.1.184:3000";  //Use this location for testing purposes.

const location = "https://prayingmantisserver-26146efa45c9.herokuapp.com/";

const getToken = async () => {
  try {
    const jwtToken = await SecureStore.getItemAsync("userToken");
    return jwtToken;
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};

export default axios.create({
  baseURL: location,
  headers: {
    dataType: "application/json",
    // Authorization: `Bearer ${getToken}`,
  },
});
