import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ScrollView,
} from "react-native";
import { Card } from "@rneui/themed";
import JoshuaProject from "../src/api/JoshuaProject";

class Unreached extends Component {
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
      howReach: "",
      obstacles: "",
      prayForChurch: "",
      prayForPG: "",
      scriptureFocus: "",
      summary: "",
      shouldShow: false,
    };

    this.getDailyUnreached = this.getDailyUnreached.bind(this);
  }

  getDailyUnreached = async () => {
    const response = await JoshuaProject.get(
      "/v1/people_groups/daily_unreached.json"
    );
    var unreached = response.data[0];

    // console.log(unreached);

    var prayForTheChurch;
    if (unreached["ProfileText"][0]["PrayForChurch"] != null) {
      prayForTheChurch = unreached["ProfileText"][0]["PrayForChurch"];
    } else if (unreached["ProfileText"][1]["PrayForChurch"] != null) {
      prayForTheChurch = unreached["ProfileText"][1]["PrayForChurch"];
    } else {
      prayForTheChurch = null;
    }

    this.setState({
      affinity: unreached["AffinityBloc"],
      audioRecordings: unreached["AudioRecordings"],
      country: unreached["Ctry"],
      continent: unreached["Continent"],
      language: unreached["OfficialLang"],
      peopleNameInCountry: unreached["PeopNameInCountry"],
      peopleGroupPhoto: unreached["PeopleGroupPhotoURL"],
      primaryReligion: unreached["PrimaryReligion"],
      howReach: unreached["ProfileText"][0]["HowReach"],
      obstacles: unreached["ProfileText"][0]["Obstacles"],
      prayForChurch: prayForTheChurch,
      prayForPG: unreached["ProfileText"][0]["PrayForPG"],
      scriptureFocus: unreached["ProfileText"][0]["ScriptureFocus"],
      summary: unreached["ProfileText"][0]["Summary"],
      shouldShow: true,
    });
  };

  componentDidMount() {
    this.getDailyUnreached();
  }

  render() {
    return (
      <ScrollView>
        {this.state.shouldShow && (
          <Card>
            <View style={styles.viewOfPeopleGroup}>
              <Text style={styles.headingText}>
                Daily Unreached People Group
              </Text>
              <Text style={styles.subHeading}>Location: </Text>
              <Text
                style={styles.countryContinentText}
                name="countryContinentText"
              >
                {this.state.country} in {this.state.continent}
              </Text>
              <Image
                style={styles.imageStyle}
                resizeMode="contain"
                source={{ uri: this.state.peopleGroupPhoto }}
              />
              <Text
                style={styles.peopleNameInCountry}
                name="peopleNameInCountry"
              >
                {this.state.peopleNameInCountry}
              </Text>
            </View>

            <Card.Divider />
            <Text style={styles.subHeading} name="languageText">
              Official Language:{" "}
              <Text style={styles.languageText}>{this.state.language}</Text>
            </Text>
            <Text style={styles.subHeading} name="primaryReligion">
              Primary Religion:{" "}
              <Text style={styles.primaryReligion}>
                {this.state.primaryReligion}
              </Text>
            </Text>
            <Card.Divider />

            <Text style={styles.headings} name="scriptureFocusText">
              Scripture Focus:
            </Text>
            <Text style={styles.scriptureFocusText}>
              {this.state.scriptureFocus}
            </Text>
            <Card.Divider />

            <Text style={styles.headings} name="summaryText">
              Summary:
            </Text>
            <Text style={styles.summaryText}>{this.state.summary}</Text>
            <Card.Divider />

            <Text style={styles.headings} name="evangelismHeading">
              Evangelism/Outreach:
            </Text>
            <Text style={styles.subHeading} name="obstacles">
              Obstacles:{" "}
              <Text style={styles.blockText}>{this.state.obstacles}</Text>
            </Text>
            <Text style={styles.subHeading} name="howReach">
              Ideas of How to Reach Them:{" "}
              <Text style={styles.blockText}>{this.state.howReach}</Text>
            </Text>
            <Card.Divider />

            <Text style={styles.headings} name="prayerHeading">
              Praying/Intercession:
            </Text>
            <Text style={styles.subHeading} name="prayForChurch">
              Pray for the Church:{" "}
              <Text style={styles.blockText}>{this.state.prayForChurch}</Text>
            </Text>
            <Text style={styles.subHeading} name="prayForPG">
              Pray for this People Group:{" "}
              <Text style={styles.blockText}>{this.state.prayForPG}</Text>
            </Text>
            <Card.Divider />
          </Card>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  headingText: {
    color: "white",
    backgroundColor: "blue",
    borderWidth: 1,
    borderColor: "black",
    alignSelf: "center",
    fontSize: 22,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  subHeading: {
    color: "blue",
  },
  headings: {
    alignSelf: "center",
    fontWeight: "bold",
  },
  scriptureFocusText: {
    fontSize: 14,
    color: "black",
  },
  summaryText: {
    fontSize: 14,
    color: "black",
  },
  peopleNameInCountry: {
    fontSize: 14,
    color: "black",
  },
  affinityText: {
    fontSize: 16,
    color: "black",
  },
  countryContinentText: {
    fontSize: 15,
    color: "black",
    alignItems: "center",
    position: "relative",
    justifyContent: "center",
  },
  imageStyle: {
    width: "100%",
    height: 200,
    borderColor: "black",
    borderWidth: 0,
    borderStyle: "solid",
    flex: 2,
  },
  viewOfPeopleGroup: {
    position: "relative",
    alignItems: "center",
  },
  languageText: {
    fontSize: 12,
    color: "black",
  },
  primaryReligion: {
    fontSize: 12,
    color: "black",
  },
  blockText: {
    color: "black",
  },
});

export default Unreached;
