import React, { Component} from 'react';

import { Alert, StyleSheet,TouchableOpacity, Text, View, Touchable,Button, TextInput,SafeAreaView,Pressable } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Timer from '../Functions/Timer';
import {secKey} from '../Functions/Timer';
var parses = 0;
export default class CPR_Start extends Component{
  constructor(props){
    super(props);
      
      this.state={
      klar_state:0,
      klar_flag:true,
      sec:0,
      pressed:false
      };
    }
   
  getData=async()=>{
        
    try{
      const value = await AsyncStorage.getItem(secKey);
      parses=await JSON.parse(value);
      
       
    }catch(e){
        console.log("Empty");
    }
}
 
move = async () => {
   await this.getData();
  
}


  
    render(){
   
        return(
            
            <View style={styles.constainer}>
           <Timer sec={0} min={0} h={0}/>
            <Pressable
            disabled={this.state.pressed}
            title="VF/VT"
            style={({pressed}) => [
              {
                backgroundColor: pressed ? 'green' : 'blue',
              },
              this.state.pressed?styles.appButtonDisabled:styles.appButtonContainer
            ]}
            onPress={() =>  {this.setState({pressed:true})}}
            
            
          >
             <Text style={styles.appButtonText}>              PÅBÖRJA {"\n"}
              HJÄRTKOMPRESSIONER</Text>
          </Pressable>
          
          <TouchableOpacity style = {styles.appButtonContainer2}
            
           
            onPress={() => {this.setState({klar_flag:false})}}
            
            
          >
             <Text style={styles.appButtonText}>ANALYSERA HJÄRTRYTM</Text>
             
          </TouchableOpacity>

          <Pressable style = {this.state.klar_flag?styles.klarButtonDisabled:styles.Bottom_Button}
            disabled={this.state.klar_flag}
           
            onPress={async() => { await this.move(),this.props.navigation.navigate('Options',{time:parses})}}
            
            
          >
             <Text style={styles.appButtonText}>Klar</Text>
             
          </Pressable>
        
          
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
    
    top: -150,
    left: 50,
    width: 300,
    height: 100,
    borderRadius:10,
    justifyContent: 'center',
    alignItems: 'center'
    },
    
    appButtonText: {
      fontSize: 24,
      color: "#fff",
      fontWeight: "bold",
      textTransform: "uppercase",
     
    },
    appButtonContainer2:{
        top:-80,
        left: 50,
        width: 300,
        height: 100,
        borderRadius:10,
        backgroundColor:'blue',
        justifyContent: 'center',
        alignItems: 'center'
        
    },
    appButtonDisabled:{
    top: -150,
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