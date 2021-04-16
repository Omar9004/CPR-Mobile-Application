import React, { Component, useState,useEffect ,useRef} from 'react';
import 'react-native-gesture-handler';
import { Alert, StyleSheet,TouchableOpacity, Text, View, Touchable,Button, TextInput,StatusBar } from 'react-native';
import {createAppContainer}from 'react-navigation';
import {createStackNavigator}from 'react-navigation-stack';
import {NavigationEvents} from 'react-navigation';
import Timer from '../Functions/Timer';
import Alarm from '../Functions/Alarm';
import Storage from'../Functions/Storage'
import VF_VT2 from './VF_VT2';
import {secKey} from '../Functions/Timer';

import AsyncStorage from '@react-native-community/async-storage';



var parses=0;
export default class VF_VT extends React.Component{
 
   navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.otherParam : 'VT/VF',
      /* These values are used instead of the shared configuration! */
      headerStyle: {
        backgroundColor: navigationOptions.headerStyle.backgroundColor,
      },
      headerTintColor: navigationOptions.headerTintColor,
    };
  };
  constructor(props){
    super(props);
      
      this.state={
      
      sec:0,
      min:0,
      h:0
    
      };
    }
    

 /*  async  componentDidMount() {
       this.getData();
       //console.log(secKey)
     /* try{  
        const secValue = await AsyncStorage.getItem(secKey);
        //let parses = JSON.stringify(secValue);
        if(secValue!==null){
          console.log(secValue)
        }
      }catch(e){
        console.log(empty)
      }
    }*/
  
    AlertButton=()=>{
      
      Alert.alert(
        "Alert Title",
        "My Alert Msg",
        [
          {
            text: "Avbryt",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => {this.props.navigation.navigate('VF_VT2',{sec:parses.sec, min:parses.min, hh:parses.hh})}}
        ]
      );
    }
   /* componentDidMount(){
      this.getData();
    }*/
   componentWillUnmount(){
      this.getData();
    }
    getData=async()=>{
        
      try{
          
          
          const value = await AsyncStorage.getItem(secKey);
          
         parses= JSON.stringify(value);
         // const Mediciner = await AsyncStorage.getItem('def');
          if(parses !== null){
             console.log(parses)
             
              
          }
          /*if(Mediciner !== null){
              this.setState({def:Mediciner})
          }*/
      }catch(e){
          console.log("Empty");
      }
  }
  
    
   render(){
    
        return( 
            <View style={styles.constainer}>
              
            <Text style={styles.textarea_style}>3:de defibrillering {"\n"}
                1mg adrenalin 
             </Text>
            <Timer sec={this.state.sec}min={this.state.min}h={this.state.h} />
            
            <View style ={styles.timerView}>
            <Alarm duration={1} />

            </View> 
            <Storage defibrillering='5'  Mediciner='adernaline' />
            <TouchableOpacity style={styles.appButtonContainer} title='Klar' onPress={() => {this.AlertButton()}}>
            <Text style={styles.appButtonText}>Klar</Text>
            
            
            
            </TouchableOpacity>
           
           
            <TouchableOpacity style={styles.appButtonContainer2} title='Avsluta'
            onPress={() => this.props.navigation.popToTop()}
            >
            <Text style={styles.appButtonText}>Avsluta</Text>
            
            </TouchableOpacity>
            
            </View>
            
            
        );
  }
}

const styles = StyleSheet.create({
    constainer:{
      marginTop:250,
      borderColor:'#000'
      },
    appButtonContainer: {
    top: 100,
    left: 205,
    width: 150,
    height: 150,
    borderRadius: 10,
    backgroundColor:'red',
    justifyContent: 'center',
   //alignSelf: "center"
    },
    appButtonText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    },
    appButtonContainer2:{
        top: -49,
        left: 20,
        width: 150,
        height: 150,
        justifyContent: 'center',
        //alignSelf: "center",
        backgroundColor: "red",
        borderRadius: 10,
        //paddingVertical: 10,
        //paddingHorizontal: 12,
        
    },
    timerView:{
      position: 'absolute',
      top:0,
      left: 140,
      width: 100,
      height: 100,
      borderRadius: 100,
    },
    textarea_style:{
        fontSize:20,
        fontWeight:'bold',
        top:-90,
        left:65,
        height:100,
        width:260,
        borderWidth:2,
        color:'#000',
        backgroundColor:'white',
        borderColor:'gray',
        

        
    }
  
  })
  