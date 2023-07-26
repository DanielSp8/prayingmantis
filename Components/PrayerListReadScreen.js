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
      prayerRequest01: "",
      prayerRequest02: "",
      prayerRequest03: "",
    };

    this.getPrayerListData = this.getPrayerListData.bind(this);
  }

  getPrayerListData = async () => {
    const response = await ReadPrayerList.get("/prayerlists");

    var prayerListInfo = response.data[0];
    console.log(prayerListInfo);

    this.setState({
      prayerTheme: prayerListInfo.prayerRequests[0],
      prayerRequest01: prayerListInfo.prayerRequests[1],
      prayerRequest02: prayerListInfo.prayerRequests[2],
      prayerRequest03: prayerListInfo.prayerRequests[3],
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
            <Text style={styles.prayerListText}>
              {this.state.prayerRequest01}
            </Text>
            <Text style={styles.prayerListText}>
              {this.state.prayerRequest02}
            </Text>
            <Text style={styles.prayerListText}>
              {this.state.prayerRequest03}
            </Text>
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
  prayerListText: {
    color: "blue",
    fontSize: 15,
  },
});

export default PrayerListReadScreen;
