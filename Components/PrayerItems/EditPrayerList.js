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

class EditPrayerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prayerTheme: "",
      prayerList: [],
      numOfPrayerRequests: 0,
      currentPrayerRequestNum: 0,
    };

    this.getToken = this.getToken.bind(this);
    this.getPrayerListData = this.getPrayerListData.bind(this);
    this.getPrayersToDisplay = this.getPrayersToDisplay.bind(this);
    this.updateTheme = this.updateTheme.bind(this);
    this.updateRequestsInState = this.updateRequestsInState.bind(this);
    this.updatePrayerRequestsAction =
      this.updatePrayerRequestsAction.bind(this);
    this.skipToTheNextPrayerRequest =
      this.skipToTheNextPrayerRequest.bind(this);
    this.skipToThePreviousPrayerRequest =
      this.skipToThePreviousPrayerRequest.bind(this);
    this.updatePrayerListInMongo = this.updatePrayerListInMongo.bind(this);
    this.deletePrayerRequestItem = this.deletePrayerRequestItem.bind(this);
  }

  getToken = async () => {
    try {
      const jwtToken = await SecureStore.getItemAsync("userToken");
      return jwtToken;
    } catch (error) {
      console.error("Error getting token:", error);
      return null;
    }
  };

  getPrayersToDisplay = (array) => {
    var i = -1;
    return array.map((element) => {
      i++;
      // console.log(element);
      return (
        <View key={i}>
          <TextInput
            name={i}
            placeholder={element}
            onSubmitEditing={(text) => {
              this.updateRequestsInState(element, text.nativeEvent.text);
            }}
            style={styles.prayerInputBox}
          />
          <Text></Text>
        </View>
      );
    });
  };

  getPrayerListData = async () => {
    const token = await this.getToken();

    const response = await ReadPrayerList.get("/prayerlists", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(`response: ${response}`);
    let prayerListInfo = response.data.prayerRequests;
    console.log(`prayerListInfo: ${prayerListInfo}`);
    let prayerRequestsNum = prayerListInfo.length - 1;
    console.log(`prayerRequestsNum: ${prayerRequestsNum}`);
    let thePrayerTheme = "";
    let prayerInfo = [];
    let prayerThemeInfo = [];

    if (prayerRequestsNum < 0) {
      thePrayerTheme = "No Prayer Requests Stored Yet";
      prayerInfo = [
        "Go back to the main menu",
        "then add some prayer requests!",
      ];
    } else {
      prayerInfo = prayerListInfo[this.state.currentPrayerRequestNum];
      prayerThemeInfo = prayerInfo.splice(0, 1);
      thePrayerTheme = prayerThemeInfo.toString();
    }

    this.setState({
      prayerTheme: thePrayerTheme,
      prayerList: prayerInfo,
      numOfPrayerRequests: prayerRequestsNum,
    });
  };

  skipToTheNextPrayerRequest = () => {
    if (this.state.numOfPrayerRequests > this.state.currentPrayerRequestNum) {
      this.setState({
        currentPrayerRequestNum: this.state.currentPrayerRequestNum + 1,
      });
      this.getPrayerListData();
    }
  };

  skipToThePreviousPrayerRequest = () => {
    if (this.state.currentPrayerRequestNum > 0) {
      this.setState({
        currentPrayerRequestNum: this.state.currentPrayerRequestNum - 1,
      });
      this.getPrayerListData();
    }
  };

  updateTheme = (newTheme) => {
    this.setState({ prayerTheme: newTheme });
  };

  updateRequestsInState = (oldElement, newElement) => {
    let iterationOfPrayerList = this.state.prayerList.indexOf(oldElement);
    let updatedPrayerList = [...this.state.prayerList];
    updatedPrayerList[iterationOfPrayerList] = newElement;

    this.setState({
      prayerList: updatedPrayerList,
    });
  };

  updatePrayerRequestsAction = () => {
    let arrayToUpdate = [...this.state.prayerList];
    arrayToUpdate.unshift(this.state.prayerTheme);

    console.log(`arrayToUpdate: ${arrayToUpdate}`);
    this.updatePrayerListInMongo(arrayToUpdate);
  };

  updatePrayerListInMongo = async (arrayToUpdate) => {
    const token = await this.getToken();

    const response = await ReadPrayerList.get("/prayerlists", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const arrayNum = this.state.currentPrayerRequestNum;
    let oldPrayerRequests = response.data.prayerRequests;
    oldPrayerRequests[arrayNum] = arrayToUpdate;

    console.log(`oldPrayerRequests: ${oldPrayerRequests}`);
    // const update = await ReadPrayerList.put("/prayerlists", oldPrayerRequests);
  };

  deletePrayerRequestItem = async () => {
    const token = await this.getToken();

    const response = await ReadPrayerList.get("/prayerlists", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    let arrayNum = this.state.currentPrayerRequestNum;
    let oldPrayerRequests = response.data.prayerRequests;
    let elementToRemove = oldPrayerRequests.splice(arrayNum, 1);

    console.log(`oldPrayerRequests: ${oldPrayerRequests}`);
    // const update = await ReadPrayerList.put("/prayerlists", oldPrayerRequests);

    this.getPrayerListData();
  };

  componentDidMount() {
    this.getPrayerListData();
  }

  render() {
    return (
      <ImageBackground
        source={RandomBackgroundNatureImage}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <Card>
            <View>
              <Text style={styles.textHeading}>Praying for:</Text>
              <TextInput
                placeholder={this.state.prayerTheme}
                onSubmitEditing={(text) =>
                  this.updateTheme(text.nativeEvent.text)
                }
              />
              <Card.Divider />
              {this.getPrayersToDisplay(this.state.prayerList)}
            </View>
          </Card>

          <Card>
            <View style={styles.fixToText}>
              <Pressable
                style={styles.buttonUpdateAndDelete}
                onPress={this.updatePrayerRequestsAction}
              >
                <Text style={styles.textButtons}>Update</Text>
              </Pressable>
              <Pressable
                style={styles.buttonUpdateAndDelete}
                onPress={this.deletePrayerRequestItem}
              >
                <Text style={styles.textButtons}>Delete</Text>
              </Pressable>
            </View>
          </Card>

          <Card>
            <View style={styles.fixToText}>
              <Pressable
                style={styles.buttonNextAndPrev}
                onPress={this.skipToThePreviousPrayerRequest}
              >
                <Text>Previous</Text>
              </Pressable>

              <Pressable
                style={styles.buttonNextAndPrev}
                onPress={this.skipToTheNextPrayerRequest}
              >
                <Text>Next</Text>
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
  },
  textHeading: {
    color: "black",
    fontSize: 20,
    textAlign: "center",
  },
  prayerInputBox: {
    color: "black",
    fontSize: 12,
  },
  stylingOfWrap: {
    flex: 1,
    flexWrap: "wrap",
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonNextAndPrev: {
    elevation: 3,
    backgroundColor: "lightblue",
    padding: 5,
    borderRadius: 7,
  },
  buttonUpdateAndDelete: {
    elevation: 3,
    backgroundColor: "royalblue",
    padding: 5,
    borderRadius: 8,
  },
  textButtons: {
    color: "white",
  },
});

export default EditPrayerList;
