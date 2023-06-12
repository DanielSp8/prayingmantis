import React from "react";
import { useState } from "react";
import { View, StyleSheet, PanResponder, Button } from "react-native";
import { Card, Text } from "@rneui/themed";
import { AdorationData } from "../data/AdorationData";
import { ConfessionData } from "../data/ConfessionData";
import { ThanksgivingData } from "../data/ThanksgivingData";
import { SupplicationData } from "../data/SupplicationData";

const ActsScreen = () => {
  const actsData = [
    AdorationData,
    ConfessionData,
    ThanksgivingData,
    SupplicationData,
  ];

  const [array, setArray] = useState(0);
  const [id, setId] = useState(0);
  const [theme, setTheme] = useState("Adoration");

  const isLeftSwipe = ({ dx }) => dx < -200;
  const isRightSwipe = ({ dx }) => dx > 200;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderEnd: (e, gestureState) => {
      // console.log("pan responder end", gestureState);
      if (isLeftSwipe(gestureState)) {
        selectThemeForward();
      } else if (isRightSwipe(gestureState)) {
        selectThemeBackward();
      }
    },
  });

  const selectThemeForward = () => {
    switch (array) {
      case 0:
        setArray(1);
        setTheme("Confession");
        break;
      case 1:
        setArray(2);
        setTheme("Thanksgiving");
        break;
      case 2:
        setArray(3);
        setTheme("Supplication");
        break;
      case 3:
        setArray(0);
        setTheme("Adoration");
        break;
      default:
        console.log("Default case...");
    }
    let randomNumber = randomUpId();
    console.log(`randomNumber: ${randomNumber}`);
    setId(randomNumber);
  };

  const selectThemeBackward = () => {
    switch (array) {
      case 0:
        setArray(3);
        setTheme("Supplication");
        break;
      case 1:
        setArray(0);
        setTheme("Adoration");
        break;
      case 2:
        setArray(1);
        setTheme("Confession");
        break;
      case 3:
        setArray(2);
        setTheme("Thanksgiving");
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
    let randomNum = Math.floor(Math.random() * actsData[array].length - 1) + 1;
    console.log(`actsData[array]: ${array}`);
    console.log(`actsData[array].length - 1 = ${actsData[array].length - 1}`);
    console.log(randomNum);
    return randomNum;
  };

  return (
    <View {...panResponder.panHandlers}>
      <Card style={styles.cardItself}>
        <Card.Title style={styles.cardTitle}>{theme}</Card.Title>
        <Text style={styles.cardVerse}>{actsData[array][id].verse}</Text>
        <Text style={styles.cardAddress}>{actsData[array][id].address}</Text>
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
