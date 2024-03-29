import React, { Component } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { Card } from "@rneui/themed";
import JoshuaProject from "../src/api/JoshuaProject";

class UnreachedScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      affinity: "",
      audioRecordings: "",
      country: "",
      continent: "",
      language: "",
      peopleGroupPhoto: "",
      peopleNameInCountry: "",
      primaryReligion: "",
      summary: "",
      tenfortywindow: "",
      photoCredit: "",
      shouldShow: false,
    };

    this.getDailyUnreached = this.getDailyUnreached.bind(this);
  }

  getDailyUnreached = async () => {
    const response = await JoshuaProject.get(
      "/v1/people_groups/daily_unreached.json"
    );
    var unreached = response.data[0];

    var tenFortyWindowInfo;
    var photoCredit;
    var audioInfo;

    unreached.Window1040 == "Y"
      ? (tenFortyWindowInfo = "Yes")
      : (tenFortyWindowInfo = "No");

    unreached.PhotoCopyright == "Y"
      ? (photoCredit = `Photo Credit:  ${unreached.PhotoCredits}`)
      : (photoCredit = "");

    unreached.AudioRecordings == "Y" ? (audioInfo = "Yes") : (audioInfo = "No");

    this.setState({
      affinity: unreached.AffinityBloc,
      audioRecordings: audioInfo,
      country: unreached.Ctry,
      continent: unreached.Continent,
      language: unreached.OfficialLang,
      peopleNameInCountry: unreached.PeopNameInCountry,
      peopleGroupPhoto: unreached.PeopleGroupPhotoURL,
      primaryReligion: unreached.PrimaryReligion,
      summary: unreached.Summary,
      tenfortywindow: tenFortyWindowInfo,
      photoCredit: photoCredit,
      shouldShow: true,
    });
  };

  componentDidMount() {
    this.getDailyUnreached();
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.state.shouldShow && (
          <Card>
            <View style={styles.viewOfPeopleGroup}>
              <Text style={styles.headingText}>
                Daily Unreached People Group
              </Text>
              <Text style={styles.headings}>Location: </Text>
              <Text style={styles.regularText} name="countryContinentText">
                {this.state.country} in {this.state.continent}
              </Text>
              <Text style={styles.regularText}>
                {this.state.peopleNameInCountry}
              </Text>
              <Image
                source={{ uri: this.state.peopleGroupPhoto }}
                style={styles.imageStyle}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.infoStyle}>{this.state.photoCredit}</Text>
            <Card.Divider />
            <Text style={styles.headings} name="languageText">
              Official Language:{" "}
              <Text style={styles.regularText}>{this.state.language}</Text>
            </Text>
            <Text style={styles.headings} name="primaryReligion">
              Primary Religion:{" "}
              <Text style={styles.regularText}>
                {this.state.primaryReligion}
              </Text>
            </Text>
            <Card.Divider />

            <Text style={styles.headings} name="summaryText">
              Summary:
            </Text>
            <Text style={styles.regularText}>{this.state.summary}</Text>
            <Card.Divider />

            <Text style={styles.headings} name="infoHeading">
              Other Information:
            </Text>
            <Text style={styles.infoStyle} name="windowTenForty">
              In the 10/40 Window? {this.state.tenfortywindow}
            </Text>
            <Text style={styles.infoStyle} name="audioInfo">
              Bible Audio Recordings? {this.state.audioRecordings}
            </Text>
          </Card>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  headingText: {
    color: "white",
    backgroundColor: "#4169e1",
    borderWidth: 1,
    borderColor: "black",
    alignSelf: "center",
    fontSize: 24,
  },
  container: {
    backgroundColor: "#4169e1",
  },
  headings: {
    alignSelf: "center",
    fontWeight: "bold",
    color: "blue",
  },
  regularText: {
    fontSize: 14,
    color: "black",
    textAlign: "center",
  },
  infoStyle: {
    color: "black",
    textAlign: "center",
  },
  imageStyle: {
    width: "100%",
    height: 200,
    borderColor: "black",
    borderWidth: 0,
    flex: 2,
  },
});

export default UnreachedScreen;
