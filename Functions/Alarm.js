import React, { Component, useState,useEffect } from 'react';

import {Animated,View, Text, StyleSheet, TouchableOpacity, Alert,Vibration} from "react-native";
import CountDown from 'react-native-countdown-component';
import { Audio } from 'expo-av';
import {createAppContainer}from 'react-navigation';
import {createStackNavigator}from 'react-navigation-stack';

const repeat =[1*1000,2*1000];
const sound = new Audio.Sound();
class Alarm extends React.Component{
   
        constructor(props){
            super(props);
            this.state={
                dur:this.props.duration,
                sec:59,
            }
        }
        
        fadeAni = new Animated.Value(0);
        
        
        timeDivider=()=>{
            this.setState((prevState)=>({dur:prevState.dur-1}))
                    this.interval= setInterval(
                        (()=>{
                        if(this.state.dur>=1){
                            if(this.state.sec==0){
                            this.setState({sec:59}),
                            this.setState((prevState)=>({dur:prevState.dur-1}))
                                
                            }else{
                            
                             this.setState((prevState)=>({sec:prevState.sec-1}))
                             
                            }
                        }else{
                            this.setState({dur:0}),
                            this.setState((prevState)=>({sec:prevState.sec-1}))
                            if(this.state.sec == 0){
                                clearInterval(this.interval);
                            }
                        }

                        }),1000);            
            
      

            
        }
        main=()=>{
            if(this.state.sec>0 || this.state.dur>0){
            if(this.state.dur<=0 && this.state.sec<=10 ){
                return(
                  
                <Animated.View style={{opacity:this.fadeAni}}>
                <View style={styles.timerAlarm}> 
                {this.playSound()}
                <Text style={styles.textStyle}>0{this.state.dur}:{this.state.sec}</Text>
                
               
                </View>
                </Animated.View>
                
                )}else{ return(
                        console.log(this.state.sec, this.state.dur),
                        
                        <View style={styles.timerView}> 
                        
                        <Text style={styles.textStyle}>0{this.state.dur}:{this.state.sec}</Text>
                        

                        </View>
                )
                        
                }
            }else{return(
                <View style={styles.timerAlarm}> 
                 
                        <Text style={styles.textStyle}>0{this.state.dur}:0{this.state.sec}</Text>
                        {Vibration.vibrate(repeat,true),Alert.alert('Alert','Tiden är slut flytta till nästa steg',[{text:'OK',onPress:()=>{Vibration.cancel()}}])}  

                        </View>
            )
             }
            }

        async componentDidMount(){
            this.timeDivider()
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
           
            Audio.setAudioModeAsync({
                allowsRecordingIOS:false,
                interruptionModeIOS:Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
                playsInSilentModeIOS:true,
                interruptionModeAndroid:Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
                shouldDuckAndroid:true,
                playThroughEarpieceAndroid:true
            });
            this.sound = new Audio.Sound();
            const status={
                shouldPlay: false
            };
            this.sound.loadAsync( require('./censor-beep-6.mp3'),status,false);
         }

         playSound(){
            this.sound.playAsync();
          }
            
        
        
        componentWillUnmount(){
            clearInterval(this.interval);
        }

      
        
        
        render(){
        
        
            
    return(
        this.main()
        
        
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

    },
    timerView:{
        position: 'absolute',
        top: 100,
        left: 140,
        width: 100,
        height: 100,
        borderRadius: 100,
        
      },
      timerView:{
        position: 'absolute',
        top: 100,
        left: 5,
        right:0,
        bottom:0,
        width: 88,
        height: 50,
        borderRadius: 10,
        backgroundColor:'#004dcf',
        justifyContent: "center",
      },
      timerAlarm:{
        position: 'absolute',
        top: 100,
        left: 5,
        width: 88,
        height: 50,
        borderRadius: 10,
        justifyContent: "center",
        
        backgroundColor:'#eb142d'
      },
      textStyle:{
          fontSize:28,
          fontWeight:'bold',
          textAlign:'center',
      },appButtonContainer2:{
        top: -0,
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
  });
  

export default Alarm;