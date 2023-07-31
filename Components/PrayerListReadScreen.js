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
      onNumOfPrayerRequests: 0,
      currentPrayerRequestNum: 0,
    };

    this.getPrayerListData = this.getPrayerListData.bind(this);
    this.getPrayersToDisplay = this.getPrayersToDisplay.bind(this);
    this.skipToTheNextPrayerRequest =
      this.skipToTheNextPrayerRequest.bind(this);
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

    let prayerRequestsNum = prayerListInfo.prayerRequests.length;

    let prayerInfo =
      prayerListInfo.prayerRequests[this.state.currentPrayerRequestNum];
    let prayerThemeInfo = prayerInfo.splice(0, 1);

    this.setState({
      prayerTheme: prayerThemeInfo,
      prayerList: prayerInfo,
      onNumOfPrayerRequests: prayerRequestsNum,
      currentPrayerRequestNum: this.state.currentPrayerRequestNum + 1,
    });
  };

  skipToTheNextPrayerRequest = () => {
    if (
      this.state.onNumOfPrayerRequests == this.state.currentPrayerRequestNum
    ) {
      console.log(
        `You've prayed through the prayer requests... {$this.state.onNumOfPrayerRequests}`
      );
    } else if (
      this.state.onNumOfPrayerRequests > this.state.currentPrayerRequestNum
    ) {
      this.setState({
        onNumOfPrayerRequests: this.state.onNumOfPrayerRequests + 1,
      });
      this.getPrayerListData();
    }
  };

  componentDidMount() {
    this.getPrayerListData();
  }

  render() {
    return (
      <ScrollView>
        <Card>
          <View>
            <Text style={styles.textHeading}>
              Person to pray for: {this.state.prayerTheme}
            </Text>
            {this.getPrayersToDisplay(this.state.prayerList)}
          </View>
          <Button
            title="Next Prayer Request"
            onPress={this.skipToTheNextPrayerRequest}
          />
        </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  textHeading: {
    color: "black",
    fontSize: 20,
    textAlign: "center",
  },
  prayerListTextHeading: {
    color: "green",
    fontSize: 18,
    textAlign: "center",
  },
  prayerListText: {
    color: "blue",
    fontSize: 15,
  },
});

export default PrayerListReadScreen;
