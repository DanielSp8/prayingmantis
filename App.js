import React from "react";
import { View, Text, StyleSheet, Button, ImageBackground } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ActsScreen from "./Components/ActsScreen";
import Identity from "./Components/Identity";
import Unreached from "./Components/Unreached";
import RandomBackImage from "./data/BackgroundImage";

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground source={RandomBackImage} style={styles.backgroundImage}>
      <View style={styles.menuText}>
        <Text>Home Screen</Text>
        <Button
          title="ACTS: Prayer Acronym"
          onPress={() => navigation.navigate("Acts")}
        />
        <Button
          title="Identity in Christ"
          onPress={() => navigation.navigate("Identity")}
        />
        <Button
          title="Unreached of the Day"
          onPress={() => navigation.navigate("Unreached")}
        />
      </View>
    </ImageBackground>
  );
};

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Acts" component={ActsScreen} />
        <Stack.Screen name="Identity" component={Identity} />
        <Stack.Screen name="Unreached" component={Unreached} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.7,
  },
  menuText: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
