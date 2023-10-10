import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RandomBackImage from "./docs/BackgroundMantisImages";
import { Card } from "@rneui/themed";
import * as Animatable from "react-native-animatable";

const HomeScreen = ({ navigation }) => {
  logout = async () => {
    try {
      // const logoutResponse = await ReadPrayerList.get("/users/logout");
      // console.log(`logoutResponse: ${logoutResponse}`);
      await AsyncStorage.removeItem("token");
      navigation.navigate({ name: "Login" });
    } catch (error) {
      console.log(error);
      alert("Logout failed: " + error.message);
    }
  };

  return (
    <ImageBackground source={RandomBackImage} style={styles.backgroundImage}>
      <Animatable.Text
        animation="lightSpeedIn"
        style={styles.prayingMantisTitle}
      >
        Praying Mantis
      </Animatable.Text>
      <View style={styles.menuLayout}>
        <View style={styles.stylingButtonGroup}>
          <Pressable
            style={styles.eachButton}
            onPress={() => navigation.navigate("PrayerList")}
          >
            <Text style={styles.text}>Prayer List</Text>
          </Pressable>
        </View>
        <View style={styles.stylingButtonGroup}>
          <Pressable
            style={styles.eachButton}
            onPress={() => navigation.navigate("Acts")}
          >
            <Text style={styles.text}>ACTS: Prayer Model</Text>
          </Pressable>
        </View>
        <View style={styles.stylingButtonGroup}>
          <Pressable
            style={styles.eachButton}
            onPress={() => navigation.navigate("Identity")}
          >
            <Text style={styles.text}>Identity: Who are you?</Text>
          </Pressable>
        </View>
        <View style={styles.stylingButtonGroup}>
          <Pressable
            style={styles.eachButton}
            onPress={() => navigation.navigate("Unreached")}
          >
            <Text style={styles.text}>Unreached of the Day</Text>
          </Pressable>
        </View>
      </View>

      <Card>
        <Card.Title>Prayer List: Other Options</Card.Title>
        <View>
          <Pressable
            style={styles.bottomMenuButtons}
            onPress={() => navigation.navigate("CreateNewPrayer")}
          >
            <Text>Add a Prayer</Text>
          </Pressable>
          <Pressable
            style={styles.bottomMenuButtons}
            onPress={() => navigation.navigate("EditPrayerList")}
          >
            <Text>Edit Prayer List</Text>
          </Pressable>
        </View>
      </Card>

      <Pressable style={styles.logoutButton} onPress={logout}>
        <Text>Logout</Text>
      </Pressable>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    opacity: 0.7,
  },
  prayingMantisTitle: {
    fontSize: 45,
    paddingTop: 25,
    fontWeight: "bold",
  },
  menuLayout: {
    paddingTop: 100,
  },
  eachButton: {
    alignItems: "center",
    Top: 20,
    paddingVertical: 13,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 0.5,
  },
  stylingButtonGroup: {
    marginVertical: 15,
  },
  bottomMenuButtons: {
    alignItems: "center",
    Top: 15,
    paddingVertical: 7,
    paddingHorizontal: 8,
    borderRadius: 7,
    elevation: 3,
    backgroundColor: "gray",
    padding: 5,
  },
  logoutButton: {
    alignItem: "right",
  },
});

export default HomeScreen;
