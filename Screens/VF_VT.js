import React, { Component} from 'react';
import 'react-native-gesture-handler';
import { Alert, StyleSheet,TouchableOpacity, Text, View, Touchable,Button, TextInput,Modal, Pressable } from 'react-native';
import Timer from '../Functions/Timer';
import Alarm from '../Functions/Alarm';
import {getAlarmTime} from '../Functions/Alarm';
import {getTime} from '../Functions/Timer';
import AsyncStorage from '@react-native-community/async-storage';
import {
  test,
  dateToString,
  storeData,
  storeArray,
  getData,
  getArray,
  DefaultContainer,
} from '../Functions/functionContainer';


var times=0;

export default class VF_VT extends React.Component{
 
 
   navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.otherParam : 'VT/VF',
      /* These values are used instead of the shared configuration! */
      headerStyle: {
        backgroundColor: navigationOptions.headerStyle.backgroundColor,
      },
      headerTintColor: navigationOptions.headerTintColor,
    };
  };
  constructor(props){
    super(props);
      
      this.state={
      Defib:1,
      Adrenalin:0,
      Cordarone:0,
      Button_Pressed:0,
      VF1_flag:true,
      modal_flag:false,
      Button_Pressedf:false,
      Cord_flag:true,
      Ader_flag:true,
      };
    }
    componentDidMount(){
      this.interval=setInterval(()=> {this.setState({counter:this.state.counter-1}),getAlarmTime()},1000);
      this.instractions()
     }
     componentWillUnmount(){
       clearInterval(this.interval);
       
     }
     instractions =()=>{
         let al = JSON.parse(getAlarmTime())
         if(al["sec"]<11&&al["min"]==0){
           clearInterval(this.interval)
           
           return(<TextInput style={styles.textarea_style} multiline={true}> 10 Sekunder kvar till att göra analysen{"\n"} 
           </TextInput>)
           
         }
        else{
           
           return(<TextInput style={styles.textarea_style}multiline={true}> 3:de defibrillering {"\n"}
           och sedan 1mg adrenalin 
           </TextInput>)
           
         }
     }
    state_managment=async()=>{
      this.setState({Button_Pressed:this.state.Button_Pressed+1}), //Button counter 
      this.setState({Defib:this.state.Defib+1}),                   //Button counter for storing data
      await storeData('Defib',this.state.Defib)
        
     if(this.state.Button_Pressed==3){
          this.setState({Ader_flag:false})
          this.setState({Cord_flag:false})
         
        
      }
      if(this.state.Button_Pressed==4){
        this.setState({VF1_flag:false})
        this.setState({Cord_flag:false})
      }
          
      
    }
   Medcin_Store=async()=>{
    await storeData('Adren',this.state.Adrenalin)
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
   
   /* componentDidMount(){
      this.getData();
    }*/
     /*componentWillUnmount(){
     this.getData();
    }*/
    main=()=>{
     
      if(this.state.VF1_flag){
        
      return(
        this.VF1()
      );
    }else{
      return(
      this.VF2()
      )
      }
    }

   
    VF1=()=>{
      
      return(
      <View style={styles.constainer} >
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
            onPress={async()=>{await storeData('Adren',this.state.Adrenalin), this.setState({Ader_flag:true})}}
            >
            <Text style={styles.appButtonText}>1mg Adrenalin</Text>
            
            </Pressable>
            <Pressable disabled={this.state.Cord_flag} style={this.state.Cord_flag?styles.appButtonDisabled:styles. Cordarone_Button}
               title='Cordarone' onPress={async()=> {await storeData('Cord',this.state.Cordarone),this.setState({Cord_flag:true})}}>
              <Text style={styles.appButtonText}>Ge 300 mg Cordarone</Text>
              </Pressable>
            
            </View>
        
      );
    } 
    VF2=()=>{
      return(
        <View style={styles.constainer} >
          
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
               title='Cordarone' onPress={()=> this.setState({Cord_flag:true})}>
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
          <View style={styles.constainer2}><Timer  sec={times["sec"]} min={times["min"]} h={times["hh"]} />
           {this.main()}
           
           <View style ={styles.timerView}>
              <Alarm duration={2} />

              </View> 
           <View style={styles.centeredView}>
           {this.instractions()}
          <Pressable style={styles.Bottom_Button}
          onPress={()=> {this.AlertButton()}}> 
          <Text style={styles.appButtonText}>Höppa Över</Text>
          </Pressable>

          <Pressable style={styles.Bottom_Button2}
          onPress={()=> {this.AlertButton()}}
          >
            <Text style={styles.appButtonText}>Avsluta</Text>
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
              <TextInput style={styles.modalText}  blurOnSubmit={true} autoCorrect={true} multiline={true}> </TextInput>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.setState({modal_flag:!this.state.modal_flag})}
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
      constainer2:{
        top:240,
        
      },
    Defib_Button: {
      marginBottom:10,
    top: 160,
    left: 40,
    width: 300,
    height: 80,
    borderRadius: 10,
    //backgroundColor:'blue',
    backgroundColor:'blue',
    justifyContent: 'center',
   //alignSelf: "center"
      //alignItems:"center"
    },
    appButtonText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    },
    Adrenalin_Button:{
      marginBottom:10,
      top:180,
      left: 40,
      width: 300,
      height: 50,
      borderRadius: 10,
      justifyContent: 'center',
      backgroundColor: "blue",
      borderRadius: 10,
        
        
    },
    Cordarone_Button:{
      marginBottom:20,
      top:200,
      left: 40,
      width: 300,
      height: 50,
      borderRadius: 10,
      justifyContent: 'center',
    
      backgroundColor: "blue",
      borderRadius: 10,
      
      
  },
      appButtonDisabled:{
      marginBottom:20,
      top:200,
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
      marginBottom:10,
      top:180,
      left: 40,
      width: 300,
      height: 50,
      borderRadius: 10,
       backgroundColor:'gray',
       justifyContent: 'center',
       alignItems: 'center'
       },
    Bottom_Button:{
      top: 200,
      left: 100,
      width: 150,
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
      top:110,
      left: 140,
      width: 100,
      height: 100,
      borderRadius: 100,
    },
    textarea_style:{
        marginBottom:20,
        fontSize:20,
        fontWeight:'bold',
        top:-230,
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
      top:-520,
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
      marginBottom: 15,
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
        top: "-100%",
        left: 250,
        width: "25%",
        height: 50,
        
        backgroundColor:'blue',
        justifyContent: 'center',
        //alignSelf: "center"
      },
  
  })
  