import React, { useState } from "react";
import { View, StyleSheet, Text, Button } from "react-native";

const SigninScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  signinPress = async () => {
    console.log("This is when the button is clicked.");
  };

  return (
    <View>
      <Text>User Name:</Text>
      <TextInput style={styles.input} onChangeText={setUsername} />
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
      />
      <Button title="Sign In" onPress={() => signinPress} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default SigninScreen;
