import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "./redux/store/index.js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
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

const AuthStack = createStackNavigator();
const AppStack = createStackNavigator();

function AppNavigator() {
  // I will likely need to pass a prop into this function; it would be the username of the person logged in or signed up.
  // const [user, setUser] = useState(null);
  // const [isSignedIn, setIsSignedIn] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // The code below is my app, without Redux in it.  This is what I'm changing... I want Redux in this app!
  // async function retrieveUserSession() {
  //   try {
  //     const theToken = await AsyncStorage.getItem("token");
  //     console.log(`theToken: ${theToken}`);
  //     if (theToken !== (undefined || null)) {
  //       const response = await ReadPrayerList.get("prayerlists", {
  //         headers: {
  //           Authorization: `Bearer ${theToken}`,
  //         },
  //       });
  //       if (
  //         response ==
  //         "Request error: [AxiosError: Request failed with status code 401]"
  //       ) {
  //         console.log(response);
  //         console.log("Likely an invalid token!");
  //         setIsSignedIn(false);
  //       } else {
  //         // Congrats! You've just retrieved your first value!
  //         console.log("Congrats!");
  //         setIsSignedIn(true);
  //       }
  //     } else {
  //       console.log("undefined or null");
  //       setIsSignedIn(false);
  //     }
  //   } catch (error) {
  //     // There was an error on the native side
  //     console.log(`There's an error.`);
  //     console.log(error.message);
  //   }
  // }

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <AppStack.Navigator>
          <AppStack.Screen name="HomeScreen" component={HomeScreen} />
          <AppStack.Screen name="PrayerList" component={DisplayPrayerList} />
          <AppStack.Screen name="Acts" component={ActsScreen} />
          <AppStack.Screen name="Identity" component={IdentityScreen} />
          <AppStack.Screen name="Unreached" component={UnreachedScreen} />
          <AppStack.Screen name="CreateNewPrayer" component={CreateNewPrayer} />
          <AppStack.Screen name="EditPrayerList" component={EditPrayerList} />
        </AppStack.Navigator>
      ) : (
        <AuthStack.Navigator>
          <AuthStack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default AppNavigator;
