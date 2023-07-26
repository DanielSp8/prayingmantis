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
      prayerRequests: ["prayer requests", "listed here"],
    };

    this.getPrayerListData = this.getPrayerListData.bind(this);
  }

  getPrayerListData = async () => {
    const response = await ReadPrayerList.get("/prayerlists");

    var prayerListInfo = response.data[0];
    console.log(prayerListInfo);

    this.setState({
      prayerRequests: prayerListInfo.prayerRequests,
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
            <Text style={styles.userText}>{this.state.userName}</Text>
            <Text style={styles.prayerListText}>
              {this.state.prayerRequests}
            </Text>
          </View>
        </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  prayerListText: {
    color: "blue",
    fontSize: 26,
  },
});

export default PrayerListReadScreen;
