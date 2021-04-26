import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

import { Alert, StyleSheet, TouchableOpacity, Text, View, Touchable, Button, TextInput, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Timer from '../Functions/Timer';
import { getTime} from '../Functions/Timer';
import { ThemeProvider } from '@react-navigation/native';
import {
  test,
  dateToString,
  storeData,
  storeArray,
  getData,
  getArray,
  DefaultContainer,
} from "../Functions/functionContainer";
var times = 0;
export default class Options extends Component {
  navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.otherParam : 'Options',
      /* These values are used instead of the shared configuration! */
      headerStyle: {
        backgroundColor: navigationOptions.headerStyle.backgroundColor,
      },
      headerTintColor: navigationOptions.headerTintColor,
    };
  };


  render() {
    times= getTime()
    times = JSON.parse(times)
    return (
      
      <View style={styles.constainer}>
        
        <Timer  sec={times["sec"]} min={times["min"]} h={times["hh"]} >
        
        </Timer>
        
        <TouchableOpacity style={styles.appButtonContainer}
        
          title="VF/VT"
          onPress={() => {this.props.navigation.navigate('VF_VT')& test.push({event:'VF/VT slingan',date :dateToString()})&
          storeArray('Events',test)}}


        >
          <Text style={styles.appButtonText}>VF/VT</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.appButtonContainer2}


          onPress={() => {this.props.navigation.navigate('Asystoli')& test.push({event:'Asystoli slingan',date :dateToString()})&
          storeArray('Events',test)}}


        >
          <Text style={styles.appButtonText}>Asystoli</Text>
        </TouchableOpacity>
           
        <TouchableOpacity style = {styles.ButtonStyle2}
              
              title="Summary"
              onPress={() => this.props.navigation.navigate('Summary')}
              
              
            >
              
              
               <Text style={styles.SummaryButtonText}>Summary</Text>
            </TouchableOpacity>


      </View>


    );
  }

}

const styles = StyleSheet.create({
  constainer: {
    marginTop: 250,
    borderColor: '#000'
  },
  appButtonContainer: {
    position: 'absolute',
    top: 50,
    left: 205,
    width: 150,
    height: 150,
    borderRadius: 20,
    backgroundColor: 'blue',
    justifyContent: 'center',
    //alignSelf: "center"
  },
  appButtonText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  SummaryButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
    
  },
  ButtonStyle2:{
    //position: 'absolute',
    top: "-130%",
    left: 250,
    width: "25%",
    height: 50,
    
    backgroundColor:'blue',
    justifyContent: 'center',
    //alignSelf: "center"
  },
  appButtonContainer2: {
    top: 0,
    left: 20,
    width: 150,
    height: 150,
    justifyContent: 'center',
    //alignSelf: "center",
    backgroundColor: "blue",
    borderRadius: 20,
    //paddingVertical: 10,
    //paddingHorizontal: 12,

  },
  

})