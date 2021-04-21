import React, { Component, useState,useEffect } from 'react';
import 'react-native-gesture-handler';
import { Alert, StyleSheet,TouchableOpacity, Text, View, Touchable,Button, TextInput } from 'react-native';

import Start from './Screens/Start';
import Options from './Screens/Options';
import VF_VT from './VF_VT/VF_VT';
import  VF_VT2 from './VF_VT/VF_VT2';
import CPR_Start from './Screens/CPR_Start';
import Asystoli from './Screens/Asystoli';
import {createAppContainer}from 'react-navigation';
import {createStackNavigator}from 'react-navigation-stack';
import {createSwitchNavigator}from 'react-navigation';
//import Screen2 from './Screens/Screen2';


export default class App extends React.Component{
  render(){  
    return(
      
    <AppContainer/>
    );
    
    
  } 
  
}
const AppSwitherVF = createSwitchNavigator({
  VF_VT:{
    screen:VF_VT
  },
  VF_VT2:{
    screen:VF_VT2
  },
  Asystoli:{
    screen:Asystoli,
  },
  Options:{ 
    screen:Options,
  },
  
},
{
  initialRouteName: "Options",
  defaultNavigationOptions: {
    gestureEnabled:false,
    headerStyle: {
      backgroundColor: '#8ed1fc',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    
  }

})
/*const AppSwitherAS = createSwitchNavigator({
    Asystoli:{
    screen:Asystoli,
  },
})*/
const AppNavigator = createStackNavigator({
  Home:{
    screen:Start,
    
  },

  CPR_Start:{
    screen:CPR_Start
  },

  
  VF:AppSwitherVF,
 // Asystoli:AppSwitherAS,
  
    
},
{
  initialRouteName: "Home",
  defaultNavigationOptions: {
    gestureEnabled:false,
    headerStyle: {
      backgroundColor: '#8ed1fc',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    
  }
}
);
const AppContainer = createAppContainer(AppNavigator);
 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
