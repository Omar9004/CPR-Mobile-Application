import React, { Component, useState,useEffect } from 'react';

import {Animated,View, Text, StyleSheet, TouchableOpacity, Alert,Vibration} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import { color } from 'react-native-reanimated';

class Timer extends React.Component{
   
        constructor(props){
            super(props);
            
            this.state={
                sec:this.props.sec,
                min:this.props.min,
                h:this.props.h,
                
            }
        }
        inputData=async()=>{
          try{
          //console.log(this.state.sec)
          let time = {'sec':this.state.sec};
         // sess = this.state.sec;
          await AsyncStorage.setItem('tid',JSON.stringify(time))
         
          //await AsyncStorage.multiSet([['def',this.state.def],['def',this.state.med]])
          }catch(err){
              console.log(error);
          }
          
      }
      getData=async()=>{
        
        try{
            
            
            const value = await AsyncStorage.getItem(secKey);
            
            let pasres= JSON.parse(value);
           // const Mediciner = await AsyncStorage.getItem('def');
            if(pasres !== null){
               console.log(pasres)
               
                
            }
            /*if(Mediciner !== null){
                this.setState({def:Mediciner})
            }*/
        }catch(e){
            console.log("Empty");
        }
    }
       
        
        
        timeDivider=()=>{
            this.interval= setInterval(
                        (()=>{
                           
                            const seconds = this.state.sec >=59 ? this.setState({sec:this.state.sec=0}): this.setState({sec:this.state.sec+1})
                            const minutes =  this.state.sec ==0 ?this.setState({min:this.state.min+1}): this.setState({min:((this.state.min>59?this.state({min:this.state.min=0}):this.state.min))})
                            const hours = (this.state.min==0)&&(this.state.sec==0) ?this.setState({h:this.state.h+1}): this.setState({h:this.state.h})
                          
                        }),1000);            
            
      

            
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
           //this.inputData()
            
        }

      
        
        
        render(){
          this.inputData();
         // this.getData();
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
   /* timerView:{
       // position: 'absolute',
        top: 100,
        left: 140,
        width: 1000,
        height: 100,
        borderRadius: 100,
        
      },*/
      timerView:{
        position: 'absolute',
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
  

export default Timer;
export const secKey= 'tid';