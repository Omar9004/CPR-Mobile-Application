import 'react-native-gesture-handler';
import React, { Component} from 'react';
import { Alert, StyleSheet,TouchableOpacity, Text, View, Touchable,Button, TextInput,Pressable,Modal,KeyboardAvoidingView,Platform } from 'react-native';
import {createAppContainer}from 'react-navigation';
import {createStackNavigator}from 'react-navigation-stack';
import Alarm from '../Functions/Alarm';
import {getAlarmTime} from '../Functions/Alarm';
import Timer from '../Functions/Timer';
import {get_Adrenaline,set_Adrenaline} from '../Functions/Timer';

import {getTime} from '../Functions/Timer';
import {
  text,
  test,
  dateToString,
  storeData,
  storeArray,
  getData,
  getArray,
  DefaultContainer,
  dateToString_Clock
} from '../Functions/functionContainer';

//var parses=0;
var counter=0;
var Adren_counter=0;
var AlarmTime;
var flag1;
var times;
export default class Asystoli extends React.Component{


  constructor(props){
         super(props);
         flag1=true;
           this.state={
           
           text:'Ge 1mg adrenalin',
           Adren:0,
           flag:true,
           flag2:false,
           textStoring:"",
           modal_flag:false,
           stop:true,
           counter:118
           };
         }
  componentDidMount(){
   this.interval=setInterval(()=> {getAlarmTime(), this.state_manager1()},1000);
  

   
  // this.instractions('10 Sekunder kvar till att göra analysen')
  }
  componentWillUnmount(){
    let isFocused = this.props.navigation.isFocused();
    if(!isFocused){
      counter=counter+1;
    }
    clearInterval(this.interval);
    
  }
  instractions =(text)=>{
      /*let al = JSON.parse(getAlarmTime())
      if(al["sec"]<11&&al["min"]==0){
        //Flag_ana=false;
        this.setState({coutner:this.state.counter-1})
        clearInterval(this.interval)
        
        
        return(<TextInput style={styles.textarea_style} multiline={true} editable={false}> 10 Sekunder kvar till att göra analysen{"\n"} 
        </TextInput>)
        
      }
     else{*/
        
        return(<Text style={styles.textarea_style} multiline={true}> {this.state.text}{"\n"} 
        </Text>)
        
      //}
  }
  Alarm_Func=()=>{
    let al = JSON.parse(getAlarmTime())
   if(al["min"]==0&& al["sec"]<=0){
     clearInterval(this.interval);
     return(<Alarm duration ={al["min"]} sec={al["sec"]}status={false}/>)
   }else{
     if(al["min"]==0&& al["sec"]<=10){
     return(<Alarm duration ={al["min"]} sec={al["sec"]} status={true} status1={false} />)
   }else{
    return(<Alarm duration ={al["min"]} sec={al["sec"]}status={true} status1={true}/>)
      }
    }
  }
  AlertButton=()=>{
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Avbryt",
          style: "cancel"
        },
        
        { text: "OK", 
          onPress: () => {this.props.navigation.navigate('CPR_Start')}}
      ]
    );
  }
  Adrenaline_State=()=>{
   return( this.setState({flag2:true}))}

   state_manager1=()=>{
    let al = JSON.parse(getAlarmTime())
    
    if(al["min"]==0 && al["sec"]<11){
      this.setState({text:"10 Sekunder kvar till analysen"})
      //this.setState({flag2:true})
      
      clearInterval(this.interval);
      
    }
    
   }
  
  state_manager=()=>{
    let times1 =JSON.parse(getTime());
    let al = JSON.parse(getAlarmTime())
    if(al["min"]==0 && al["sec"]<4){
      this.setState({flag2:false})
      clearInterval(this.interval);
      
    }else{
     if (times1["min"]%1==0&times1["min"]!=0&times1["sec"]===0){
      this.setState({flag:false})
      this.setState({flag2:false})
      }
    }
    /*if(counter%2 ===0){
      this.setState({flag:false})
      this.setState({flag2:false})
    }else{
      this.setState({flag2:false})
      this.setState({text:'Ge 1mg Adrenalin var 4:e minut'})
      disabled={this.state.flag===this.state.flag2?false:true} style={this.state.flag2||this.state.flag?styles.Adren_Disabled:styles.appButtonContainer}
    }*/
  }
   Storing_Data=()=>{
    Adren_counter =get_Adrenaline()
    console.log(Adren_counter)
    set_Adrenaline(++Adren_counter)
     storeData('Adren',get_Adrenaline())
    //test.push({evenmt:'1mg Adrenaline',date :dateToString()})
     storeArray('Events','1mg Adrenaline',dateToString(),test)
  }

         
    render(){
      times = getTime();
      times = JSON.parse(times);
    

      AlarmTime=getAlarmTime();
      AlarmTime=JSON.parse(AlarmTime);      
      return( 
             <View style={styles.constainer}>
               
             <Timer sec={times["sec"]} min={times["min"]} h={times["hh"]} Adren_Alert={true}/>
             {this.instractions()}
            
             <View style ={styles.timerView}>
            {this.Alarm_Func()}
             </View>
             <TouchableOpacity disabled={this.state.flag2} style={this.state.flag2?styles.Adren_Disabled:styles.appButtonContainer} onPress={()=> {this.Adrenaline_State(),this.Storing_Data()}}>
            
             <Text style={styles.appButtonText}>Ge 1mg adrenalin</Text>
             
             </TouchableOpacity>
             <TouchableOpacity style={styles.appButtonContainer2}
          onPress={()=> {this.AlertButton()}}> 
          <Text style={styles.appButtonText}>Till Analysen</Text>
          </TouchableOpacity>
          <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modal_flag}
          onRequestClose={() => {
            this.setState({modal_flag:!this.state.modal_flag});
          }}
        >
          <KeyboardAvoidingView style={styles.centeredView}  behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={styles.modalView}>
              <TextInput style={styles.modalText}  blurOnSubmit={true} autoCorrect={true} multiline={true} onChangeText={(text)=>{this.setState({textStoring:text})}}> </TextInput>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {this.setState({modal_flag:!this.state.modal_flag}),//text.push({event:this.state.textStoring,date :dateToString_Clock()})
                this.state.textStoring!==""? storeArray('Text',this.state.textStoring,dateToString_Clock(),text):""}}
              >
                
                <Text style={styles.textStyle}>{this.state.textStoring===''?'Stäng':'Spara'}</Text>
              </Pressable>
            </View>
          </KeyboardAvoidingView>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => this.setState({modal_flag:!this.state.modal_flag})}
        >
          <Text style={styles.textStyle}>Lägg till</Text>
        </Pressable>
             
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
         //position: 'absolute',
         
          // position: 'absolute',
        top: "0%",
        left: "40%",
        right:0,
        bottom:0,
        width: 88,
        height: 50, 
        borderRadius: 10,
        backgroundColor:'#004dcf',
        justifyContent: "center",
         
     
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
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
     
      modalView: {
        //margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 10,
          height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 10,
        //padding: 15,
        //textAlign:'center',
        justifyContent:'center',
        width:100,
        height:50,
        elevation: 2
      },
      
      buttonOpen: {
        top:"-140%",
        left:30,
        height:50,
        width:90,
        backgroundColor: "black",
        justifyContent: 'center'
  
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize:18
        
  
      },
      modalText: {
       // marginBottom: 15,
        width:300,
        height:200,
        fontSize:20,
        //textAlign: '',
        backgroundColor:"silver"
      }
     
     })
     