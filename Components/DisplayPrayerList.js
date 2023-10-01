import React, { Component } from "react";
import { View, StyleSheet, ImageBackground, Pressable } from "react-native";
import { Card, Text } from "@rneui/themed";
import ReadPrayerList from "../src/api/ReadPrayerList";
import RandomBackgroundNatureImage from "../docs/BackgroundNatureImages02";
import AsyncStorage from "@react-native-async-storage/async-storage";

class DisplayPrayerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prayerList: [],
      numOfPrayerRequests: 0,
      currentPrayerRequestNum: 0,
    };

    this.getToken = this.getToken.bind(this);
    this.getPrayerListData = this.getPrayerListData.bind(this);
    this.getPrayersToDisplay = this.getPrayersToDisplay.bind(this);
    this.skipToTheNextPrayerRequest =
      this.skipToTheNextPrayerRequest.bind(this);
    this.skipToThePreviousPrayerRequest =
      this.skipToThePreviousPrayerRequest.bind(this);
  }

  getToken = async () => {
    try {
      const jwtToken = await AsyncStorage.getItem("token");
      return jwtToken;
    } catch (error) {
      console.error("Error getting token:", error);
      return null;
    }
  };

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
    try {
      const token = await this.getToken();
      if (token) {
        const response = await ReadPrayerList.get(`prayerlists`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        let prayerList = response.data[0].prayerRequests;
        let prayerRequestsNum = prayerList.length - 1;
        let prayerRequests = [];

        if (prayerRequestsNum < 0) {
          thePrayerTheme = "No Prayer Requests Stored Yet";
          prayerRequests = [
            "Go back to the main menu",
            "then add some prayer requests!",
          ];
        } else {
          prayerRequests = prayerList[this.state.currentPrayerRequestNum];

          this.setState({
            prayerList: prayerRequests,
            numOfPrayerRequests: prayerRequestsNum,
          });
        }
      } else {
        // Handle the case where there's no token (user not authenticated)
        console.log("User is not authenticated");
      }
    } catch (error) {
      // Handle request errors or authentication failures
      console.error("Request error:", error);
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
            <View>{this.getPrayersToDisplay(this.state.prayerList)}</View>
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
  prayerListText: {
    color: "black",
    fontSize: 20,
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

export default DisplayPrayerList;
