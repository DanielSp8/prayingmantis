import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ReadPrayerList from "../src/api/ReadPrayerList";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const moveTo = (screen) => {
    navigation.navigate(screen);
  };

  async function storeData(token) {
    try {
      console.log(`token: ${token}`);
      await AsyncStorage.setItem("token", token);
    } catch (error) {
      console.log(error.message);
    }
  }

  signIn = async () => {
    setLoading(true);
    try {
      //In this function, I need to login a user, etc.
      const loginResponse = await ReadPrayerList.post("/users/login", {
        username: username,
        password: password,
      });

      if ((loginResponse.data.status = "You are successfully logged in!")) {
        const grabbedToken = loginResponse.data.token;
        console.log(loginResponse.data.status);
        // console.log(grabbedToken);
        // setToken(grabbedToken);
        // console.log(token);
        storeData(grabbedToken);
        console.log("attempting to move to home...");
        navigation.navigate("HomeScreen");
      }
      console.log(loginResponse.data);
    } catch (error) {
      console.log(error);
      alert("Sign in failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  signUp = async () => {};

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <TextInput
          value={username}
          style={styles.input}
          placeholder="username"
          autoCapitalize="none"
          onChangeText={setUsername}
        />
        <TextInput
          secureTextEntry={true}
          value={password}
          style={styles.input}
          onChangeText={setPassword}
          placeholder="password"
        />

        {loading ? (
          <ActivityIndicator size="large" color="#000ff" />
        ) : (
          <>
            <Pressable onPress={signIn}>
              <Text style={styles.buttons}>Login</Text>
            </Pressable>

            <Pressable onPress={signUp}>
              <Text style={styles.buttons}>Create account</Text>
            </Pressable>
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: "center",
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
  buttons: {
    fontSize: 16,
    color: "blue",
    marginVertical: 3,
    height: 35,
    alignSelf: "center",
  },
});

export default Login;
