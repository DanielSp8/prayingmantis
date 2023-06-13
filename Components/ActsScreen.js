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

  const isLeftSwipe = ({ dx }) => dx < -200;
  const isRightSwipe = ({ dx }) => dx > 200;

  let increaseOrDecreaseArray = 0;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderEnd: (e, gestureState) => {
      if (isLeftSwipe(gestureState)) {
        increaseOrDecreaseArray = 1;
      } else if (isRightSwipe(gestureState)) {
        increaseOrDecreaseArray = -1;
      }
      newThemeChanged();
    },
  });

  const newThemeChanged = () => {
    if (array + increaseOrDecreaseArray > actsData.length - 1) {
      setArray(0);
    } else if (array + increaseOrDecreaseArray < 0) {
      setArray(3);
    } else {
      setArray(array + increaseOrDecreaseArray);
    }
    setId(randomUpId());
  };

  const randomUpId = () => {
    let randomNum = Math.floor(Math.random() * actsData[array].length - 1) + 1;
    return randomNum;
  };

  return (
    <View {...panResponder.panHandlers}>
      <Card style={styles.cardItself}>
        <Card.Title style={styles.cardTitle}>
          {actsData[array][id].theme}
        </Card.Title>
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
