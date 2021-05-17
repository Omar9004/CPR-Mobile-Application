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
    text,
    dateToString,
    storeData,
    storeArray,
    getData,
    getArray,
    DefaultContainer,
  } from "../Functions/functionContainer";
export default class Notes extends React.Component{
 /* { test.map((item,index)=>(
    <Text key={index} > {item["event"] +" "+ item["date"] } </Text>)
    )}*/ /*constructor(props){
    super(props);
    this.state={
      Notes:""
    };
  }
  componentDidMount(){
      this.get()
  }
  get=async()=>{
      this.setState({Notes:JSON.parse(await getData('Notes'))})
     
  }*/
    render(){
      
        return (
            <View  style={styles.Container}>
                <View style={styles.bigTextArea}>
                <ScrollView>
                  
                { text.map((item,index)=>(
                 <Text style={styles.textStyle} key={index} > {item["event"] +": "+ item["date"] } </Text>)
                 )}
                </ScrollView>
                    
                </View>
                <View style={styles.Bottom_Button}>
                <Pressable 
                onPress={()=>{this.props.navigation.goBack()}}
                >
                      
                    <Text style={styles.appButtonText}>Stäng</Text>
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
        textAlign:'justify'
      }
})