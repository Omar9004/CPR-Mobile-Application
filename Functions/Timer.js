import React, { Component, useState,useEffect } from 'react';

import {Animated,View, Text, StyleSheet, TouchableOpacity, Alert,Vibration, TouchableHighlightBase} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import { color } from 'react-native-reanimated';
import {storeArray,test,storeData,dateToString}from "./functionContainer"
var time=0;
var Adren_Qun=0;
var quntity=0; 
class Timer extends React.PureComponent{
   
        constructor(props){
            super(props);
            
            this.state={
                sec:this.props.sec,
                min:this.props.min,
                h:this.props.h,
                Adrenalin:this.props.Adren_Alert,
                Medicine:0
                
            }
        }

      
       /* inputData=async()=>{
          try{
          //console.log(this.state.sec)
           
      
         // sess = this.state.sec;
          await AsyncStorage.setItem('tid',JSON.stringify(time))
          
         
          //await AsyncStorage.multiSet([['def',this.state.def],['def',this.state.med]])
          }catch(err){
              console.log(error);
          }
          
      }
     */
        timeDivider=()=>{
            this.interval= setInterval(
                        (()=>{
                           
                          const seconds = this.state.sec >=59 ? this.setState({sec:this.state.sec=0}): this.setState({sec:this.state.sec+1})
                          const minutes =  this.state.sec ==0 ?this.setState({min:this.state.min+1}): this.setState({min:((this.state.min>59?this.state({min:this.state.min=0}):this.state.min))})
                          const hours = (this.state.min==0)&&(this.state.sec==0) ?this.setState({h:this.state.h+1}): this.setState({h:this.state.h})
                          if(this.state.Adrenalin){this.Adrenaline_Time()}
                        }),1000);            
            
      

            
        }
        StoreData=()=>{
          quntity=get_Adrenaline();
          set_Adrenaline(++quntity)
          storeArray('Events','1mg Adrenaline',dateToString(),test),
          storeData('Adren',get_Adrenaline())
        }
        Adrenaline_Time=()=>{
          if(this.state.min!=0 &&this.state.min%4==0 &&this.state.sec===0){
            Vibration.vibrate(1000,true)
              Alert.alert(
                "Alert Title",
                "My Alert Msg",
                [
                  {
                    text: "Avbryt",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  
                  { text: "Ge 1mg Adrenalin", 
                    onPress: () => {this.StoreData(),Vibration.cancel()}},
                    
                ]
              );
              
          }
        }
        main=()=>{
            return(
                <View style = {styles.timerView}>
                  
                        <Text style={styles.textStyle}> {this.state.h<10?'0'+this.state.h:this.state.h}:{this.state.min<10?'0'+this.state.min:this.state.min}:{this.state.sec<10?'0'+this.state.sec:this.state.sec}</Text>
                       
                </View>
            )
           
            }

         componentDidMount(){
            this.timeDivider()
           
           
         }

          componentWillUnmount(){
           clearInterval(this.interval);
           
           //this.getData()
          
        }

        render(){
          time = {'sec':this.state.sec,'min':this.state.min, 'hh':this.state.h};
          
         //this.getData();
    return(
        this.main()
        
        
     );
    }
}
export function  getTime(){
  return JSON.stringify(time);
}
export function get_Adrenaline(){
  return Adren_Qun;
}
export function set_Adrenaline(Qun){
  Adren_Qun = Qun;
}

export default Timer;
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
   /* timerView:{
       // position: 'absolute',
        top: 100,
        left: 140,
        width: 1000,
        height: 100,
        borderRadius: 100,
        
      },*/
      timerView:{
       // position: 'absolute',
        top: -230,
        left: 100,
        right:0,
        bottom:0,
        width: 200,
        height: 50,
        borderRadius: 10,
        //backgroundColor:'#004dcf',
        justifyContent: "center",
      },
      timerAlarm:{
        //position: 'absolute',
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
  
  


