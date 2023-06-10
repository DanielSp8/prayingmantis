import React from "react";
import { useState } from "react";
import { View, StyleSheet, PanResponder } from "react-native";
import { Card, Text } from "@rneui/themed";
import { IdentityData } from "../data/IdentityData";

const Identity = () => {
  const [id, setId] = useState(0);

  const isLeftSwipe = ({ dx }) => dx < -200;
  const isRightSwipe = ({ dx }) => dx > 200;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderEnd: (e, gestureState) => {
      // console.log("pan responder end", gestureState);
      if (isLeftSwipe(gestureState)) {
        advanceId();
      } else if (isRightSwipe(gestureState)) {
        prevId();
      }
    },
  });

  const advanceId = () => {
    if (id === IdentityData.length - 1) {
      setId(0);
    } else {
      setId(id + 1);
    }
  };

  const prevId = () => {
    if (id === 0) {
      setId(IdentityData.length - 1);
    } else {
      setId(id - 1);
    }
  };

  return (
    <View {...panResponder.panHandlers}>
      <Card style={styles.cardItself}>
        <Card.Title style={styles.cardTitle}>
          {IdentityData[id].theme}
        </Card.Title>
        <Text style={styles.cardAffirmation}>
          {IdentityData[id].affirmation}
        </Text>
        <Text style={styles.cardVerse}>{IdentityData[id].verse}</Text>
        <Text style={styles.cardAddress}>{IdentityData[id].address}</Text>
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

export default Identity;
