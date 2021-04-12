import React, { Component, useState,useEffect } from 'react';
import {StyleSheet,Text,View,TouchableOpacity, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


export default class Storage extends React.Component{
    
    constructor(props){
        super(props);
      
        this.state={
            def:this.props.defibrillering,
            med:this.props.Mediciner,
        }
    }

    inputData=async()=>{
        try{
        //,{med:this.state.med}
        console.log(this.state.def);
       
        await AsyncStorage.setItem('def',JSON.stringify(this.state.def))
       
        //await AsyncStorage.multiSet([['def',this.state.def],['def',this.state.med]])
        }catch(err){
            console.log(error);
        }
    }

    getData=async()=>{
        
        try{
            
            
            const value = await AsyncStorage.getItem('def');
            
            let pasres= JSON.parse(value);
           // const Mediciner = await AsyncStorage.getItem('def');
            if(pasres !== null){
                alert(pasres)
               
                
            }
            /*if(Mediciner !== null){
                this.setState({def:Mediciner})
            }*/
        }catch(e){
            console.log("Empty");
        }
    }
    main=()=>{
       //<Button title='Save' onPress={()=> this.inputData() }></Button>
        return(
           
            <View>
                
                
              
            </View>

        );
    }
    render(){
       
        return(
      
          
          this.main()
        );
    }

}



