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

var times=0;
export default class Summary extends React.Component{
  constructor(props){
    super(props);
      this.state={
        Defib:0,
        Defib1:0,
        DefibTot:0,
        Adren_VF:0,
        Adren_Asys:0,
        Adren_tot:0,
        Cord:0,
      };
    }

   get =async()=>{
    times = JSON.parse(await getData('Time'))
    nthis.setState({Defib:await getData('Defib')})
    this.setState({Defib1:await getData('Defib1')})
    if(this.state.Defib!=undefined&&this.state.Defib1!=undefined){
      let Defib_tot=JSON.parse(this.state.Defib1)+JSON.parse(this.state.Defib)
      this.setState({DefibTot:Defib_tot})
    }else{
      this.setState({DefibTot:this.state.Defib1!==undefined?this.state.Defib1:this.state.Defib})
    }


    this.setState({Adren_VF:await getData('Adren')})
    this.setState({ Adren_Asys:await getData('Adren_Asys')})
    let AdrenAsys= this.state.Adren_Asys;
    let AdrenVF= this.state.Adren_VF;

    if((AdrenAsys!==undefined)&&(AdrenVF!==undefined)){
    let AdrenTot=JSON.parse(AdrenVF)+JSON.parse(AdrenAsys);
    this.setState({ Adren_tot:AdrenTot})
 
  
    
  }else{this.setState({Adren_tot:this.state.Adren_VF!==(undefined&&0)?this.state.Adren_VF:this.state.Adren_Asys})}

    this.setState({Cord:await getData('Cord')})
    
    
  }

  async componentDidMount(){    
   await this.get()
    
  }
  
     render(){
      
     
        return (
          
            <View style={styles.Container}>
                
                <Text style={styles.ButtonStyle}>
                      Tid: 0{times['hh']}:{times['min']<10?'0'+times['min']:times['min']}:{times['sec']<10?'0'+times['sec']:times['sec']}{"\n"}
                      Defibrilation: {this.state.DefibTot} {"\n"}
            
                      Adernalin: {this.state.Adren_tot} mg{"\n"}
                
                      Cordarone:{this.state.Cord} mg {"\n"}
                    
                </Text>
                <View style={styles.Bottom_Button}>
                <Pressable 
                onPress={()=>{this.props.navigation.navigate('Details')}}
                >
                      
                    <Text style={styles.appButtonText}>Detaljer </Text>
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