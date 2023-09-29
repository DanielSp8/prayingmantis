import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const location = "http://192.168.1.184:3000";

const getToken = async () => {
  try {
    const jwtToken = await AsyncStorage.getItem("token");
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
    Authorization: `Bearer ${getToken}`,
  },
});
