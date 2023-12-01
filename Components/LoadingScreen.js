import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";
import { signInWithToken } from "../path_to_your_actions/authActions";

const LoadingScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkForToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("userToken");

        if (token) {
          dispatch(signInWithToken(token));
        } else {
          dispatch();
        }
      } catch (error) {
        console.error("Error fetching token from storage:", error);
      }
    };

    checkForToken();
  }, [dispatch]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default LoadingScreen;
