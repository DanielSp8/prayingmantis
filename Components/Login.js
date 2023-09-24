import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  Pressable,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import ReadPrayerList from "../src/api/ReadPrayerList";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  signIn = async () => {
    setLoading(true);
    try {
      //In this function, I need to login a user, etc.
      //I'll need to verify if the username exists already.
      const loginResponse = await ReadPrayerList.post("/users/login", {
        username: username,
        password: password,
      });

      if ((loginResponse.data.status = "You are successfully logged in!")) {
        return loginResponse.data.token;
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
