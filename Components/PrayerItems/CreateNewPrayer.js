import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Pressable,
  TextInput,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { Card, Text } from "@rneui/themed";
import ReadPrayerList from "../../src/api/ReadPrayerList";
import RandomBackgroundNatureImage from "../../docs/BackgroundNatureImages02";

class CreateNewPrayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prayerTheme: "",
      prayerRequests: [{ id: 0, text: "" }],
      nextId: 1,
    };

    this.getToken = this.getToken.bind(this);
    this.getPrayersToDisplay = this.getPrayersToDisplay.bind(this);
    this.updateRequestsInState = this.updateRequestsInState.bind(this);
    this.addPrayerRequest = this.addPrayerRequest.bind(this);
    this.updateForSave = this.updateForSave.bind(this);
    this.savePrayerRequest = this.savePrayerRequest.bind(this);
    this.clearScreen = this.clearScreen.bind(this);
    this.objectToArray = this.objectToArray.bind(this);
  }

  objectToArray = (obj) => {
    return Object.values(obj);
  };

  getToken = async () => {
    try {
      const jwtToken = await SecureStore.getItemAsync("userToken");
      return jwtToken;
    } catch (error) {
      console.error("Error getting token:", error);
      return null;
    }
  };

  getPrayersToDisplay = () => {
    return this.state.prayerRequests.map(({ id, text }) => (
      <View key={id}>
        <TextInput
          placeholder="Enter prayer request here."
          value={text}
          onChangeText={(newText) => this.updateRequestsInState(id, newText)}
          style={styles.prayerInputBox}
        />
        <Text></Text>
      </View>
    ));
  };

  updateRequestsInState = (id, newText) => {
    this.setState((prevState) => ({
      prayerRequests: prevState.prayerRequests.map((prayer) =>
        prayer.id === id ? { ...prayer, text: newText } : prayer
      ),
    }));
  };

  addPrayerRequest = () => {
    this.setState((prevState) => ({
      prayerRequests: [
        ...prevState.prayerRequests,
        { id: prevState.nextId, text: "" },
      ],
      nextId: prevState.nextId + 1,
    }));
  };

  updateForSave = () => {
    // Extracting prayer texts from the prayerRequests state variable
    const prayerTexts = this.state.prayerRequests.map((prayer) => prayer.text);
    // Combining prayerTheme and prayerTexts into a single array
    let arrayToUpdate = [this.state.prayerTheme, ...prayerTexts];
    this.savePrayerRequest(arrayToUpdate);
  };

  savePrayerRequest = async (arrayToUpdate) => {
    const token = await this.getToken();
    const response = await ReadPrayerList.get("/prayerlists", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    let updatedPrayerRequests = response.data.prayerRequests;
    updatedPrayerRequests.push(arrayToUpdate);

    console.log(`updatedPrayerRequests: ${updatedPrayerRequests}`);
    const save = await ReadPrayerList.put(
      "/prayerlists",
      updatedPrayerRequests,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    this.clearScreen();
  };

  clearScreen = () => {
    this.setState({
      prayerTheme: "",
      prayerRequests: [{ id: 0, text: "" }],
      nextId: 1,
    });
  };

  render() {
    return (
      <ImageBackground
        source={RandomBackgroundNatureImage}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <Card>
            <View>
              <Text style={styles.textHeading}>Enter Person to Pray for:</Text>
              <TextInput
                placeholder="Enter person here:"
                value={this.state.prayerTheme}
                onChangeText={(text) => this.setState({ prayerTheme: text })}
              />
              <Card.Divider />
              {this.getPrayersToDisplay()}
            </View>
          </Card>

          <Card>
            <View style={styles.fixToText}>
              <Pressable
                style={styles.buttonAddAndSave}
                onPress={this.addPrayerRequest}
              >
                <Text style={styles.textButtons}>Add Prayer</Text>
              </Pressable>
              <Pressable
                style={styles.buttonAddAndSave}
                onPress={this.updateForSave}
              >
                <Text style={styles.textButtons}>Save Prayer</Text>
              </Pressable>
            </View>
          </Card>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    opacity: 0.85,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    width: 350,
  },
  prayerInputBox: {
    color: "black",
    fontSize: 12,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonAddAndSave: {
    elevation: 3,
    backgroundColor: "lightblue",
    padding: 5,
    borderRadius: 7,
  },
});

export default CreateNewPrayer;
