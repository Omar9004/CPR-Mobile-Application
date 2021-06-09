
import React, { Component} from 'react';
import { Alert, StyleSheet,TouchableOpacity, Text, View, Touchable,Button, TextInput } from 'react-native';
import {createAppContainer}from 'react-navigation';
import {createStackNavigator}from 'react-navigation-stack';
import Alarm from '../Functions/Alarm';
import {set_Adrenaline} from '../Functions/Timer'
import {
  test,
  dateToString,
  storeData,
  storeArray,
  getData,
  getArray,
  DefaultContainer,
  ArrayGenerator,
  clearAppData,
  dateToString_Clock
} from "../Functions/functionContainer";
import AsyncStorage from '@react-native-community/async-storage';
import {VF_VTResets}from'./VF_VT';
//var NewArray;
export default class Start extends React.Component{

  constructor(props){
    super(props);
    set_Adrenaline(0)
    VF_VTResets()
      this.state={
      Duration:1,
      
      };
    } 
    componentDidMount(){
      NewArray= ArrayGenerator()
      VF_VTResets()
    }
               
    render(){
      
      clearAppData() 
        return(
          <View style={{flex: 1, justifyContent: 'center'}}>
             <View style={styles.timerView}>
               
              </View>

              <TouchableOpacity style = {styles.ButtonStyle}
              
              title="Start"
              onPress={async() => this.props.navigation.navigate('CPR_Start')&
              //getNewArray().push({event:'HLR börjar', date:dateToString()})
              await storeArray('Events','HLR börjar',dateToString(),test)
            }
              
              
            >
              
              
               <Text style={styles.appButtonText}>Start</Text>
            </TouchableOpacity>

            
          
            
            
           </View>
        
        );
    }
}
export const getNewArray=()=>{
  return NewArray
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