import React from "react";
import { View, StyleSheet, Text } from "react-native";

const SignupScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  signupPress = async () => {
    console.log("This is when the info is entered.");
  };

  return (
    <View>
      <Text>New User Sign Up</Text>
      <Text>Enter User Name:</Text>
      <TextInput style={styles.input} onChangeText={setUsername} />
      <Text>Enter a Password:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
      />
      <Button title="Sign Up" onPress={() => signupPress} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default SignupScreen;
