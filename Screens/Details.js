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
  } from "../Functions/functionContainer";
export default class Details extends Component{
 /* { test.map((item,index)=>(
    <Text key={index} > {item["event"] +" "+ item["date"] } </Text>)
    )}*/
    render(){
      
        return (
            <View  style={styles.Container}>
                <View style={styles.bigTextArea}>
                <ScrollView>
                  
               
                { test.map((item,index)=>(
                 <Text key={index} > {item["event"] +" "+ item["date"] } </Text>)
                 )}
                </ScrollView>
                    
                </View>
                <View style={styles.Bottom_Button}>
                <Pressable 
                onPress={()=>{this.props.navigation.popToTop()}}
                >
                      
                    <Text style={styles.appButtonText}>Avsluta </Text>
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
      }
})