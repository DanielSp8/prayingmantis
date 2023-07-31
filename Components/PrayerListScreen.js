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

const PrayerListScreen = () => {
  const [prayerTheme, setPrayerTheme] = "";
  const [prayerList, setPrayerList] = [];
  const [numOfPrayerRequests, setNumOfPrayerRequests] = 0;
  const [currentPrayerRequestNum, setCurrentPrayerRequestNum] = 0;

  const isLeftSwipe = ({ dx }) => dx < -200;
  const isRightSwipe = ({ dx }) => dx > 200;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderEnd: (e, gestureState) => {
      // console.log("pan responder end", gestureState);
      if (isLeftSwipe(gestureState)) {
        skipToTheNextPrayerRequest();
      } else if (isRightSwipe(gestureState)) {
        skipToThePreviousPrayerRequest();
      }
    },
  });

  getPrayersToDisplay = (prayerList) => {
    var i = 1;

    return array.map((element) => {
      return (
        <View key={i++}>
          <Text style={styles.prayerListText}>{element}</Text>
        </View>
      );
    });
  };

  const getPrayerListData = async () => {
    const response = await ReadPrayerList.get("/prayerlists");

    let prayerListInfo = response.data[0];

    let prayerRequestsNum = prayerListInfo.prayerRequests.length - 1;

    let prayerInfo = prayerListInfo.prayerRequests[currentPrayerRequestNum];
    let prayerThemeInfo = prayerInfo.splice(0, 1);

    setPrayerTheme(prayerThemeInfo);
    setPrayerList(prayerInfo);
    setNumOfPrayerRequests(prayerRequestsNum);
  };

  skipToTheNextPrayerRequest = () => {
    if (numOfPrayerRequests > currentPrayerRequestNum) {
      setCurrentPrayerRequestNum(currentPrayerRequestNum + 1);
      getPrayerListData();
    } else {
      console.log(
        `You've prayed through the prayer requests... ${currentPrayerRequestNum}`
      );
    }
  };

  skipToThePreviousPrayerRequest = () => {
    if (currentPrayerRequestNum > 0) {
      setCurrentPrayerRequestNum(currentPrayerRequestNum - 1);
      getPrayerListData();
    } else {
      console.log(
        `You're at the beginning of your prayer requests: ${currentPrayerRequestNum}`
      );
    }
  };

  return (
    <ScrollView>
      <Card>
        <View {...panResponder.panHandlers}>
          <Text style={styles.textHeading}>
            Person to pray for: {prayerTheme}
          </Text>
          {getPrayersToDisplay}
        </View>
        <Button
          title="Next Prayer Request"
          onPress={skipToTheNextPrayerRequest}
        />
        <Button
          title="Previous Prayer Request"
          onPress={skipToThePreviousPrayerRequest}
        />
      </Card>
    </ScrollView>
  );
};

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

export default PrayerListScreen;
