import React from "react";
import { useState } from "react";
import { View } from "react-native";
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
      <Card>
        <Text>{DATA[id].theme}</Text>
        <Text>{DATA[id].affirmation}</Text>
        <Text>{DATA[id].verse}</Text>
        <Text>{DATA[id].address}</Text>
      </Card>
      <Button onPress={advanceId}>Next Truth</Button>
      <Button onPress={prevId}>Previous Truth</Button>
    </View>
  );
};

export default Identity;
