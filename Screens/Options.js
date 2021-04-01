import React, { Component,useState } from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
//import React1, { useState } from 'react';
import { Alert, StyleSheet,TouchableOpacity, Text, View, Touchable,Button, TextInput,SafeAreaView } from 'react-native';
import {createAppContainer}from 'react-navigation';
import {createStackNavigator}from 'react-navigation-stack';
//const [x, setCount]= useState(0); 
export default class Options extends Component{
    render(){
        return(
            
            <View style={styles.constainer}>
            
            <TouchableOpacity style = {styles.appButtonContainer}
            
            title="VF/VT"
            onPress={() => this.props.navigation.navigate('VF_VT')}
            
            
          >
             <Text style={styles.appButtonText}>VF/VT</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style = {styles.appButtonContainer2}
            
           
            onPress={() => this.props.navigation.navigate('Screen1')}
            
            
          >
             <Text style={styles.appButtonText}>Asystoli</Text>
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
      position: 'absolute',
    top: 50,
    left: 205,
    width: 150,
    height: 150,
    borderRadius: 20,
    backgroundColor:'blue',
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
    appButtonContainer2:{
        top:50,
        left: 20,
        width: 150,
        height: 150,
        justifyContent: 'center',
        //alignSelf: "center",
        backgroundColor: "blue",
        borderRadius: 20,
        //paddingVertical: 10,
        //paddingHorizontal: 12,
        
    }
  
  })