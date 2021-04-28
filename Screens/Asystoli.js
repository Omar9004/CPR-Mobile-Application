import 'react-native-gesture-handler';
import React, { Component} from 'react';
import { Alert, StyleSheet,TouchableOpacity, Text, View, Touchable,Button, TextInput,Pressable } from 'react-native';
import {createAppContainer}from 'react-navigation';
import {createStackNavigator}from 'react-navigation-stack';
import Alarm from '../Functions/Alarm';
import {getAlarmTime} from '../Functions/Alarm';
import Timer from '../Functions/Timer';
import {getTime} from '../Functions/Timer';
import {
  test,
  dateToString,
  storeData,
  storeArray,
  getData,
  getArray,
  DefaultContainer,
} from '../Functions/functionContainer';

//var parses=0;
var counter=0;
var Adren_counter=0;

export default class Asystoli extends React.Component{


  constructor(props){
         super(props);
           this.state={
           
           text:'Ge 1mg adrenalin',
           Adren:0,
           flag:true,
           flag2:true,
          
           counter:118
           };
         }
  componentDidMount(){
   this.interval=setInterval(()=> {this.setState({counter:this.state.counter-1}),getAlarmTime()},1000);
   this.state_manager()
  // this.instractions('10 Sekunder kvar till att göra analysen')
  }
  componentWillUnmount(){
    let isFocused = this.props.navigation.isFocused();
    if(!isFocused){
      counter=counter+1;
      console.log(counter)
    }
    clearInterval(this.interval);
    
  }
  instractions =()=>{
      let al = JSON.parse(getAlarmTime())
      if(al["sec"]<11&&al["min"]==0){
        Flag_ana=false;
        clearInterval(this.interval)
        
        return(<TextInput style={styles.textarea_style} multiline={true}> 10 Sekunder kvar till att göra analysen{"\n"} 
        </TextInput>)
        
      }
     else{
        
        return(<TextInput style={styles.textarea_style} multiline={true}> {this.state.text}{"\n"} 
        </TextInput>)
        
      }
  }
  Adrenaline_State=()=>{
   return( this.setState({flag2:true}),Adren_counter=Adren_counter+1)}
  
  state_manager=()=>{
    
    if(counter%2 ===0){
      this.setState({flag:false})
      this.setState({flag2:false})
    }else{
      this.setState({flag2:false})
      this.setState({text:'Ge 1mg Adrenalin var 4:e minut'})
    }
  }
   Storing_Data=async()=>{
    await storeData('Adren_Asys',Adren_counter)
    test.push({event:'1mg Adrenaline',date :dateToString()})
    await storeArray('Events',test)
  }

         
    render(){
      let times = getTime();
      times = JSON.parse(times);
      this.set
      return( 
             <View style={styles.constainer}>
               
             <Timer sec={times["sec"]} min={times["min"]} h={times["hh"]}/>
             {this.instractions()}
            
             <View style ={styles.timerView}>
             <Alarm duration ={2} />
             </View>
             <TouchableOpacity disabled={this.state.flag===this.state.flag2?false:true} style={this.state.flag2||this.state.flag?styles.Adren_Disabled:styles.appButtonContainer}title='Adrenaline' onPress={async()=> {this.Adrenaline_State(),this.Storing_Data()}}>
            
             <Text style={styles.appButtonText}>Ge 1mg adrenalin</Text>
             
             </TouchableOpacity>
             <TouchableOpacity style={styles.appButtonContainer2} title='Analys' 
            onPress={() => this.props.navigation.navigate('CPR_Start')}
            >
             <Text style={styles.appButtonText}>Till Analysen</Text>
             
             </TouchableOpacity>
             
             </View>
         );
    }
   }
   
   const styles = StyleSheet.create({
       constainer:{
         marginTop:300,
         borderColor:'#000'
         },
       appButtonContainer: {
      
       top: "-40%",
       left: "10%",
       width: "80%",
       height: "20%",
       borderRadius: 10,
       backgroundColor:'blue',
       justifyContent: 'center',
      //alignSelf: "center"
       },
       Adren_Disabled: {
      
        top: "-40%",
        left: "10%",
        width: "80%",
        height: "20%",
        borderRadius: 10,
        backgroundColor:'gray',
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
           
           top: "0%",
           left: "27%",
           width: "50%",
           height: "20%",
           justifyContent: 'center',
           //alignSelf: "center",
           backgroundColor: "#fcb800",
           borderRadius: 10,
           //paddingVertical: 10,
           //paddingHorizontal: 12,
           
       },
       timerView:{
         position: 'absolute',
         top: 0,
         left: 140,
         width: 100,
         height: 100,
         borderRadius: 100,
       },
       textarea_style:{
           fontSize:20,
           fontWeight:'bold',
           top:"-50%",
           left:65,
           height:100,
           width:260,
           borderWidth:2,
           color:'#000',
           backgroundColor:'white',
           borderColor:'gray',
           
   
           
       },Bottom_Button:{
        top: 150,
        left: 100,
        width: 150,
        height: 50,
        justifyContent: 'center',
        backgroundColor: "#fcb800",
        borderRadius: 10,
      }, 
      Bottom_Button2:{
        top: 100,
        left: -100,
        width: 150,
        height: 50,
        justifyContent: 'center',
        backgroundColor: "#fcb800",
        borderRadius: 10,
      },
     
     })
     