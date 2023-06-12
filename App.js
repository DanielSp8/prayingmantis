import React from "react";
import { View, Text, StyleSheet, Button, ImageBackground } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ActsScreen from "./Components/ActsScreen";
import * as Animatable from "react-native-animatable";
import Identity from "./Components/Identity";
import Unreached from "./Components/Unreached";
import RandomBackImage from "./data/BackgroundImage";

// const { MongoClient } = require("mongodb");

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground source={RandomBackImage} style={styles.backgroundImage}>
      <Animatable.Text
        animation="lightSpeedIn"
        style={styles.prayingMantisTitle}
      >
        Praying Mantis
      </Animatable.Text>
      <View style={styles.menuText}>
        <Animatable.Text animation="fadeInLeft">Home Screen</Animatable.Text>
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
  },
  prayingMantisTitle: {
    fontSize: 35,
  },
});

export default App;
