import React, { Component } from "react";
import { ScrollView, View, StyleSheet, Button } from "react-native";
import { Card, Text } from "@rneui/themed";
import { AdorationData } from "../data/AdorationData";
import { ConfessionData } from "../data/ConfessionData";
import { ThanksgivingData } from "../data/ThanksgivingData";
import { SupplicationData } from "../data/SupplicationData";

class Acts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 1,
      theme: "",
      verse: "",
      address: "",
      buttonText: "",
    };

    this.generateRandomVerse = this.generateRandomVerse.bind(this);
  }

  generateRandomVerse = (verseData) => {
    var randomNum = verseData[Math.floor(Math.random() * verseData.length) + 1];
    console.log(verseData[randomNum]);
  };

  selectDataOnClick = () => {
    if (this.state.theme == "Adoration") {
      this.generateRandomVerse(ConfessionData);
    } else if (this.state.theme == "Confession") {
      this.generateRandomVerse(ThanksgivingData);
    } else if (this.state.theme == "Thanksgiving") {
      this.generateRandomVerse(SupplicationData);
    } else if (this.state.theme == "Supplication") {
      this.generateRandomVerse(AdorationData);
    }
  };

  render() {
    return (
      <ScrollView>
        <Card>
          <View>
            <Text>{this.state.theme}</Text>
            <Text>{this.state.verse}</Text>
            <Text>{this.state.address}</Text>
            <Button
              onPress={generateRandomVerse}
              title={this.state.buttonText}
            />
          </View>
        </Card>
      </ScrollView>
    );
  }
}

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

export default Acts;
