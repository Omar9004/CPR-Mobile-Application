import React, { Component, useState,useEffect } from 'react';

import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import Torch from "react-native-torch"; 
import {createAppContainer}from 'react-navigation';
import {createStackNavigator}from 'react-navigation-stack';
//const [isTorchOn, setIsTorchOn] = useState(false);
export default class Light extends React.Component{
    
    OnPressOn=()=>{
        Torch.switchState(true);
    }
    OnPressOff=()=>{
        Torch.switchState(false);
    }
    render(){
        return(
          <View style={styles.container}>
              <Text style={styles.Heading}>A simple Torch App</Text>
              <TouchableOpacity style={styles.Buttons} onPress={this.OnPressOn}>
                  <Text style={styles.text}>
                    on
                  </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.Buttons}onPress={this.OnPressOff}>
                  <Text style={styles.text}>
                    off
                  </Text>
              </TouchableOpacity>
          </View>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#FFF"
    },
    Heading:{
        fontSize:20,
        color:"#161F3D",
        marginBottom:20
    },
    Buttons:{
        height:50,
        width:100,
        borderRadius:10,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#161F3D",
        marginTop:10
    },
    text:{
        color:"#FFF"
    }

})