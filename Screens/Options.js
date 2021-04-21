import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

import { Alert, StyleSheet, TouchableOpacity, Text, View, Touchable, Button, TextInput, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Timer from '../Functions/Timer';
import {secKey} from '../Functions/Timer';
import { ThemeProvider } from '@react-navigation/native';
//import {secKey} from '../Functions/Timer';
//import {secKey1} from '../Functions/Timer';
var parses = 0;
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

  move = async () => {
   await this.getData();
  }
  getData = async () => {

    try {
       const value = await AsyncStorage.getItem(secKey);

      parses = JSON.parse(value);
      //console.log(parses)

    } catch (e) {
      console.log("Empty");
    }
  }
  render() {
      const {navigation } =this.props;
      let timer = JSON.stringify(navigation.getParam('time','NO-ID'));
      timer= JSON.parse(timer);
      
    return (
      
      <View style={styles.constainer}>
        
        <Timer  sec={timer["sec"]} min={timer["min"]} h={timer["hh"]} >
        
        </Timer>
        
        <TouchableOpacity style={styles.appButtonContainer}
        
          title="VF/VT"
          onPress={async() => {await this.move(),this.props.navigation.navigate('VF_VT',{time:parses})}}


        >
          <Text style={styles.appButtonText}>VF/VT</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.appButtonContainer2}


          onPress={async() => {await this.move(), this.props.navigation.navigate('Asystoli', { time: parses }) }}


        >
          <Text style={styles.appButtonText}>Asystoli</Text>
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