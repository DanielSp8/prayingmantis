import React, { Component } from "react";
import { useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  ImageBackground,
  Pressable,
} from "react-native";
import { Card, Text } from "@rneui/themed";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios from "axios";
// import ReadPrayerList from "../src/api/ReadPrayerList";
import RandomBackgroundNatureImage from "../../docs/BackgroundNatureImages02";

class ViewAnsweredPrayers extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ImageBackground
        source={RandomBackgroundNatureImage}
        style={styles.backgroundImage}
      >
        <View>
          <Text>This is a test of the View Answered Prayers Component.</Text>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    opacity: 0.85,
  },
});

export default ViewAnsweredPrayers;
