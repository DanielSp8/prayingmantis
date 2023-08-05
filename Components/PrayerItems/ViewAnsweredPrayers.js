import React, { Component } from "react";
import { useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  ImageBackground,
  Pressable,
  Text,
  SafeAreaView,
} from "react-native";
import WrappedText from "react-native-wrapped-text";
import { Card } from "@rneui/themed";
import axios from "axios";
import ReadPrayerList from "../../src/api/ReadPrayerList";
import RandomBackgroundNatureImage from "../../docs/BackgroundNatureImages02";

class ViewAnsweredPrayers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answeredPrayers: [],
    };

    this.getAnsweredPrayersToDisplay =
      this.getAnsweredPrayersToDisplay.bind(this);
    this.getPrayerListData = this.getPrayerListData.bind(this);
  }

  getAnsweredPrayersToDisplay = (array) => {
    var i = 1;

    return array.map((element) => {
      return (
        <View key={i++}>
          <WrappedText style={styles.prayerListText}>{element}</WrappedText>
        </View>
      );
    });
  };

  getPrayerListData = async () => {
    const response = await ReadPrayerList.get("/prayerlists");

    let answeredPrayerListInfo = response.data[0];

    if (answeredPrayerListInfo.answeredPrayerRequests) {
      this.setState({
        answeredPrayers: answeredPrayerListInfo.answeredPrayerRequests,
      });
    } else {
      this.setState({
        answeredPrayers: [
          "Keep praying!  God hears you!  He will answer you!  Persevere!",
        ],
      });
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
        <SafeAreaView>
          <View>
            <Card>
              <View>
                <Text style={styles.textHeading}>Answered Prayers:</Text>
                {/* <WrappedText> */}
                {this.getAnsweredPrayersToDisplay(this.state.answeredPrayers)}
                {/* </WrappedText> */}
              </View>
            </Card>
          </View>
        </SafeAreaView>
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
  textHeading: {
    fontSize: 16,
    fontWeight: "bold",
  },
  containerForText: {
    // flexDirection: "column",
    // flex: 0.8,
  },
  prayerListText: {
    color: "black",
    fontSize: 13,
    textAlign: "center",
    flex: 1,
    flexWrap: "wrap",
  },
});

export default ViewAnsweredPrayers;
