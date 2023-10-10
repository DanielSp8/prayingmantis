import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ReadPrayerList from "./src/api/ReadPrayerList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreen from "./Components/HomeScreen";
import Login from "./Components/Login";
import DisplayPrayerList from "./Components/DisplayPrayerList";
import ActsScreen from "./Components/ActsScreen";
import IdentityScreen from "./Components/IdentityScreen";
import UnreachedScreen from "./Components/UnreachedScreen";
import CreateNewPrayer from "./Components/PrayerItems/CreateNewPrayer";
import EditPrayerList from "./Components/PrayerItems/EditPrayerList";

const Stack = createNativeStackNavigator();

function App({ navigation }) {
  // I will likely need to pass a prop into this function; it would be the username of the person logged in or signed up.
  const [user, setUser] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  async function retrieveUserSession() {
    try {
      const theToken = await AsyncStorage.getItem("token");
      console.log(`theToken: ${theToken}`);
      if (theToken !== (undefined || null)) {
        const response = await ReadPrayerList.get("prayerlists", {
          headers: {
            Authorization: `Bearer ${theToken}`,
          },
        });
        if (
          response ==
          "Request error: [AxiosError: Request failed with status code 401]"
        ) {
          console.log(response);
          console.log("Likely an invalid token!");
          setIsSignedIn(false);
        } else {
          // Congrats! You've just retrieved your first value!
          console.log("Congrats!");
          setIsSignedIn(true);
        }
      } else {
        console.log("undefined or null");
        setIsSignedIn(false);
      }
    } catch (error) {
      // There was an error on the native side
      console.log(`There's an error.`);
      console.log(error.message);
    }
  }

  useEffect(() => {
    async function getIsSignedIn() {
      // Write logic here for checking for a session token, etc.
      // If there's a session, setIsSignedIn = true;
      retrieveUserSession();
    }
    getIsSignedIn();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isSignedIn ? (
          <>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="PrayerList" component={DisplayPrayerList} />
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

export default App;
