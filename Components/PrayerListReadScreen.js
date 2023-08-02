import React, { Component } from "react";
import { useState } from "react";
import {
  View,
  StyleSheet,
  PanResponder,
  Button,
  ScrollView,
} from "react-native";
import { Card, Text } from "@rneui/themed";
import axios from "axios";
import ReadPrayerList from "../src/api/ReadPrayerList";

class PrayerListReadScreen extends Component {
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

    let prayerInfo =
      prayerListInfo.prayerRequests[this.state.currentPrayerRequestNum];
    let prayerThemeInfo = prayerInfo.splice(0, 1);

    this.setState({
      prayerTheme: prayerThemeInfo,
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
    } else {
      console.log(
        `You've prayed through the prayer requests... ${this.state.currentPrayerRequestNum}`
      );
    }
  };

  skipToThePreviousPrayerRequest = () => {
    if (this.state.currentPrayerRequestNum > 0) {
      this.setState({
        currentPrayerRequestNum: this.state.currentPrayerRequestNum - 1,
      });
      this.getPrayerListData();
    } else {
      console.log(
        `You're at the beginning of your prayer requests: ${this.state.currentPrayerRequestNum}`
      );
    }
  };

  componentDidMount() {
    this.getPrayerListData();
  }

  render() {
    return (
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
            <Button
              title="Previous"
              onPress={this.skipToThePreviousPrayerRequest}
            />
            <Button title="Next" onPress={this.skipToTheNextPrayerRequest} />
          </View>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
});

export default PrayerListReadScreen;
