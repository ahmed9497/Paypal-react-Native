/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

 import {createStackNavigator,createAppContainer} from 'react-navigation';

import payment from './components/payment';

import paypal from './components/paypal';

export default class App extends Component {
 
  constructor() {
    super();
    // this.ref = firebase.firestore().collection('drivers');
    // console.log(this.ref);
}






  render() {

   

    return (
      
      <Main/>
      
    );
  }
}
const  AppStackNavigator=createStackNavigator({
  Payment: {
    screen:payment,    
  },
  Paypal: {
    screen:paypal,    
  },
}
);
const Main =createAppContainer(AppStackNavigator);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
  
// });
