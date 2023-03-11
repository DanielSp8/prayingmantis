// import React from "react";
import { useState } from "react";
import { View } from "react-native";
import { Card, Text } from "@rneui/themed";
import { DATA } from "../data/IdentityData";

const Identity = () => {
  const [id, setId] = useState(0);
  const [theme, setTheme] = useState(DATA[0].theme);
  const [affirmation, setAffirmation] = useState(DATA[0].affirmation);
  const [verse, setVerse] = useState(DATA[0].verse);
  const [address, setAddress] = useState(DATA[0].address);

  return (
    <Card>
      <Text>{theme}</Text>
      <Text>{affirmation}</Text>
      <Text>{verse}</Text>
      <Text>{address}</Text>
    </Card>
  );
};

export default Identity;
