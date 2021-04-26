import React, { Component} from 'react';
import { Alert, StyleSheet,TouchableOpacity, Text, View, Touchable,Button, TextInput, Pressable } from 'react-native';
import {
    test,
    dateToString,
    storeData,
    storeArray,
    getData,
    getArray,
    DefaultContainer,
  } from "../Functions/functionContainer";


export default class Summary extends Component{
  constructor(props){
    super(props);
      this.state={
        Defib:0,
        Adren:0,
        Cord:0,
      };
    }

   get =async()=>{
    this.setState({Defib:await getData('Defib')})
    this.setState({Adren:await getData('Adren')})
    this.setState({Cord:await getData('Cord')})
  }

  async componentDidMount(){
   await this.get()
    
  }
 
  
     render(){
      
     
        return (
          
            <View style={styles.Container}>
                
                <Text style={styles.ButtonStyle}>
                    Defibrilation: {this.state.Defib} {"\n"}
            
                    Adernalin: {this.state.Adren} mg{"\n"}
                
                    Cordarone:{this.state.Cord} mg {"\n"}
                </Text>
                <View style={styles.Bottom_Button}>
                <Pressable 
                onPress={()=>{this.props.navigation.navigate('Details')}}
                >
                      
                    <Text style={styles.appButtonText}>Detaljer </Text>
                </Pressable>
                </View>
                <View style={styles.Bottom_Button2}>
                <Pressable 
                onPress={()=>{this.props.navigation.goBack()}}
                >
                      
                    <Text style={styles.appButtonText2}>Stäng </Text>
                </Pressable>
                </View>
            </View>
        )

    }
}
const styles = StyleSheet.create({
    Container: {
      marginTop: 50,
    },
    appButtonText: {
      fontSize: 32,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
      
    },
    appButtonText2: {
      fontSize: 20,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
      
    },
    ButtonStyle:{
     fontSize:35,
     fontWeight:'bold',
     lineHeight: 100,
      position: 'absolute',
      justifyContent: 'center',
      alignSelf:'baseline'
    },
    Bottom_Button:{
        top: "200%",
        left: "10%",
        width: "80%",
        height: "30%",
        justifyContent: 'center',
        backgroundColor: "green",
        borderRadius: 10,
      }, 
      Bottom_Button2:{
        top: "100%",
        left: "5%",
        width: "30%",
        height: "10%",
        justifyContent: 'center',
        backgroundColor: "green",
        borderRadius: 10,
      },
    timerView:{
      position: 'absolute',
      top: 0,
      left: 140,
      width: 100,
      height: 100,
      borderRadius: 100,
    }
  
  })