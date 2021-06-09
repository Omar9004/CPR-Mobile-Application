import React, { Component} from 'react';

import { Alert, StyleSheet,TouchableOpacity, Text, View, Touchable,Button, TextInput,SafeAreaView,Pressable } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Timer from '../Functions/Timer';
import {
  test,
  dateToString,
  storeData,
  storeArray,
  getData,
  getArray,
  DefaultContainer,
  dateToString_Clock,
} from "../Functions/functionContainer";
//import {getNewArray}from './Start'
var parses = 0;
var counter =0;
export default class CPR_Start extends React.PureComponent{
  constructor(props){
    super(props);
      
      this.state={
      klar_state:0,
      klar_flag:true,
      sec:0,
      pressed:false
      };
    }


  
    render(){
     
        return(
            
            <SafeAreaView style={styles.constainer}>
           <Timer sec={0} min={0} h={0}/>
            <TouchableOpacity
            //disabled={this.state.pressed}
            title="VF/VT"
            style={styles.appButtonContainer
            }
            onPress={() =>  {this.setState({pressed:true})&
             storeArray('Events','Hjärtkompresstioner',dateToString(),test)
                }
            }
            
            
          >
             <Text style={styles.appButtonText}>              PÅBÖRJA {"\n"}
              HJÄRTKOMPRESSIONER</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style = {styles.appButtonContainer2}
            
           
            onPress={ () => {this.setState({klar_flag:false}), this.props.navigation.navigate('Options')&//getNewArray().push({event:'Analys', date:dateToString()}),console.log(getNewArray())
             storeArray('Events','Analys',dateToString(),test)
          }}
            
            
          >
             <Text style={styles.appButtonText}>ANALYSERA HJÄRTRYTM</Text>
             
          </TouchableOpacity>

          

        
          
        </SafeAreaView>
        
        
        );
    }
    
}

const styles = StyleSheet.create({
    constainer:{
      marginTop:250,
      borderColor:'#000'
      },
    appButtonContainer: {
    
    top: -100,
    left: 50,
    width: 300,
    height: 100,
    borderRadius:10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'blue'
    },
    
    appButtonText: {
      fontSize: 24,
      color: "#fff",
      fontWeight: "bold",
      textTransform: "uppercase",
     
    },
    appButtonContainer2:{
        top:-50,
        left: 50,
        width: 300,
        height: 100,
        borderRadius:10,
        backgroundColor:'blue',
        justifyContent: 'center',
        alignItems: 'center'
        
    },
    
    appButtonDisabled:{
    top: -100,
    left: 50,
    width: 300,
    height: 100,
    borderRadius:10,
    backgroundColor:'gray',
    justifyContent: 'center',
    alignItems: 'center'
    },
    klarButtonDisabled:{
      top: 0,
      left: 50,
      width: 300,
      height: 80,
      borderRadius:10,
      backgroundColor:'gray',
      justifyContent: 'center',
      alignItems: 'center'
      },
    ButtonDisabledText: {
      fontSize: 24,
      color: "#555555",
      fontWeight: "bold",
      textTransform: "uppercase",
     
    },
    Bottom_Button:{
      top: 0,
      left: 50,
      width: 300,
      height: 80,
      justifyContent: 'center',
      alignItems:'center',
      backgroundColor: "green",
      borderRadius: 10,
    },
  
  })