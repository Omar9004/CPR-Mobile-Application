import React, { Component} from 'react';
import 'react-native-gesture-handler';
import { Alert, StyleSheet,TouchableOpacity, Text, View, Touchable,Button, TextInput,Modal, Pressable,Platform } from 'react-native';
import Timer from '../Functions/Timer';
import Alarm from '../Functions/Alarm';
import {getAlarmTime} from '../Functions/Alarm';
import {getTime} from '../Functions/Timer';
import AsyncStorage from '@react-native-community/async-storage';


import {
  dateToString_Clock,
  text,
  test,
  dateToString,
  storeData,
  storeArray,
  getData,
  getArray,
  DefaultContainer,
} from '../Functions/functionContainer';


var times=0;
var VfFlag=true;
var Vf1Flag=false;
var Vf2Flag=false;
var counter= 0;
export default class VF_VT extends React.Component{
 
 
  constructor(props){
    super(props);
    
      this.state={
      Defib:1,
      Defib1:1,
      Adrenalin:0,
      Cordarone:0,
      Add_Cordarone:2,
      Button_Pressed:0,
      counter:118,

      textStoring:"",

      VF_flag:true,
      VF1_flag:false,
      VF2_flag:false,
      modal_flag:false,
      Button_Pressedf:false,
      Defib_flag:false,
      Defib_flag2:false,
      Cord_flag:true,
      Ader_flag:true,
      };
    }
    componentDidMount(){
      this.interval=setInterval(()=> {this.setState({counter:this.state.counter-1}),getAlarmTime()},1000);
      this.instractions()
      
      
     }
     componentWillUnmount(){
      let isFocused=this.props.navigation.isFocused()
      /*if(!isFocused&&Vf2Flag){
        VfFlag=false
        Vf1Flag=false
        Vf2Flag=true
      }*/if(!isFocused){
        VfFlag=false
        Vf1Flag=true
        counter++;
      }
      clearInterval(this.interval);
            
     }
     instractions =()=>{
         let al = JSON.parse(getAlarmTime())
         if(al["sec"]<11&&al["min"]==0){
           clearInterval(this.interval)
           
           return(<TextInput style={styles.textarea_style} multiline={true} editable={false}> 10 Sekunder kvar till att göra analysen{"\n"} 
           </TextInput>)
           
         }
        else{
           
           return(<TextInput style={styles.textarea_style}multiline={true} editable={false}> 3:de defibrillering {"\n"}
           och sedan 1mg adrenalin 
           </TextInput>)
           
         }
     }
    state_managment=async()=>{
      this.setState({Button_Pressed:this.state.Button_Pressed+1}), //Button counter 
      this.setState({Defib:this.state.Defib+1}),                   //Button counter for storing data
      await storeData('Defib',this.state.Defib)
      test.push({event:'Defibrellering',date :dateToString()})
      await storeArray('Events',test)
     // this.setState({Adrenalin:1})
    
     if(this.state.Button_Pressed==3){
          this.setState({Ader_flag:false})
          this.setState({Cord_flag:false})
          this.setState({Adrenalin:1})
          this.setState({Cordarone:300})
          Alert.alert("Alert","Ge patienten mediciner")
      }
      if(this.state.Button_Pressed==5){
        Vf1Flag=false
        Vf2Flag=true
        this.setState({Cord_flag:false})
        //this.setState({Cordarone:this.state.Cordarone+150})
      }
      if(this.state.Button_Pressed>5){
        this.setState({Add_Cordarone:this.state.Add_Cordarone-1})
        if(this.state.Add_Cordarone==0){
          this.setState({Cord_flag:false})
          this.setState({Add_Cordarone:2})
        }
      }
          
      
    }
 
   Medcin_State=()=>{
    if(!this.state.Cord_flag){
      
    this.setState({Cordarone:300})}
    console.log(this.state.Cordarone) 
   }
   

