import React, { Component} from 'react';
import {  StatusBar,
    Text,
    View,
    SafeAreaView,
    Button,
    Touchable,
    TouchableOpacity,
    Alert,
    ScrollView,
    TouchableHighlight,
    BackHandler,
    TextInput,
    Pressable,
    StyleSheet,} from 'react-native';
import { NavigationActions } from 'react-navigation';
import {
    test,
    dateToString,
    storeData,
    storeArray,
    getData,
    getArray,
    DefaultContainer,
    ArrayGenerator
  } from "../Functions/functionContainer";
//import {getKeys} from './Options'
export default class Details extends React.Component{
  state ={s:[]}
async componentDidMount(){
  //let convert = getKeys()
  
 //console.log(convert[0])
   this.setState({s:await getArray('Events',test)})
   
}
    render(){
      
     
        return (
            <View  style={styles.Container}>
                <View style={styles.bigTextArea}>
                <ScrollView>
                  
               
                { this.state.s.map((item,index)=>(
                 <Text style={styles.textStyle} key={index} > {item["event"] +": "+ item["date"] } </Text>)
                 )}
                </ScrollView>
                    
                </View>
                <View style={styles.Bottom_Button}>
                <Pressable 
                onPress={()=>{this.props.navigation.navigate('Home')}}
                >
                      
                    <Text style={styles.appButtonText}>Avsluta </Text>
                </Pressable>
                </View>
                <View style={styles.Bottom_Button2}>
                <Pressable 
                onPress={()=>{this.props.navigation.navigate('Notes')}}
                >
                      
                    <Text style={styles.appButtonText}>Anteckningar </Text>
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
      Bottom_Button:{
        top: "5%",
        left: "10%",
        width: "80%",
        height: "10%",
        justifyContent: 'center',
        backgroundColor: "blue",
        borderRadius: 10,
      },
      Bottom_Button2:{
        top: "10%",
        left: "10%",
        width: "80%",
        height: "10%",
        justifyContent: 'center',
        backgroundColor: "blue",
        borderRadius: 10,
      },
      appButtonText: {
        fontSize: 32,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
        
      }, 
    bigTextArea: {
        marginTop: 10,
        backgroundColor: "#fff",
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        width: "85%",
        height: "70%",
        borderColor: "grey",
        borderWidth: 1,
      },
      textStyle:{
        fontSize:17,
        
      }
})