import React from "react";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, Button } from "@rneui/themed";
import { DATA } from "../data/IdentityData";

const Identity = () => {
  const [id, setId] = useState(0);
  // const [theme, setTheme] = useState(DATA[0].theme);
  // const [affirmation, setAffirmation] = useState(DATA[0].affirmation);
  // const [verse, setVerse] = useState(DATA[0].verse);
  // const [address, setAddress] = useState(DATA[0].address);

  const advanceId = () => {
    if (id === DATA.length - 1) {
      setId(0);
    } else {
      setId(id + 1);
    }
  };

  const prevId = () => {
    if (id === 0) {
      setId(DATA.length - 1);
    } else {
      setId(id - 1);
    }
  };

  return (
    <View>
      <Card style={styles.cardItself}>
        <Card.Title style={styles.cardTitle}>{DATA[id].theme}</Card.Title>
        <Text style={styles.cardAffirmation}>{DATA[id].affirmation}</Text>
        <Text style={styles.cardVerse}>{DATA[id].verse}</Text>
        <Text style={styles.cardAddress}>{DATA[id].address}</Text>
      </Card>
      <Button buttonStyle={styles.buttonAdvance} onPress={advanceId}>
        Next Truth
      </Button>
      <Button buttonStyle={styles.buttonPrev} onPress={prevId}>
        Previous Truth
      </Button>
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
  buttonAdvance: {
    marginHorizontal: 140,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 30,
    alignContent: "flex-start",
  },
  buttonPrev: {
    marginHorizontal: 125,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 30,
  },
});

export default Identity;
