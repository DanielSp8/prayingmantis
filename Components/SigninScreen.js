import React, { useState } from "react";
import { View, StyleSheet, Text, Button } from "react-native";

const SigninScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  signupPress = async () => {
    console.log("This is when the info is entered.");
  };

  return (
    <View>
      <Text>User Name:</Text>
      <TextInput style={styles.input} onChangeText={setEmail} />
      <Text>Password</Text>
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

export default SigninScreen;
