import React, { useState, useEffect } from "react";
import {
  StatusBar,
  Text,
  View,
  SafeAreaView,
  Button,
  Touchable,
  TouchableOpacity,
  Alert,
  ScrollView,
  TouchableHighlight,
  BackHandler,
  TextInput,
  StyleSheet,
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';

{
  /*import { styles } from "./mystyles";*/
}

export const test = [];

//setValue(value + 1 - (value / 38).toFixed(0) * 20) counter with reset

export const dateToString = () => {
  return (
    new Date().getFullYear() +
    "/" +
    (new Date().getMonth() + 1) +
    "/" +
    new Date().getDate() +
    " " +
    new Date().getHours() +
    ":" +
    new Date().getMinutes() +
    ":" +
    new Date().getSeconds()
  );
};

export const storeData = async (key, saveText) => {
  try {
    let value= JSON.stringify(saveText)
    await AsyncStorage.setItem(key, value);
    
  } catch (e) {
    console.log("hello");
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      //functionCallback(value);
     return value
     
    }
  } catch (e) {
    console.log("Error");
    // error reading value
  }
};

export const storeArray = async (key, arrayToSave) => {
  try {
    const jsonValue = JSON.stringify(arrayToSave);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log("Error");
  }
};

export const getArray = async (key, arrayToLoad) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    let temp = jsonValue != null ? JSON.parse(jsonValue) : null;
    arrayToLoad.splice(0, arrayToLoad.length, ...temp);
   
    
  } catch (e) {
    console.log("Error");
    // error reading value
  }
};

export const DefaultContainer = ({ children }) => (
  <SafeAreaView style={styles.container}>{children}</SafeAreaView>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    marginTop: StatusBar.currentHeight,
  },
});

//const [sampleText, changeText] = useState("Empty Text.");

export const EndingCPR = ({ navigation }) => {
  return (
    <DefaultContainer>
      <SafeAreaView style={styles.container2}>
        <View style={styles.bigTextArea}>
          <ScrollView>
            <Text>{test.join("\n")}</Text>
          </ScrollView>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity onPress={() => navigation.popToTop()}>
            <View style={styles.blueBox}>
              <Text style={{ color: "#ff0", fontSize: 20, fontWeight: "bold" }}>
                Return to main screen
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("CPRStart")}>
            <View style={styles.blueBox}>
              <Text style={{ color: "#ff0", fontSize: 20, fontWeight: "bold" }}>
                Return to CPR
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </DefaultContainer>
  );
};

const typicalButton = () => <Button title="What is x?" color="#03ff1a" />;

const typicalTextInput = () => <TextInput />;

const typicalNmrInput = () => <TextInput keyboardType={"numeric"} />;
