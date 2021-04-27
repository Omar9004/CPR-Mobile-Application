
import React, { Component} from 'react';
import { Alert, StyleSheet,TouchableOpacity, Text, View, Touchable,Button, TextInput } from 'react-native';
import {createAppContainer}from 'react-navigation';
import {createStackNavigator}from 'react-navigation-stack';
import Alarm from '../Functions/Alarm';
import {
  test,
  dateToString,
  storeData,
  storeArray,
  getData,
  getArray,
  DefaultContainer,
  clearAppData
} from "../Functions/functionContainer";
import AsyncStorage from '@react-native-community/async-storage';

export default class Start extends React.Component{
 
  /*static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.otherParam : 'Home',
      /* These values are used instead of the shared configuration! 
      headerStyle: {
        backgroundColor: navigationOptions.headerStyle.backgroundColor,
      },
      headerTintColor: navigationOptions.headerTintColor,
    };
  };*/
  constructor(props){
    super(props);
      this.state={
      Duration:1,
      
      };
    } 
    componentDidMount(){
      
    }
               
    render(){
      clearAppData() 
        return(
          <View style={{flex: 1, justifyContent: 'center'}}>
             <View style={styles.timerView}>
               
              </View>

              <TouchableOpacity style = {styles.ButtonStyle}
              
              title="Start"
              onPress={() => this.props.navigation.navigate('CPR_Start')&
              test.push({event:'HLR börjar',date :dateToString()})&
              storeArray('Events',test)
            }
              
              
            >
              
              
               <Text style={styles.appButtonText}>Start</Text>
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
  appButtonContainer: {
    marginTop: 50,
  },
  appButtonText: {
    fontSize: 32,
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
  ButtonStyle:{
    position: 'absolute',
   /* top: 100,
    left: 130,*/
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor:'blue',
    justifyContent: 'center',
    alignSelf: "center"
  },
  ButtonStyle2:{
    position: 'absolute',
    top: "10%",
    left: 250,
    width: "25%",
    height: 50,
    
    backgroundColor:'blue',
    justifyContent: 'center',
    //alignSelf: "center"
  },
  timerView:{
    position: 'absolute',
    top: 0,
    left: 140,
    width: 100,
    height: 100,
    borderRadius: 100,
  }

})