import React from "react";
import { useState } from "react";
import { View, StyleSheet, PanResponder, Button } from "react-native";
import { Card, Text } from "@rneui/themed";
import { AdorationData } from "../data/AdorationData";
import { ConfessionData } from "../data/ConfessionData";
import { ThanksgivingData } from "../data/ThanksgivingData";
import { SupplicationData } from "../data/SupplicationData";

const ActsScreen = () => {
  const [id, setId] = useState(0);
  const [data, setData] = useState(AdorationData);
  const [theme, setTheme] = useState("Adoration");
  const [verse, setVerse] = useState(AdorationData[0].verse);
  const [address, setAddress] = useState(AdorationData[0].address);

  const isLeftSwipe = ({ dx }) => dx < -200;
  const isRightSwipe = ({ dx }) => dx > 200;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderEnd: (e, gestureState) => {
      // console.log("pan responder end", gestureState);
      if (isLeftSwipe(gestureState)) {
        // selectTheme();
        selectTheme();
      } else if (isRightSwipe(gestureState)) {
        prevId();
      }
    },
  });

  const selectTheme = () => {
    switch (data) {
      case AdorationData:
        setData(ConfessionData);
        setTheme("Confession");
        break;
      case ConfessionData:
        setData(ThanksgivingData);
        setTheme("Thanksgiving");
        break;
      case ThanksgivingData:
        setData(SupplicationData);
        setTheme("Supplication");
        break;
      case SupplicationData:
        setData(AdorationData);
        setTheme("Adoration");
        break;
      default:
        console.log("Default case...");
    }
    let randomNumber = randomUpId();
    console.log(`randomNumber: ${randomNumber}`);
    setId(randomNumber);
  };

  const randomUpId = () => {
    // console.log(data);
    let randomNum = Math.floor(Math.random() * data.length - 1) + 1;
    console.log(randomNum);
    return randomNum;
  };

  return (
    <View {...panResponder.panHandlers}>
      <Card style={styles.cardItself}>
        <Card.Title style={styles.cardTitle}>{theme}</Card.Title>
        <Text style={styles.cardVerse}>{data[id].verse}</Text>
        <Text style={styles.cardAddress}>{data[id].address}</Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  cardItself: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    color: "blue",
  },
  cardAffirmation: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    color: "blue",
  },
  cardVerse: {
    fontWeight: "bold",
    textAlign: "center",
  },
  cardAddress: {
    textAlign: "right",
  },
});

export default ActsScreen;
