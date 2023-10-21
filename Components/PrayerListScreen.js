import React, { Component } from "react";
import { View, StyleSheet, ImageBackground, Pressable } from "react-native";
import { Card, Text } from "@rneui/themed";
import ReadPrayerList from "../src/api/ReadPrayerList";
import { RandomBackgroundNatureImage } from "../docs/BackgroundNatureImages02";
import * as SecureStore from "expo-secure-store";

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
    const userToken = await SecureStore.getItemAsync("userToken");
    console.log(`userToken: ${userToken}`);
    if (userToken) {
      const response = await ReadPrayerList.get(`prayerlists`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      // Handle the response here
      console.log("Response.data:", response.data);

      let prayerListInfo = response.data[0].prayerRequests;
      console.log(`prayerListInfo: ${prayerListInfo}`);
      let prayerRequestsNum = prayerListInfo.length - 1;
      console.log(`prayerRequestsNum: ${prayerRequestsNum}`);
      let thePrayerTheme = "";
      let prayerRequests = [];
      let prayerThemeInfo = [];

      if (prayerRequestsNum < 0) {
        thePrayerTheme = "No Prayer Requests Stored Yet";
        prayerRequests = [
          "Go back to the main menu",
          "then add some prayer requests!",
        ];
      } else {
        prayerRequests = prayerListInfo[this.state.currentPrayerRequestNum];
        console.log(`prayerRequests: ${prayerRequests}`);
        thePrayerTheme = prayerListInfo.splice(0, 1);
        console.log(`prayerThemeInfo: ${prayerThemeInfo}`);
        thePrayerTheme = thePrayerTheme.toString();
        console.log(`thePrayerTheme: ${thePrayerTheme}`);
        console.log(`prayerRequestsNum: ${prayerRequestsNum}`);

        this.setState({
          prayerTheme: thePrayerTheme,
          prayerList: prayerRequests,
          numOfPrayerRequests: prayerRequestsNum,
        });

        console.log(`this.state.prayerList: ${this.state.prayerList}`);
      }
    } else {
      // Handle the case where there's no token (user not authenticated)
      console.log("User is not authenticated");
    }
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
