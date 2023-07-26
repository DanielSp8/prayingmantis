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
      userName: "",
      prayerRequests: ["prayer requests", "listed here"],
    };

    this.getPrayerListData = this.getPrayerListData.bind(this);
  }

  getPrayerListData = async () => {
    axios
      .get("http://192.168.1.184:3000/prayerlists")
      .then((response) => {
        //test this data out.
        console.log(response.data);
        console.log(
          `response.data.prayerRequests: ${response.data.prayerRequests}`
        );
        this.setState({
          userName: response.data.user,
          prayerRequests: response.data.prayerRequests,
        });
        console.log(`this.userName: ${this.userName}`);
        console.log(`this.prayerRequests: ${this.prayerRequests}`);
      })
      .catch((error) => {
        console.error(error);
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
  userText: {
    color: "black",
    fontSize: 24,
  },
  prayerListText: {
    color: "blue",
    fontSize: 26,
  },
});

export default PrayerListReadScreen;
