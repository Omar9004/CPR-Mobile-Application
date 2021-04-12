import React, { Component, useState,useEffect ,useRef} from 'react';
import 'react-native-gesture-handler';
import { Alert, StyleSheet,TouchableOpacity, Text, View, Touchable,Button, TextInput,StatusBar } from 'react-native';
import {createAppContainer}from 'react-navigation';
import {createStackNavigator}from 'react-navigation-stack';
import {NavigationEvents} from 'react-navigation';

import Alarm from '../Functions/Alarm';
import Storage from'../Functions/Storage'
import VF_VT2 from './VF_VT2';




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
      
      Duration:1,
    
      };
    }
  componentDidMount(){
    this.didBlurSubscription =this.props.navigation.addListener(
      'didBlur  ',
      payload =>{
        this.state.Duration
      }
    )
  }

  componentWillUnmount(){
   
      this.didBlurSubscription.remove();
    
  }
    
    
   render(){
        return( 
            <View style={styles.constainer}>
           
            <Text style={styles.textarea_style}>3:de defibrillering {"\n"}
                1mg adrenalin
             </Text>

            <View style ={styles.timerView}>
            <Alarm duration={this.state.Duration} />
            
            </View> 
            <Storage defibrillering='5'  Mediciner='adernaline' />
            <TouchableOpacity style={styles.appButtonContainer} title='Klar' onPress={() => {{this.props.navigation.push('VF_VT2')}}}>
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
  