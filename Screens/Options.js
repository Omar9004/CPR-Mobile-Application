import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

import { Alert, StyleSheet, TouchableOpacity, Text, View, Touchable, Button, TextInput, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Timer from '../Functions/Timer';
import { getTime} from '../Functions/Timer';
import { ThemeProvider } from '@react-navigation/native';
import Alarm from '../Functions/Alarm';
import {getAlarmTime} from '../Functions/Alarm';
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
var flag1 =true;
const resetAction = StackActions.reset({
  index: 0,
  actions: [
  NavigationActions.navigate({ routeName: 'Summary' }),
],
});
//var KeyList=[]
export default class Options extends React.PureComponent {
 
 constructor(props){
  super(props);
  flag1=true;
  this.state={
      Stop:true,
      Timer:0,
      Analyses_Flag:true,
      Alarm_falg:true,
          
  }
}

componentDidMount(){
  this.interval= setInterval(()=>{this.setState({Timer:this.state.Timer+1}),this.Timer_cheak()},1000)
  
}
componentWillUnmount(){
  clearInterval(this.interval);
  
}
Alarm_Func=()=>{
  let al = JSON.parse(getAlarmTime())
  /*if(al["min"]==0&& al["sec"]<=10){
    clearInterval(this.interval);
   return(<Alarm duration ={0} sec={0} status={true} status1={false} />)
 }else{*/
  return(<Alarm duration ={2} sec={0}status={true} status1={true}/>)
  //}
}
Timer_cheak=()=>{
  
  if(this.state.Timer==109){
    clearInterval(this.interval);
    this.setState({Analyses_Flag:false})
  }
}

  render() {
    times= getTime()
    times = JSON.parse(times)
    return (
      
      <SafeAreaView >
        <View style={styles.time}>
        <Timer  sec={times["sec"]} min={times["min"]} h={times["hh"]} Adren_Alert={true}></Timer>
        </View>
        <View style={styles.AlarmTimer}>
        {this.Alarm_Func()}
            </View>
        
        
        <TouchableOpacity style={styles.appButtonContainer}
        
          title="VF/VT"
          onPress={() => {this.state.Analyses_Flag?this.props.navigation.navigate('VF_VT')& //getNewArray().push({event:'VF/VT slingan', date:dateToString()})
          
          //test.push({event:'VF/VT slingan',date :dateToString()})&
          storeArray('Events','VF/VT slingan',dateToString(),test) :Alert.alert("Alert","Gör analysen igen",[{text:'Analys',onPress:()=> this.props.navigation.navigate('CPR_Start')}])
        }}


        >
          <Text style={styles.appButtonText}>VF/VT</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.appButtonContainer2}


          onPress={() => {this.state.Analyses_Flag?this.props.navigation.navigate('Asystoli')& //getNewArray().push({event:'Asystoli slingan', date:dateToString()})
          //test.push({event:'Asystoli slingan',date :dateToString()})&
          storeArray('Events','Asystoli slingan',dateToString(),test):Alert.alert("Alert","Gör analysen igen",[{text:'Analys',onPress:()=> this.props.navigation.navigate('CPR_Start')}, {text:'Avbryt',style:"cancel"}])
        }}


        >
          <Text style={styles.appButtonText}>Asystoli</Text>
        </TouchableOpacity>
           
      
              
              
               <Text style={styles.SummaryButtonText}>Välj Analys</Text>
           

            <TouchableOpacity style = {styles.Avslut_Button}
            
           
            onPress={() => Alert.alert("Alert","Vill du avsluta HLR?",
            [
              {text:'Avbryt',style:'cancel'},
              {text:'Ok',onPress :()=>{ storeData('Time',times),this.props.navigation.navigate('Summary'),this.props.navigation.dispatch(resetAction)}}
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
    //position: 'absolute',
    top: "40%",
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
    top:"-40%",
    fontSize: 24,
    color: "#000",
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
    top:"40%",
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
      // position: 'absolute',
    top: "100%",
    left: "40%",
    right:0,
    bottom:0,
    width: 88,
    height: 50, 
    borderRadius: 10,
    backgroundColor:'#004dcf',
    justifyContent: "center",
     
  },
  appButtonContainer2: {
    top: "8%",
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