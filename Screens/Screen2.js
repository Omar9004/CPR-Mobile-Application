
import React, { Component} from 'react';
import { Alert, StyleSheet,TouchableOpacity, Text, View, Touchable,Button, TextInput } from 'react-native';
import {createAppContainer}from 'react-navigation';
import {createStackNavigator}from 'react-navigation-stack';
import Alarm from '../Functions/Alarm';

export default class Screen2 extends React.Component{
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.otherParam : 'Home',
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
      Duration:1,
      };
    }            
    render(){
      
        return(
          <View style={{flex: 1, justifyContent: 'center'}}>
             <View style={styles.timerView}>
               
              </View>

              <TouchableOpacity style = {styles.ButtonStyle}
              
              title="Start"
              onPress={() => this.props.navigation.navigate('Options')}
              
              
            >
              
              
               <Text style={styles.appButtonText}>Start</Text>
            </TouchableOpacity>
            
           </View>
        
        );
    }
}

const styles = StyleSheet.create({
  appButtonContainer: {
    marginTop: 50,
  },
  appButtonText: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
    
  },
  ButtonStyle:{
    position: 'absolute',
   /* top: 100,
    left: 130,*/
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor:'blue',
    justifyContent: 'center',
    alignSelf: "center"
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