import React from 'react';
import 'react-native-gesture-handler';
import {StyleSheet } from 'react-native';

import Start from './Screens/Start';
import Options from './Screens/Options';
import VF_VT from './Screens/VF_VT';
import CPR_Start from './Screens/CPR_Start';
import Asystoli from './Screens/Asystoli';
import Summary from './Screens/Summary';
import Details from './Screens/Details';
import Notes from './Screens/Notes';

import {createAppContainer}from 'react-navigation';
import {createStackNavigator}from 'react-navigation-stack';
import {createSwitchNavigator}from 'react-navigation';
import {enableScreens}from 'react-native-screens'
//import Screen2 from './Screens/Screen2';

enableScreens(true);
export default class App extends React.Component{
  render(){  
    return(
      
    <AppContainer/>
    );
    
    
  } 
  
}
const AppSwitherVF = createSwitchNavigator({
  Options:{ 
    screen:Options,
  },
  VF_VT:{
    screen:VF_VT
  },
 
  Asystoli:{
    screen:Asystoli,
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
const SummaryStack = createStackNavigator({
  Summary:{
    screen:Summary,
  },
  Details:{
    screen:Details
  },
  Notes:{
    screen:Notes,
  },
  
});
const AppNavigator = createStackNavigator({
  Home:{
    screen:Start,
    
  },

  CPR_Start:{
    screen:CPR_Start
  },
  Summary:{
    screen:Summary,
  },
  Details:{
    screen:Details
  },
  Notes:{
    screen:Notes,
  },
  

  
  VF:AppSwitherVF,
  //Summary:SummaryStack,
  
    
},
{
  initialRouteName: "Home",
  defaultNavigationOptions: {
    headerShown:false,
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
