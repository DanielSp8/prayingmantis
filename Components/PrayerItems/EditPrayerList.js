import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Pressable,
  TextInput,
} from "react-native";
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
  }

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
    const response = await ReadPrayerList.get("/prayerlists");

    let prayerListInfo = response.data[0];

    let prayerRequestsNum = prayerListInfo.prayerRequests.length - 1;

    let prayerInfo =
      prayerListInfo.prayerRequests[this.state.currentPrayerRequestNum];
    let prayerThemeInfo = prayerInfo.splice(0, 1);
    let thePrayerTheme = prayerThemeInfo.toString();

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
    } else {
      console.log(
        `You've prayed through the prayer requests... ${this.state.currentPrayerRequestNum}`
      );
    }
  };

  skipToThePreviousPrayerRequest = () => {
    if (this.state.currentPrayerRequestNum > 0) {
      this.setState({
        currentPrayerRequestNum: this.state.currentPrayerRequestNum - 1,
      });
      this.getPrayerListData();
    } else {
      console.log(
        `You're at the beginning of your prayer requests: ${this.state.currentPrayerRequestNum}`
      );
    }
  };

  updateTheme = (newTheme) => {
    this.setState({ prayerTheme: newTheme });
  };

  updateRequestsInState = (oldElement, newElement) => {
    let iterationOfPrayerList = this.state.prayerList.indexOf(oldElement);
    let updatedPrayerList = this.state.prayerList;
    updatedPrayerList[iterationOfPrayerList] = newElement;

    this.setState({
      prayerList: updatedPrayerList,
    });
  };

  updatePrayerRequestsAction = () => {
    let arrayToUpdate = this.state.prayerList;
    arrayToUpdate.unshift(this.state.prayerTheme);
    console.log(arrayToUpdate);
    this.updatePrayerListInMongo(arrayToUpdate);
  };

  updatePrayerListInMongo = async (arrayToUpdate) => {
    const response = await ReadPrayerList.get("/prayerlists");
    const arrayNum = this.state.currentPrayerRequestNum;

    console.log(this.state.currentPrayerRequestNum);
    console.log(
      `response.data[0].prayerRequests[arrayNum]: ${response.data[0].prayerRequests[arrayNum]}`
    );

    const update = await ReadPrayerList.put("/prayerlists", arrayToUpdate);
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
                onChangeText={(text) => this.updateTheme(text)}
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
              <Pressable style={styles.buttonUpdateAndDelete}>
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
