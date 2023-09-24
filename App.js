import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
} from "react-native";
import { Card } from "@rneui/themed";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Animatable from "react-native-animatable";
import ReadPrayerList from "./src/api/ReadPrayerList";

import Login from "./Components/Login";
import PrayerListScreen from "./Components/PrayerListScreen";
import ActsScreen from "./Components/ActsScreen";
import IdentityScreen from "./Components/IdentityScreen";
import UnreachedScreen from "./Components/UnreachedScreen";
import CreateNewPrayer from "./Components/PrayerItems/CreateNewPrayer";
import EditPrayerList from "./Components/PrayerItems/EditPrayerList";
import RandomBackImage from "./docs/BackgroundMantisImages";

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
        <View style={styles.stylingButtonGroup}>
          <Pressable
            style={styles.eachButton}
            onPress={() => navigation.navigate("PrayerList")}
          >
            <Text style={styles.text}>Prayer List</Text>
          </Pressable>
        </View>
        <View style={styles.stylingButtonGroup}>
          <Pressable
            style={styles.eachButton}
            onPress={() => navigation.navigate("Acts")}
          >
            <Text style={styles.text}>ACTS: Prayer Model</Text>
          </Pressable>
        </View>
        <View style={styles.stylingButtonGroup}>
          <Pressable
            style={styles.eachButton}
            onPress={() => navigation.navigate("Identity")}
          >
            <Text style={styles.text}>Identity: Who are you?</Text>
          </Pressable>
        </View>
        <View style={styles.stylingButtonGroup}>
          <Pressable
            style={styles.eachButton}
            onPress={() => navigation.navigate("Unreached")}
          >
            <Text style={styles.text}>Unreached of the Day</Text>
          </Pressable>
        </View>
      </View>

      <Card>
        <Card.Title>Prayer List: Other Options</Card.Title>
        <View>
          <Pressable
            style={styles.bottomMenuButtons}
            onPress={() => navigation.navigate("CreateNewPrayer")}
          >
            <Text>Add a Prayer</Text>
          </Pressable>
          <Pressable
            style={styles.bottomMenuButtons}
            onPress={() => navigation.navigate("EditPrayerList")}
          >
            <Text>Edit Prayer List</Text>
          </Pressable>
        </View>
      </Card>
    </ImageBackground>
  );
};

const Stack = createNativeStackNavigator();

function App() {
  // I will likely need to pass a prop into this function; it would be the username of the person logged in or signed up.
  const [user, setUser] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    async function getIsSignedIn() {
      // Write logic here for checking for a session token, etc.
      // If there's a session, setIsSignedIn = true;
    }
    getIsSignedIn();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isSignedIn ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="PrayerList" component={PrayerListScreen} />
            <Stack.Screen name="Acts" component={ActsScreen} />
            <Stack.Screen name="Identity" component={IdentityScreen} />
            <Stack.Screen name="Unreached" component={UnreachedScreen} />
            <Stack.Screen name="CreateNewPrayer" component={CreateNewPrayer} />
            <Stack.Screen name="EditPrayerList" component={EditPrayerList} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
          </>
        )}
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
  stylingButtonGroup: {
    marginVertical: 15,
  },
  bottomMenuButtons: {
    alignItems: "center",
    Top: 15,
    paddingVertical: 7,
    paddingHorizontal: 8,
    borderRadius: 7,
    elevation: 3,
    backgroundColor: "gray",
    padding: 5,
  },
});

export default App;
