import React from "react";
import { useState } from "react";
import { View, StyleSheet, PanResponder, ImageBackground } from "react-native";
import { Card, Text } from "@rneui/themed";
import { IdentityData } from "../docs/IdentityData";
import { IdentityExplained } from "../docs/IdentityExplained";
import { BackgroundNatureImages } from "../docs/BackgroundNatureImages";

const IdentityScreen = () => {
  const [id, setId] = useState(0);

  const isLeftSwipe = ({ dx }) => dx < -200;
  const isRightSwipe = ({ dx }) => dx > 200;

  const RandomBackgroundNatureImage =
    BackgroundNatureImages[
      Math.floor(Math.random() * BackgroundNatureImages.length - 1) + 1
    ];

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
    <ImageBackground
      source={RandomBackgroundNatureImage}
      style={styles.backgroundImage}
    >
      <View {...panResponder.panHandlers}>
        <Card style={styles.explanationCard}>
          <Text style={styles.explanationText}>{IdentityExplained}</Text>
        </Card>
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
        <Text style={styles.swipeComment}>
          Swipe left or right on the above card to view a different one.
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    opacity: 0.85,
  },
  explanationCard: {
    padding: 0,
    justifyContent: "space-evenly",
  },
  explanationText: {
    fontSize: 16,
  },
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
  swipeComment: {
    textAlign: "center",
    fontSize: 12,
    backgroundColor: "black",
    color: "white",
  },
});

export default IdentityScreen;
