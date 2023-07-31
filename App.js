import React from "react";
import { View, Text, StyleSheet, Button, ImageBackground } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Animatable from "react-native-animatable";
import PrayerListReadScreen from "./Components/PrayerListReadScreen";
// import PrayerListScreen from "./Components/PrayerListScreen";
import ActsScreen from "./Components/ActsScreen";
import IdentityScreen from "./Components/IdentityScreen";
import UnreachedScreen from "./Components/UnreachedScreen";
import RandomBackImage from "./docs/BackgroundImage";

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
          title="Prayer List"
          onPress={() => navigation.navigate("PrayerList")}
        />
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
        <Stack.Screen name="PrayerList" component={PrayerListReadScreen} />
        <Stack.Screen name="Acts" component={ActsScreen} />
        <Stack.Screen name="Identity" component={IdentityScreen} />
        <Stack.Screen name="Unreached" component={UnreachedScreen} />
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
