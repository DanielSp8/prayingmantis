import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Pressable,
  Alert,
} from "react-native";
import { Card, Text } from "@rneui/themed";
import ReadPrayerList from "../src/api/ReadPrayerList";
import RandomBackgroundNatureImage from "../docs/BackgroundNatureImages02";
import * as SecureStore from "expo-secure-store";

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
      const jwtToken = await SecureStore.getItemAsync("userToken");
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

        let prayerList = response.data.prayerRequests;
        let prayerRequestsNum = prayerList.length - 1;
        let prayerRequests = [];

        if (prayerRequestsNum < 0) {
          prayerRequests = [
            "No Prayer Requests Stored Yet",
            "Go back to the main menu",
            "then add some prayer requests!",
          ];
          this.setState({ prayerList: prayerRequests });
        } else {
          prayerRequests = prayerList[this.state.currentPrayerRequestNum];

          this.setState({
            prayerList: prayerRequests,
            numOfPrayerRequests: prayerRequestsNum,
          });
        }
      } else {
        Alert.alert("User is not authenticated");
      }
    } catch (error) {
      Alert.alert("Request error: ", error);
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
