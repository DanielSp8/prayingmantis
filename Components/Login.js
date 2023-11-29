import React, { useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { signIn } from "../redux/reducers/authReducer";
import * as SecureStore from "expo-secure-store";
import ReadPrayerList from "../src/api/ReadPrayerList";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const location = "http://192.168.1.184:3000";

  async function storeData(token) {
    try {
      await SecureStore.setItemAsync("userToken", token);
    } catch (error) {
      console.log(error.message);
    }
  }

  handleLogin = async () => {
    setLoading(true);
    try {
      //In this function, I need to login a user, etc.
      const response = await ReadPrayerList.post("/users/login", {
        username: username,
        password: password,
      });

      if (response.data && response.data.token) {
        storeData(response.data.token);
        dispatch(signIn(response.data.token));
        Alert.alert("Login Successful!");
      } else {
        Alert.alert("Login failed!");
      }
    } catch (error) {
      Alert.alert("An error occurred: ", error.toString());
    } finally {
      setLoading(false);
    }
  };

  const signUp = useCallback(async () => {
    setLoading(true);
    try {
      const response = await ReadPrayerList.post("/users/signup", {
        username: username,
        password: password,
      });

      if (response.status === 200) {
        const { token } = response.data;

        await SecureStore.setItemAsync("userToken", token);

        dispatch(signIn(token));
      } else {
        // Handle registration error
        console.error("Registration failed");
        Alert.alert(response.data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error.message);
    } finally {
      setLoading(false);
    }
  }, [username, password]);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <TextInput
          value={username}
          style={styles.input}
          placeholder="Username"
          autoCapitalize="none"
          onChangeText={setUsername}
        />
        <TextInput
          secureTextEntry={true}
          value={password}
          style={styles.input}
          onChangeText={setPassword}
          placeholder="Password"
        />

        {loading ? (
          <ActivityIndicator size="large" color="#000ff" />
        ) : (
          <>
            <Pressable onPress={handleLogin}>
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
