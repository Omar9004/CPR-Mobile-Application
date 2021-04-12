import React, { Component, useState,useEffect } from 'react';

import {Animated,View, Text, StyleSheet, TouchableOpacity, Alert,Vibration} from "react-native";
import CountDown from 'react-native-countdown-component';

import {createAppContainer}from 'react-navigation';
import {createStackNavigator}from 'react-navigation-stack';

const repeat =[1*1000,2*1000];

class Alarm extends React.Component{
        constructor(props){
            super(props);
            this.state={
                dur:this.props.duration,
                
            }
        }
      
        fadeAni = new Animated.Value(0);
        const =()=>{
          if(this.state.dur<10){
            
          }
        }
        componentDidMount(){
            Animated.loop(
                Animated.sequence([
                    Animated.timing(this.fadeAni,{
                        toValue:0,
                        duration:500,
                        useNativeDriver:true,
                    }),
                    Animated.timing(this.fadeAni,{
                        toValue:1,
                        duration:500,
                        useNativeDriver:true,
                    })
                ])
            ).start();
        }
        render(){
            
            
    return(
      
        <View>
        <Animated.View style={{opacity:this.fadeAni}}>
        <CountDown
        until={this.state.dur}
        
        timeToShow={['M', 'S']}
        //onChange = {}
        onFinish={() => { Vibration.vibrate(repeat,true),Alert.alert('Alert','Tiden är slut flytta till nästa steg',[{text:'OK',onPress:()=>{Vibration.cancel()}}])}}
        digitStyle={{backgroundColor: '#ee0303', borderWidth: 2, borderColor: '#ee0303'}}
        timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
        separatorStyle={{color: '#000'}}
        showSeparator
        
        //alert('finished');Vibration.vibrate(2*1000)
        size={20}
    
        >
            
        </CountDown>
        
        </Animated.View>
        </View>
        
     );
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    },
    fadingContainer: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      backgroundColor: "powderblue"
    },
    fadingText: {
      fontSize: 28,
      textAlign: "center",
      margin: 10
    },
    buttonRow: {
    
      flexDirection: "row",
      marginVertical: 16,
      backgroundColor: "red",

    }
  });
  

export default Alarm;