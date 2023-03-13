import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Identity from "./Components/Identity";
import Unreached from "./Components/Unreached";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.menuText}>
      <Text>Home Screen</Text>
      <Button
        title="Identity in Christ"
        onPress={() => navigation.navigate("Identity")}
      />
      <Button
        title="Unreached of the Day"
        onPress={() => navigation.navigate("Unreached")}
      />
    </View>
  );
};

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Identity" component={Identity} />
        <Stack.Screen name="Unreached" component={Unreached} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  menuText: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
