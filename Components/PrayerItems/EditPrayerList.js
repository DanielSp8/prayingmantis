import React, { Component } from "react";
import { useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  ImageBackground,
  Pressable,
  TextInput,
} from "react-native";
import { Card, Text } from "@rneui/themed";
import WrappedText from "react-native-wrapped-text";
import axios from "axios";
import ReadPrayerList from "../../src/api/ReadPrayerList";
import RandomBackgroundNatureImage from "../../docs/BackgroundNatureImages02";

class EditPrayerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prayerList: [],
      numOfPrayerRequests: 0,
      prayerInputsDisplaying: "",
    };

    this.getPrayerListData = this.getPrayerListData.bind(this);
    this.getPrayersToDisplay = this.getPrayersToDisplay.bind(this);
  }

  getPrayersToDisplay = (array) => {
    var i = 1;

    return array.map((element) => {
      return (
        <View key={i++}>
          <TextInput style={styles.prayerInputBox}>{element}</TextInput>
        </View>
      );
    });
  };

  getPrayerListData = async () => {
    const response = await ReadPrayerList.get("/prayerlists");

    let prayerInputsToDisplay = "";
    let prayerListInfo = response.data[0];
    let prayerRequestsNum = prayerListInfo.prayerRequests.length - 1;

    this.setState({
      prayerList: prayerListInfo.prayerRequests,
      numOfPrayerRequests: prayerRequestsNum,
    });

    // for (let i = 0; i < this.state.numOfPrayerRequests; i++) {
    //   prayerInputsToDisplay = prayerInputsToDisplay + this.getPrayerListData(i);
    // }

    //Goal:  Find out the array I want to pass into the getPrayersToDisplay function.
    console.log(`this.state.prayerList: ${this.state.prayerList}`);

    // prayerInputsToDisplay = this.getPrayerListData(
    //   prayerListInfo.prayerRequests[0]
    // );
    // this.setState({
    //   prayerInputsDisplaying: prayerInputsToDisplay,
    // });
    // console.log(`prayerInputsToDisplay: ${prayerInputsToDisplay}`);
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
          <WrappedText style={styles.stylingOfWrap}>
            {this.getPrayersToDisplay(this.state.prayerList)}
          </WrappedText>
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
  prayerInputBox: {
    color: "black",
    fontSize: 12,
  },
  stylingOfWrap: {
    flex: 1,
    flexWrap: "wrap",
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

export default EditPrayerList;
