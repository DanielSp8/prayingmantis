import axios from "axios";
import * as SecureStore from "expo-secure-store";

// const location = "http://192.168.1.184:3000";

const location = "http://192.168.1.16:3000";

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
