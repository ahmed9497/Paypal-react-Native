/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text,Button,WebView,View} from 'react-native';
import Masonry from 'react-native-masonry-layout';
import base64 from 'react-native-base64'

export default class App extends Component {

    constructor(props) {
        super(props);
    }

    // async componentDidMount(){
    //   const username ="AbFXXSzcBsTH6z0CfvE8ON2oYS0cgojfukALNc0Pw888D1RD7Si6xACatnaEgYq-753UKr9UUB8M0SeL" 
    //   const password = "ED47g5QsTF1I6gSASmuq1mug9IOtG6fTN9KwdPcBQuKGU8HFT6fnTUPaG16ybQwzbGymUGEl2N5prkCn"
    //   const token = base64.encode(`${username}:${password}`);
    //   alert(token);
    //   try{
    //     let response = await fetch('https://api.sandbox.paypal.com/v1/oauth2/token' , {
    //       method : 'POST',
    //       'Authorization': {
    //         'TYPE' : 'Basic Auth',
    //         'Username' : 'AbFXXSzcBsTH6z0CfvE8ON2oYS0cgojfukALNc0Pw888D1RD7Si6xACatnaEgYq-753UKr9UUB8M0SeL' 
    //       },
    //       headers: new Headers({
    //         'Authorization': 'Basic '+ `${token}`, 
    //      // 'Authorization': `Basic ${new Buffer(`${username}:${password}`).toString('base64')}`, 
    //       'Content-Type': 'application/x-www-form-urlencoded'
    //       }), 
    //       body : 'grant_type=client_credentials'

    //     });
  
    //     let result = await response.json();
    //     console.log(result);
  
    //   }catch(error){
    //       alert(error);
    //   }
  
    // }
  

  Paypal=()=>{
    console.log("Paypal");
    this.props.navigation.navigate("Paypal");
  }





  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome !</Text>
        <Button title="PAYmeNT" style={styles.welcome}
          onPress={this.Paypal}
        />
     
       
         
        

 </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
