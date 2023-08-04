import React, { Component } from "react";
import { createAppContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/native-stack";
import PrayerListScreen from "../Components/PrayerListScreen";
import CreateNewPrayer from "../Components/PrayerItems/CreateNewPrayer";
import EditPrayerList from "../Components/PrayerItems/EditPrayerList";
import LogAnAnsweredPrayer from "../Components/PrayerItems/LogAnAnsweredPrayer";
import ViewAnsweredPrayers from "../Components/PrayerItems/ViewAnsweredPrayers";

class Stack extends Component {
  render() {
    return <AppContainer />;
  }
}

const menuStack = createStackNavigator(
  {
    PrayerListScreen: PrayerListScreen,
    CreateNewPrayer: CreateNewPrayer,
    EditPrayerList: EditPrayerList,
    LogAnAnsweredPrayer: LogAnAnsweredPrayer,
    ViewAnsweredPrayers: ViewAnsweredPrayers,
  },
  {
    initialRouteName: "PrayerListScreen",
  }
);

const AppContainer = createAppContainer(menuStack);

export default Stack;
