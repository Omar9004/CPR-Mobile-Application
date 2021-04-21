import React, { Component} from 'react';
import 'react-native-gesture-handler';
import { Alert, StyleSheet,TouchableOpacity, Text, View, Touchable,Button, TextInput,Modal, Pressable } from 'react-native';
import Timer from '../Functions/Timer';
import Alarm from '../Functions/Alarm';
import {secKey} from '../Functions/Timer';
import AsyncStorage from '@react-native-community/async-storage';


var parses=0;
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
      
      sec:0,
      min:0,
      h:0,
      Button_Pressed:3,
      VF1_flag:true,
      modal_flag:false,
      Button_Pressedf:false,
      Cord_flag:false,
      Ader_flag:false,
    };
    }
    state_managment=()=>{
     if(this.state.Button_Pressed==0){
        this.move()
        return(
          Alert.alert("Varning",
          "3x defibrillering som tillåtas",),
          this.setState({Button_Pressedf:true}),
          this.setState({Button_Pressed:3})
        )
      }else{
        return(
          this.setState({Button_Pressed:this.state.Button_Pressed-1})
        )
      }
    }
   
    getData=async()=>{
        
      try{
       const value = await AsyncStorage.getItem(secKey);
          
       parses= JSON.parse(value);
     
         
      }catch(e){
          console.log("Empty");
      }
  }
  move=async()=>{
    await this.getData();
    //this.setState({ VF1_flag: false })
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
              
            <Text style={styles.textarea_style}>3:de defibrillering {"\n"}
                1mg adrenalin 
             </Text>
             
            
            <View style ={styles.timerView}>
            <Alarm duration={2} />

            </View> 
            
            <Pressable 
            title='Klar' disabled={this.state.Button_Pressedf} 
            onPress={() => {this.state_managment()}}
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? 'green'
                  : 'blue'
              },
              styles.appButtonContainer
            ]}
            >
            <Text style={styles.appButtonText}>{this.state.Button_Pressed}x defibrillering </Text>
            
            
            
            </Pressable>
           
           
            <TouchableOpacity style={styles.appButtonContainer2} title='Försätt HLR'
            onPress={()=>{this.setState({VF1_flag:false})}}
            >
            <Text style={styles.appButtonText}>Försätt HLR</Text>
            
            </TouchableOpacity>
            
            </View>
      );
    } 
    VF2=()=>{
      return(
        <View style={styles.constainer} >
                
              <Text style={styles.textarea_style}>3:de defibrillering {"\n"}
                  1mg adrenalin 
               </Text>
               
              
              <View style ={styles.timerView}>
              <Alarm duration={2} />
  
              </View> 
              <Pressable disabled={this.state.Cord_flag} style={this.state.Cord_flag?styles.appButtonDisabled:styles.appButtonContainer} title='Cordarone' onPress={()=> this.setState({Cord_flag:true})}>
              <Text style={styles.appButtonText}>Ge 300 mg Cordarone</Text>
              </Pressable>
              <Pressable style={this.state.Ader_flag?styles.appButtonDisabled2:styles.appButtonContainer2} title='Adrenalin' onPress={() => {this.setState({Ader_flag:true})}}>
              <Text style={styles.appButtonText}>Ge 1 mg Adrenalin</Text>
              </Pressable>
              
              </View>
        );
    }

    
   
  
    
   render(){
    const {navigation } =this.props;
    let timer = JSON.stringify(navigation.getParam('time','NO-ID'));
    timer= JSON.parse(timer);
    
    
        return(
         
          <View style={styles.constainer2}><Timer  sec={timer["sec"]} min={timer["min"]} h={timer["hh"]} />
           {this.main()}
           <View style={styles.centeredView}>

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
          <Text style={styles.textStyle}>Dokumentation</Text>
        </Pressable>
      </View>
           </View> 
        
            
        );
  }
}

const styles = StyleSheet.create({
    constainer:{
      marginTop:-160,
      borderColor:'#000',
      },
      constainer2:{
        top:250,
        
      },
    appButtonContainer: {
    top: -100,
    left: 65,
    width: 250,
    height: 50,
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
    appButtonContainer2:{
        top: -80,
        left: 65,
        width: 250,
        height: 50,
        justifyContent: 'center',
      
        backgroundColor: "blue",
        borderRadius: 10,
        
        
    },
    Bottom_Button:{
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
    timerView:{
     // position: 'absolute',
      top:50,
      left: 155,
      width: 100,
      height: 100,
      borderRadius: 100,
    },
    textarea_style:{
        fontSize:20,
        fontWeight:'bold',
        top:-30,
        left:65,
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
      top:-470,
      left:-120,
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
    appButtonDisabled:{
      top: -100,
      left: 65,
      width: 250,
      height: 50,
      borderRadius:10,
      backgroundColor:'gray',
      color:"#000",
      justifyContent: 'center',
      alignItems: 'center'
      },
      appButtonDisabled2:{
        top: -80,
        left: 65,
        width: 250,
        height: 50,
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
       
      }
  
  })
  