import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
} from "react-native";
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
      <View style={styles.menuLayout}>
        <Pressable
          style={styles.eachButton}
          onPress={() => navigation.navigate("PrayerList")}
        >
          <Text style={styles.text}>Prayer List</Text>
        </Pressable>
        <Pressable
          style={styles.eachButton}
          onPress={() => navigation.navigate("Acts")}
        >
          <Text style={styles.text}>ACTS: Prayer Model</Text>
        </Pressable>
        <Pressable
          style={styles.eachButton}
          onPress={() => navigation.navigate("Identity")}
        >
          <Text style={styles.text}>Identity: Who are you?</Text>
        </Pressable>
        <Pressable
          style={styles.eachButton}
          onPress={() => navigation.navigate("Unreached")}
        >
          <Text style={styles.text}>Unreached of the Day</Text>
        </Pressable>
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
    width: "100%",
    height: "100%",
    alignItems: "center",
    opacity: 0.7,
  },
  prayingMantisTitle: {
    fontSize: 45,
    paddingTop: 25,
    fontWeight: "bold",
  },
  menuLayout: {
    paddingTop: 100,
  },
  eachButton: {
    alignItems: "center",
    Top: 20,
    paddingVertical: 13,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 0.5,
  },
});

export default App;
