import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Identity from "./Components/Identity";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Identity" component={Identity} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
