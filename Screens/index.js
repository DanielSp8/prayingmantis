import React from "react";
import Screen from "./Screen";

// export const ProfileScreen = ({navigation}) => <Screen navigation={navigation} name="Home" />
export const PrayerListReadScreen = ({ navigation }) => (
  <Screen navigation={navigation} name="PrayerList" />
);
export const ActsScreen = ({ navigation }) => (
  <Screen navigation={navigation} name="Acts" />
);
export const IdentityScreen = ({ navigation }) => (
  <Screen navigation={navigation} name="Identity" />
);
export const UnreachedScreen = ({ navigation }) => (
  <Screen navigation={navigation} name="Unreached" />
);
