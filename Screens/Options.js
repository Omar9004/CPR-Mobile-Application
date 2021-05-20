import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

import { Alert, StyleSheet, TouchableOpacity, Text, View, Touchable, Button, TextInput, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Timer from '../Functions/Timer';
import { getTime} from '../Functions/Timer';
import { ThemeProvider } from '@react-navigation/native';
import Alarm from '../Functions/Alarm';
import {
  test,
  dateToString,
  storeData,
  storeArray,
  getData,
  getArray,
  DefaultContainer,
} from "../Functions/functionContainer";
import { NavigationActions,StackActions } from 'react-navigation';
//import {getNewArray}from './Start';


var times = 0;
const resetAction = StackActions.reset({
  index: 0,
  actions: [
  NavigationActions.navigate({ routeName: 'Summary' }),
],
});
var KeyList=[]
export default class Options extends React.Component {
 /*componentWillUnmount(){
  let isFocused=this.props.navigation.isFocused()
  // console.log(isFocused);
 }*/
 constructor(props){
  super(props);
  
  this.state={
      Stop:true,
          
  }
}
/*KeyGenerator=()=>{
  let getDateKey=dateToString()
  KeyList.push(getDateKey)
  return(getDateKey)
}*/
  
/*componentWillUnmount(){
  console.log(this.state.Stop)
}*/


  render() {
    times= getTime()
    times = JSON.parse(times)
    return (
      
      <SafeAreaView >
        <View style={styles.time}>
        <Timer  sec={times["sec"]} min={times["min"]} h={times["hh"]} ></Timer>
        </View>
        <View style={styles.AlarmTimer}>
        <Alarm duration={1} sec={59}status={this.state.Stop}/>
            </View>
        
        
        <TouchableOpacity style={styles.appButtonContainer}
        
          title="VF/VT"
          onPress={() => {this.props.navigation.navigate('VF_VT')& //getNewArray().push({event:'VF/VT slingan', date:dateToString()})
          
          //test.push({event:'VF/VT slingan',date :dateToString()})&
          storeArray('Events','VF/VT slingan',dateToString(),test)
        }}


        >
          <Text style={styles.appButtonText}>VF/VT</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.appButtonContainer2}


          onPress={() => {this.props.navigation.navigate('Asystoli')& //getNewArray().push({event:'Asystoli slingan', date:dateToString()})
          //test.push({event:'Asystoli slingan',date :dateToString()})&
          storeArray('Events','Asystoli slingan',dateToString(),test)
        }}


        >
          <Text style={styles.appButtonText}>Asystoli</Text>
        </TouchableOpacity>
           
        <TouchableOpacity style = {styles.ButtonStyle2}
              
              title="Summary"
              onPress={() => {this.setState({Stop:false})&this.props.navigation.dispatch(resetAction)}}
              
              
            >
              
              
               <Text style={styles.SummaryButtonText}>Summary</Text>
            </TouchableOpacity>

            <TouchableOpacity style = {styles.Avslut_Button}
            
           
            onPress={() => Alert.alert("Alert","Vill du avsluta HLR?",
            [
              {text:'Avbryt',style:'cancel'},
              {text:'Ok',onPress :()=>{this.props.navigation.navigate('Summary'),this.props.navigation.dispatch(resetAction)}}
            ]
              )
            }
            
            
          >
             <Text style={styles.appButtonText}>Avsluta</Text>
             
          </TouchableOpacity>


      </SafeAreaView>


    );
  }

}
/*export const getKeys=()=>{
  return KeyList
}*/


const styles = StyleSheet.create({
  constainer: {
    marginTop: 250,
    borderColor: '#000'
  },
  appButtonContainer: {
    position: 'absolute',
    top: "95%",
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
    top: "-20%",
    left: 250,
    width: "25%",
    height: 50,
    
    backgroundColor:'blue',
    justifyContent: 'center',
    //alignSelf: "center"
  },
  Avslut_Button:{
    top:"100%",
    left: "30%",
    width: 170,
    height: 50,
    borderRadius:10,
    backgroundColor:'red',
    justifyContent: 'center',
    alignItems: 'center'
  },
  time:{
    top:260,
    
  },
  AlarmTimer:{
    top:"95%",
    left:"38%"
  },
  appButtonContainer2: {
    top: "63%",
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