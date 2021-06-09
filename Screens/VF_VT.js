import React, { Component} from 'react';
import 'react-native-gesture-handler';
import { Alert,TouchableOpacity, StyleSheet, Text, View, Touchable,Button, TextInput,Modal, Pressable,Platform,SafeAreaView,KeyboardAvoidingView } from 'react-native';
import Timer from '../Functions/Timer';
import Alarm from '../Functions/Alarm';
import {getAlarmTime} from '../Functions/Alarm';
import {getTime,get_Adrenaline,set_Adrenaline} from '../Functions/Timer';



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
var AlarmTime=0;
var Defib_Flag2=false;
var VfFlag=true;
var Vf1Flag=true;
var Vf2Flag=false;
var counterScreen= 0;
var counter =0;
var counterButton =0;
var Cor_coutner=2;
var Adren_counter=0;
export function VF_VTResets(){
times=0;
AlarmTime=0;
Defib_Flag2=false;
VfFlag=true;
Vf1Flag=true,
Vf2Flag=false;
counterScreen= 0;
counter =0;
counterButton =0;
Cor_coutner=2;

}

export default class VF_VT extends Component{
 
 
  constructor(props){
    super(props);
    
      this.state={
      Defib:2,
      Defib1:1,
      Adrenalin:0,
      Cordarone:0,
      Add_Cordarone:2,
      Button_Pressed:0,
      counter:118,

      textStoring:"",

      Update:true,
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
   
      this.setState({Button_Pressed:counterButton})
     
      this.interval=setInterval(()=> {getAlarmTime()},1000);
      
      
      
     }
     
     componentWillUnmount(){
      
      Defib_Flag2=this.state.Defib_flag2;
      let isFocused=this.props.navigation.isFocused();
      VfFlag=false
      Vf1Flag=true
      counterScreen++;
      clearInterval(this.interval);
            
     }
     instractions =()=>{
         let al = JSON.parse(getAlarmTime())
         if(al["sec"]<11&&al["min"]==0){
           clearInterval(this.interval)
           this.setState({Update:false})
           
           return(<Text style={styles.textarea_style} multiline={true} editable={false}> 10 Sekunder kvar till att göra analysen{"\n"} 
           </Text>)
           
         }
        else{
           
           return(<Text style={styles.textarea_style}multiline={true} editable={false}> 3:de defibrillering {"\n"}
           och sedan 1mg adrenalin 
           </Text>)
           
         }
     }
    state_managment=()=>{
      this.setState({Button_Pressed:this.state.Button_Pressed+1}), //Button counter 
      counterButton++;
      counter++;
      this.setState({Button_Pressedf:true})                 
       storeData('Defib',counter)
       storeArray('Events','Defibrellering',dateToString(),test)
   
     if(counterButton==3){
          this.setState({Ader_flag:false})
          this.setState({Cord_flag:false})
          this.setState({Adrenalin:1})
          this.setState({Cordarone:300})
          Alert.alert("Alert","Ge patienten mediciner")
      }
      if(counterButton==5){
        Vf1Flag=false
        Vf2Flag=true
        this.setState({Button_Pressedf:true})  
        this.setState({Cord_flag:false})
       
      }
      if(counterButton>5){
       
        Cor_coutner--;
        if(Cor_coutner==0){
          this.setState({Cord_flag:false})
          
          Cor_coutner=2;
        }
      }
          
      
    }
    Alarm_Func=()=>{
      let al = JSON.parse(getAlarmTime())
     if(al["min"]==0&& al["sec"]<=0){
       clearInterval(this.interval);
       return(<Alarm duration ={al["min"]} sec={al["sec"]}status={false}/>)
     }else{
       if(al["min"]==0&& al["sec"]<=10){
       return(<Alarm duration ={al["min"]} sec={al["sec"]}status={true}status1={false}/>)}
       else{
        return(<Alarm duration ={al["min"]} sec={al["sec"]}status={true} status1={true}/>)
       }
     }
    }
 
   Medcin_State=()=>{
    
   
    if(!this.state.Cord_flag){
      
    this.setState({Cordarone:300})
    
  }
  
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
   
  
    main=()=>{ //This functions controls the component that will be rendered on the screen
    
     /*if(VfFlag &&!Vf1Flag){
      
      return(this.VF());

     }*/
     if(Vf1Flag&&!Vf2Flag){
      return(
      
      this.VF1()
      )
      }else if(Vf2Flag){

        return(
        this.VF2())
      }
    }
   /* VF=()=>{
      return(
       
               <SafeAreaView >
               <Pressable 
                    title='Defibrillera' disabled={this.state.Defib_flag2} 
                    onPress={() => {this.setState({Defib_flag2:true}), storeData('Defib',this.state.Defib1),//test.push({event:'Defibrellering',date :dateToString()}),counter++,
                     storeArray('Events','Defibrellering',dateToString(),test)}}
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
                    </SafeAreaView>
        );
    }*/


   
    VF1=()=>{
      
      return(
      <SafeAreaView >
       <TouchableOpacity 
            disabled={this.state.Button_Pressedf} 
            
            style={this.state.Button_Pressedf?styles.Defib_Button_Disable:styles.Defib_Button}
            onPress={() => { this.state_managment()}}
            >
              
            <Text style={styles.appButtonText}>{this.state.Button_Pressed}x defibrillering </Text>
            
            </TouchableOpacity>

            <TouchableOpacity style={this.state.Ader_flag?styles.appButtonDisabled2:styles.Adrenalin_Button} disabled={this.state.Ader_flag}
            
            onPress={()=>{Adren_counter=get_Adrenaline(),set_Adrenaline(++Adren_counter), storeData('Adren',get_Adrenaline()),//test.push({event:'1mg Adrenaline',date :dateToString()})
             storeArray('Events','1mg Adrenaline',dateToString(),test),this.setState({Ader_flag:true}) }}
            >
            <Text style={styles.appButtonText}>1mg Adrenalin</Text>
            
            </TouchableOpacity>
            
            
            <TouchableOpacity disabled={this.state.Cord_flag} style={this.state.Cord_flag?styles.appButtonDisabled:styles. Cordarone_Button}
               title='Cordarone' onPress={()=> {this.Medcin_State(), storeData('Cord',this.state.Cordarone),//test.push({event:'300mg Cordarone',date :dateToString()})
                storeArray('Events','300mg Cordarone',dateToString(),test),this.setState({Cord_flag:true})}}>
              <Text style={styles.appButtonText}>300 mg Cordarone</Text>
              </TouchableOpacity>
             
              </SafeAreaView>
        
      );
    } 
    
    VF2=()=>{
      return(
        <SafeAreaView >
          
            <TouchableOpacity 
            title='Klar' disabled={this.state.Button_Pressedf} 
            onPress={() => { this.state_managment()}}
            style={ this.state.Button_Pressedf?styles.Defib_Button_Disable:styles.Defib_Button}
            >
            <Text style={styles.appButtonText}>{this.state.Button_Pressed}x defibrillering </Text>
            </TouchableOpacity>
            <TouchableOpacity style={this.state.Ader_flag?styles.appButtonDisabled2:styles.Adrenalin_Button} title='Adrenalin' onPress={() => {this.setState({Ader_flag:true})}}>
              <Text style={styles.appButtonText}>Ge 1 mg Adrenalin</Text>
              </TouchableOpacity>

              <TouchableOpacity disabled={this.state.Cord_flag} style={this.state.Cord_flag?styles.appButtonDisabled:styles. Cordarone_Button}
               title='Cordarone' onPress={async()=> {this.setState({Cordarone:this.state.Cordarone+150}),//test.push({event:'150mg Cordarone',date :dateToString()})
                storeArray('Events','150mg Cordarone',dateToString(),test), storeData('Cord',this.state.Cordarone),this.setState({Cord_flag:true})}}>
              <Text style={styles.appButtonText}>Ge 150 mg Cordarone</Text>
              </TouchableOpacity>
              </SafeAreaView>
              
              
        );
    }

    
   
  
    
   render(){
    times = getTime();
    times = JSON.parse(times);
    
    AlarmTime=getAlarmTime();
    AlarmTime=JSON.parse(AlarmTime);

    
    return(
          
          
          <SafeAreaView >
           {this.main()}
          <View style={styles.time}>
          <Timer  sec={times["sec"]} min={times["min"]} h={times["hh"]} Adren_Alert={true} />
          </View>
          
          {this.instractions()}
           
           <View style ={styles.timerView}>
              {this.Alarm_Func()}

            </View>
             
           <View style={styles.centeredView}>
           
          <TouchableOpacity style={styles.Bottom_Button}
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
          <KeyboardAvoidingView style={styles.centeredView} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={styles.modalView}>
              <TextInput style={styles.modalText}  blurOnSubmit={true} autoCorrect={true} multiline={true} onChangeText={(text)=>{this.setState({textStoring:text})}}> </TextInput>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={async() => {this.setState({modal_flag:!this.state.modal_flag}),//text.push({event:this.state.textStoring,date :dateToString_Clock()})
                this.state.textStoring!==""?await storeArray('Text',this.state.textStoring,dateToString_Clock(),text):""}}
              >
                
                <Text style={styles.textStyle}>{this.state.textStoring===''?'Stäng':'Spara'}</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </Modal>
        <TouchableOpacity
          style={[styles.button, styles.buttonOpen]}
          onPress={() => this.setState({modal_flag:!this.state.modal_flag})}
        >
          <Text style={styles.textStyle}>Lägg till</Text>
        </TouchableOpacity>
      </View>
      
           </SafeAreaView> 
        
            
        );
  }
}


const styles = StyleSheet.create({
    constainer:{
      marginTop:-150,
      borderColor:'#000',
      },
      time:{
        top:"0%",
        
      },
    
    Defib_Button: {
    //marginBottom:10,
    top:"100%",
    left: 40,
    width: 300,
    height: 100,
    borderRadius: 10,
    backgroundColor:'blue',
    justifyContent: 'center',
    
    },
    Defib_Button_Disable: {
      //marginBottom:10,
      top:"100%",
      left: 40,
      width: 300,
      height: 100,
      borderRadius: 10,
      backgroundColor:'gray',
      justifyContent: 'center',
      
      },
    Defib_Button2: {
      //marginBottom:10,
      top: 250,
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
      top:"110%",
      left: 40,
      width: 300,
      height: 80,
      borderRadius: 10,
      justifyContent: 'center',
      backgroundColor: "blue",
      borderRadius: 10,
        
        
    },
    Cordarone_Button:{
      //marginBottom:20,
      
      top:"120%",
      left: 40,
      width: "80%",
      height: 80,
      borderRadius: 10,
      justifyContent: 'center',
      
      backgroundColor: "blue",
      borderRadius: 10,
      
      
  },
      appButtonDisabled:{
      //marginBottom:20,
      top:"120%",
      left: 40,
      width: "80%",
      height: 80,
    borderRadius: 10,
      backgroundColor:'gray',
      color:"#000",
      justifyContent: 'center',
      alignItems: 'center'
      },
    appButtonDisabled2:{
      //marginBottom:10,
      top:"110%",
      left: 40,
      width: 300,
      height: 80,
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
          top: 250,
          left: 15,
          width: 350,
          height: 100,
          borderRadius: 10,
          backgroundColor:'gray',
          justifyContent: 'center',
          },
    Bottom_Button:{
      top: 250,
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
     // position: 'absolute',
      top: "40%",
      left: "35%",
      right:0,
      bottom:0,
      width: 88,
      height: 50, 
      borderRadius: 10,
      backgroundColor:'#004dcf',
      justifyContent: "center",
    },
    
    textStyle:{
      fontSize:28,
      fontWeight:'bold',
      textAlign:'center',
  },
    textarea_style:{
        //marginBottom:20,
        fontSize:20,
        fontWeight:'bold',
        top:"-35%",
        left:"15%",
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
      top:-500,
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
      fontSize:18
      

    },
    modalText: {
     // marginBottom: 15,
      width:300,
      height:200,
      fontSize:20,
      //textAlign: '',
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
  