    AlertButton=()=>{
      Alert.alert(
        "Alert Title",
        "My Alert Msg",
        [
          {
            text: "Avbryt",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          
          { text: "OK", 
            onPress: () => {this.props.navigation.navigate('CPR_Start')}}
        ]
      );
    }
   
  
    main=()=>{
      //this.state_managment2()
      
     if(VfFlag){
      return(this.VF());

     }
     if(Vf1Flag){
      return(
      
      this.VF1()
      )
      }else if(Vf2Flag){

        return(
        this.VF2())
      }
    }
    VF=()=>{
      return(
       
               <View >
               <Pressable 
                    title='Defibrillera' disabled={this.state.Defib_flag2} 
                    onPress={async() => {this.setState({Defib_flag2:true}),await storeData('Defib1',this.state.Defib1),test.push({event:'Defibrellering',date :dateToString()})
                    await storeArray('Events',test)}}
                    style={this.state.Defib_flag2?styles.Defib_Disabled_Button2:styles.Defib_Button2}
                    >
                    <Text style={styles.appButtonText}> Defibrillera patient</Text>
                    
                    </Pressable>
                   
                    
                    <View >
                    <Pressable style={styles.appButtonDisabled3} disabled={this.state.Ader_flag} 
                    
                    >
                    <Text style={styles.appButtonText}></Text>
                    
                    </Pressable>
                    </View>
                    <View >
                    <Pressable disabled={this.state.Cord_flag} style={this.state.Cord_flag?styles.appButtonDisabled3:styles. Cordarone_Button}>
                      <Text style={styles.appButtonText}></Text>
                      </Pressable>
                      </View>
                      </View>
        );
    }


   
    VF1=()=>{
      
      return(
      <View >
       <Pressable 
            title='Klar' disabled={this.state.Button_Pressedf} 
            onPress={async() => {await this.state_managment()}}
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? 'green'
                  : 'blue'
              },
              styles.Defib_Button
            ]}
            >
            <Text style={styles.appButtonText}>{this.state.Button_Pressed}x defibrillering </Text>
            
            
            
            </Pressable>
           
            
            
            <Pressable style={this.state.Ader_flag?styles.appButtonDisabled2:styles.Adrenalin_Button} disabled={this.state.Ader_flag} title='Försätt HLR'
            onPress={async()=>{this.Medcin_State(),await storeData('Adren',this.state.Adrenalin),test.push({event:'1mg Adrenaline',date :dateToString()})
            await storeArray('Events',test),this.setState({Ader_flag:true}) }}
            >
            <Text style={styles.appButtonText}>1mg Adrenalin</Text>
            
            </Pressable>
            
            
            <Pressable disabled={this.state.Cord_flag} style={this.state.Cord_flag?styles.appButtonDisabled:styles. Cordarone_Button}
               title='Cordarone' onPress={async()=> {this.Medcin_State(),await storeData('Cord',this.state.Cordarone),test.push({event:'300mg Cordarone',date :dateToString()})
               await storeArray('Events',test),this.setState({Cord_flag:true})}}>
              <Text style={styles.appButtonText}>Ge 300 mg Cordarone</Text>
              </Pressable>
             
              </View>
        
      );
    } 
    
    VF2=()=>{
      return(
        <View >
          
            <Pressable 
            title='Klar' disabled={this.state.Button_Pressedf} 
            onPress={async() => {await this.state_managment()}}
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? 'green'
                  : 'blue'
              },
              styles.Defib_Button
            ]}
            >
            <Text style={styles.appButtonText}>{this.state.Button_Pressed}x defibrillering </Text>
            </Pressable>
            <Pressable style={this.state.Ader_flag?styles.appButtonDisabled2:styles.Adrenalin_Button} title='Adrenalin' onPress={() => {this.setState({Ader_flag:true})}}>
              <Text style={styles.appButtonText}>Ge 1 mg Adrenalin</Text>
              </Pressable>

              <Pressable disabled={this.state.Cord_flag} style={this.state.Cord_flag?styles.appButtonDisabled:styles. Cordarone_Button}
               title='Cordarone' onPress={async()=> {this.setState({Cordarone:this.state.Cordarone+150}),test.push({event:'150mg Cordarone',date :dateToString()})
               await storeArray('Events',test),await storeData('Cord',this.state.Cordarone),this.setState({Cord_flag:true})}}>
              <Text style={styles.appButtonText}>Ge 150 mg Cordarone</Text>
              </Pressable>
              </View>
              
              
        );
    }

    
   
  
    
   render(){
    times = getTime();
    times = JSON.parse(times);
   
    return(
          this.instractions(),
          <View >
          <View style={styles.time}><Timer  sec={times["sec"]} min={times["min"]} h={times["hh"]} /></View>
           {this.main()}
           
           <View style ={styles.timerView}>
              <Alarm duration={2} />

              </View> 
           <View style={styles.centeredView}>
           {this.instractions()}
          <Pressable style={styles.Bottom_Button}
          onPress={()=> {this.AlertButton()}}> 
          <Text style={styles.appButtonText}>Till Analysen</Text>
          </Pressable>

         

          <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modal_flag}
          onRequestClose={() => {
            this.setState({modal_flag:!this.state.modal_flag});
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput style={styles.modalText}  blurOnSubmit={true} autoCorrect={true} multiline={true} onChangeText={(text)=>{this.setState({textStoring:text})}}> </TextInput>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={async() => {this.setState({modal_flag:!this.state.modal_flag}),text.push({event:this.state.textStoring,date :dateToString_Clock()})
                await storeArray('Text',text)}}
              >
                
                <Text style={styles.textStyle}>Lämna in</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => this.setState({modal_flag:!this.state.modal_flag})}
        >
          <Text style={styles.textStyle}>Lägg till</Text>
        </Pressable>
      </View>
      <TouchableOpacity style = {styles.ButtonStyle2}
              
              title="Summary"
              onPress={() => this.props.navigation.navigate('Summary')}
              
              
            >
              
              
               <Text style={styles.SummaryButtonText}>Summary</Text>
            </TouchableOpacity>

           </View> 
        
            
        );
  }
}


