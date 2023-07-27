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
    };

    this.getPrayerListData = this.getPrayerListData.bind(this);
    this.getPrayersToDisplay = this.getPrayersToDisplay.bind(this);
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

    var prayerListInfo = response.data[0];
    console.log(prayerListInfo);

    var prayerInfo = prayerListInfo.prayerRequests[0];
    var prayerThemeInfo = prayerInfo.shift();

    this.setState({
      prayerTheme: prayerThemeInfo,
      prayerList: prayerInfo,
    });
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
