import React, { Component} from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

import { Alert, StyleSheet,TouchableOpacity, Text, View, Touchable,Button, TextInput,SafeAreaView } from 'react-native';

import Timer from '../Functions/Timer';

export default class CPR_Start extends Component{
  state={pressed:false}
    render(){
        return(
            
            <View style={styles.constainer}>
            
            <TouchableOpacity style = {styles.appButtonContainer}
            disabled={this.state.pressed}
            title="VF/VT"
            onPress={() => this.setState({pressed:true})}
            
            
          >
             <Text style={styles.appButtonText}>PÅBÖRJA HJÄRTKOMPRESSIONER</Text>
          </TouchableOpacity>
          <Timer sec={0} min={0} h={0}></Timer>
          <TouchableOpacity style = {styles.appButtonContainer2}
            
           
            onPress={() => this.props.navigation.navigate('Options')}
            
            
          >
             <Text style={styles.appButtonText}>ANALYSERA HJÄRTRYTM</Text>
          </TouchableOpacity>
        
          
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
    
    top: -100,
    left: 50,
    width: 300,
    height: 100,
    borderRadius:10,
    backgroundColor:'blue',
    justifyContent: 'center',
   //alignSelf: "center"
    },
    
    appButtonText: {
      fontSize: 24,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    },
    appButtonContainer2:{
        top:50,
        left: 50,
        width: 300,
        height: 100,
        borderRadius:10,
        backgroundColor:'blue',
        justifyContent: 'center',
        //paddingVertical: 10,
        //paddingHorizontal: 12,
        
    }
  
  })