//import React from 'react';
import React, { Component, useState,useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

import { Alert, StyleSheet,TouchableOpacity, Text, View, Touchable,Button, TextInput,ScrollView } from 'react-native';
import {createAppContainer}from 'react-navigation';
import {createStackNavigator}from 'react-navigation-stack';


 

  function Screen1 (){
    var sum1=0;
    const [x, setCount]= useState(0); 
    const [value, set] = useState("");
    const [value2,onChangeText2] = useState("");
    const  [sum, multi]= useState(0); 
  return (
    <ScrollView>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
     
      <Text>Hello</Text>
      
      
      
      <Text> counter:{x}</Text>
      <Text> output:{sum}</Text>
      < View style={[{width: "60%", margin: 10, backgroundColor:"Green"}]}>
      <Button title ="CPR"
      color = "#000080"
    
      onPress = {()=>setCount(x+1)}
      
      
     />
     < View style={[{width: "70%", margin: 20, backgroundColor:"Green"}]}></View>
     <Button title= "reset the counter"
         onPress = {()=>setCount(0)}
        
         
         color = "#FF0000"   
     ></Button>
       
     
     <TextInput
          style = {{height:40,borderColor:'blue',borderWidth:1}}
          onChangeText ={text => set(text)}
          value = {value}
          keyboardType = "number-pad"
      />
      
     <TextInput
          style = {{height:40,borderColor:'blue',borderWidth:1}}
          onChangeText ={text => onChangeText2(text)}
          value2 = {value2}
          keyboardType = "number-pad"
      />
      < View style={[{width: "60%", margin: 10, backgroundColor:"Green"}]}></View>
       <Button
        title="multi"
        
        onPress={sum=> multi(()=>Multiply(value,value2))}
        

      ></Button>
       
      
     </View>
  
      
     </View>
    
     </ScrollView>

  );
  
}
 
function Multiply(a,b){
  return( a*b);
}
export default Screen1;