const styles = StyleSheet.create({
    constainer:{
      marginTop:-150,
      borderColor:'#000',
      },
      time:{
        top:260,
        
      },
    
    Defib_Button: {
    //marginBottom:10,
    top:200,
    left: 40,
    width: 300,
    height: 100,
    borderRadius: 10,
    backgroundColor:'blue',
    justifyContent: 'center',
    
    },
    Defib_Button2: {
      //marginBottom:10,
      top: 300,
      left: 15,
      width: 350,
      height: 100,
      borderRadius: 10,
      backgroundColor:'blue',
      justifyContent: 'center',
      },
    appButtonText: {
      fontSize: 20,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    },
    Adrenalin_Button:{
      //marginBottom:10,
      top:230,
      left: 40,
      width: 300,
      height: 50,
      borderRadius: 10,
      justifyContent: 'center',
      backgroundColor: "blue",
      borderRadius: 10,
        
        
    },
    Cordarone_Button:{
      //marginBottom:20,
      
      top:250,
      left: 40,
      width: 300,
      height: 50,
      borderRadius: 10,
      justifyContent: 'center',
    
      backgroundColor: "blue",
      borderRadius: 10,
      
      
  },
      appButtonDisabled:{
      //marginBottom:20,
      top:250,
      left: 40,
      width: 300,
      height: 50,
    borderRadius: 10,
      backgroundColor:'gray',
      color:"#000",
      justifyContent: 'center',
      alignItems: 'center'
      },
    appButtonDisabled2:{
      //marginBottom:10,
      top:230,
      left: 40,
      width: 300,
      height: 50,
      borderRadius: 10,
       backgroundColor:'gray',
       justifyContent: 'center',
       alignItems: 'center'
       },
       appButtonDisabled3:{
        //marginBottom:20,
        top:250,
        left: 40,
        width: 300,
        height: 50,
      borderRadius: 10,
        //backgroundColor:'gray',
       // color:"#000",
        justifyContent: 'center',
        alignItems: 'center'
        },
        Defib_Disabled_Button2: {
          //marginBottom:10,
          top: 300,
          left: 15,
          width: 350,
          height: 100,
          borderRadius: 10,
          backgroundColor:'gray',
          justifyContent: 'center',
          },
    Bottom_Button:{
      top: 260,
      left: 0,
      width: 180,
      height: 50,
      justifyContent: 'center',
      backgroundColor: "#fcb800",
      borderRadius: 10,
    }, 
    Bottom_Button2:{
      top: 150,
      left: -100,
      width: 150,
      height: 50,
      justifyContent: 'center',
      backgroundColor: "#fcb800",
      borderRadius: 10,
    }, 
    timerView:{
      //position: 'absolute',
      top:200,
      left: 140,
      width: 100,
      height: 100,
      borderRadius: 100,
    },
    textarea_style:{
        //marginBottom:20,
        fontSize:20,
        fontWeight:'bold',
        top:-150,
        //left:65,
        height:100,
        width:260,
        borderWidth:2,
        color:'#000',
        backgroundColor:'white',
        borderColor:'gray',
        

        
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
      padding: 50,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 10,
      padding: 10,
      elevation: 2
    },
    
    buttonOpen: {
      top:-370,
      left:-140,
      height:50,
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

    },
    modalText: {
     // marginBottom: 15,
      width:200,
      height:100,
      textAlign: "center",
      backgroundColor:"silver"
    },
   
      ButtonDisabledText: {
        fontSize: 24,
        color: "#555555",
        fontWeight: "bold",
        textTransform: "uppercase",
       
      },
      SummaryButtonText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
        
      },
      ButtonStyle2:{
        //position: 'absolute',
        top: "-70%",
        left: 250,
        width: "25%",
        height: 50,
        
        backgroundColor:'blue',
        justifyContent: 'center',
        //alignSelf: "center"
      },
  
  })
  