import React, { Component } from "react";
import { useState } from "react";
import { View, StyleSheet, ImageBackground, Pressable } from "react-native";
import { Card, Text } from "@rneui/themed";
import ReadPrayerList from "../src/api/ReadPrayerList";
import RandomBackgroundNatureImage from "../docs/BackgroundNatureImages02";

class PrayerListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prayerTheme: "",
      prayerList: [],
      numOfPrayerRequests: 0,
      currentPrayerRequestNum: 0,
    };

    this.getPrayerListData = this.getPrayerListData.bind(this);
    this.getPrayersToDisplay = this.getPrayersToDisplay.bind(this);
    this.skipToTheNextPrayerRequest =
      this.skipToTheNextPrayerRequest.bind(this);
    this.skipToThePreviousPrayerRequest =
      this.skipToThePreviousPrayerRequest.bind(this);
  }

  getPrayersToDisplay = (array) => {
    var i = 1;

    return array.map((element) => {
      return (
        <View key={i++}>
          <Text style={styles.prayerListText}>{element}</Text>
        </View>
      );
    });
  };

  getPrayerListData = async () => {
    const response = await ReadPrayerList.get("/prayerlists");

    let prayerListInfo = response.data[0];
    let prayerRequestsNum = prayerListInfo.prayerRequests.length - 1;
    let thePrayerTheme = "";
    let prayerInfo = [];
    let prayerThemeInfo = [];

    if (prayerRequestsNum < 0) {
      thePrayerTheme = "No Prayer Requests Stored Yet";
      prayerInfo = [
        "Go back to the main menu",
        "then add some prayer requests!",
      ];
    } else {
      prayerInfo =
        prayerListInfo.prayerRequests[this.state.currentPrayerRequestNum];
      prayerThemeInfo = prayerInfo.splice(0, 1);
      thePrayerTheme = prayerThemeInfo.toString();
    }

    this.setState({
      prayerTheme: thePrayerTheme,
      prayerList: prayerInfo,
      numOfPrayerRequests: prayerRequestsNum,
    });
  };

  skipToTheNextPrayerRequest = () => {
    if (this.state.numOfPrayerRequests > this.state.currentPrayerRequestNum) {
      this.setState({
        currentPrayerRequestNum: this.state.currentPrayerRequestNum + 1,
      });
      this.getPrayerListData();
    }
  };

  skipToThePreviousPrayerRequest = () => {
    if (this.state.currentPrayerRequestNum > 0) {
      this.setState({
        currentPrayerRequestNum: this.state.currentPrayerRequestNum - 1,
      });
      this.getPrayerListData();
    }
  };

  componentDidMount() {
    this.getPrayerListData();
  }

  render() {
    return (
      <ImageBackground
        source={RandomBackgroundNatureImage}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <Card>
            <View>
              <Text style={styles.textHeading}>
                Praying for: {this.state.prayerTheme}
              </Text>
              <Card.Divider />
              {this.getPrayersToDisplay(this.state.prayerList)}
            </View>
          </Card>

          <Card>
            <View style={styles.fixToText}>
              <Pressable
                style={styles.buttonNextAndPrev}
                onPress={this.skipToThePreviousPrayerRequest}
              >
                <Text>Previous</Text>
              </Pressable>

              <Pressable
                style={styles.buttonNextAndPrev}
                onPress={this.skipToTheNextPrayerRequest}
              >
                <Text>Next</Text>
              </Pressable>
            </View>
          </Card>
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
  container: {
    flex: 1,
    justifyContent: "center",
  },
  textHeading: {
    color: "black",
    fontSize: 20,
    textAlign: "center",
  },
  prayerListText: {
    color: "black",
    fontSize: 15,
    textAlign: "center",
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonNextAndPrev: {
    elevation: 3,
    backgroundColor: "lightblue",
    padding: 5,
    borderRadius: 7,
  },
});

export default PrayerListScreen;
