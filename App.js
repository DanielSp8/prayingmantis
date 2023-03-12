import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Identity from "./Components/Identity";
import Unreached from "./Components/Unreached";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Identity" component={Identity} />
        <Stack.Screen name="Unreached" component={Unreached} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
