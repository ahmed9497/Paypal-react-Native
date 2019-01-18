/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text,Button,View,WebView,Modal,ToastAndroid} from 'react-native';

import axios from 'react-native-axios'
import base64 from 'react-native-base64'
import { debug } from 'util';
export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible:true,
      res:'',count:true,
      access_token:"",
      link:'',url:false,id:''
    }



  }

  

  Paypal(){
    console.log("Paypal");
  }

  // hide=()=>{
  //   this.setState({modalVisible:false});
  // }





  async componentDidMount(){
    const username ="AbFXXSzcBsTH6z0CfvE8ON2oYS0cgojfukALNc0Pw888D1RD7Si6xACatnaEgYq-753UKr9UUB8M0SeL"   //---Your client_id //
    const password = "ED47g5QsTF1I6gSASmuq1mug9IOtG6fTN9KwdPcBQuKGU8HFT6fnTUPaG16ybQwzbGymUGEl2N5prkCn"  //---Your secret_id ///
    const token = base64.encode(`${username}:${password}`);
  //  alert(token);
    try{
      let response = await fetch('https://api.sandbox.paypal.com/v1/oauth2/token' , {
        method : 'POST',
        'Authorization': {
          'TYPE' : 'Basic Auth',
          'Username' : `${username}` 
        },
        headers: new Headers({
          'Authorization': 'Basic '+ `${token}`, 
       // 'Authorization': `Basic ${new Buffer(`${username}:${password}`).toString('base64')}`, 
        'Content-Type': 'application/x-www-form-urlencoded'
        }), 
        body : 'grant_type=client_credentials'

      });

      let result = await response.json();
      this.setState({access_token:result.access_token});
      console.log(result );
      console.log(result.access_token );
      this.setState({url:true});
      this.getMoviesFromApi();
    }catch(error){
        alert(error);
    }

  }

  async getMoviesFromApi() {
    const d ="20.00";
    const ran =Math.random().toString(31).substring(2, 8);
   // const n =`${this.state.name}`
    //console.log(n);
    const name = 'Test';
    try {
      let response = await fetch('https://api.sandbox.paypal.com/v1/payments/payment', {
        method: 'POST',
        headers: {
            'Accept' :'application/json',
          'Authorization': `Bearer ${this.state.access_token}`,
         // 'Authorization': 'Bearer A21AAFmrDHPulovOWhu0PHpQh8pLTSjvkoGyrcgC8T5JVhKIFzEQb8CMADHHFOgOJJegA5tq99nh-dXrmtEV69T1Ve49sGBVA',
          'Content-Type': 'application/json',
        },

        // Your complete data Object for shipping details
        body: JSON.stringify({
            
            
                "intent": "sale",
                "payer": {
                  "payment_method": "paypal"
                },
                "transactions": [
                  {
                    "amount": {
                      "total": d,
                      "currency": "USD",
                      "details": {
                        "subtotal": d,
                        "tax": "0.00",
                        "shipping": "0.00",
                        "handling_fee": "0.00",
                        "shipping_discount": "0.00",
                        "insurance": "0.00"
                      }
                    },
                    "description": "The payment for seats.",
                    "custom": "EBAY_EMS_94210243335",
                    "invoice_number": ran,
                    "payment_options": {
                      "allowed_payment_method": "INSTANT_FUNDING_SOURCE"
                    },
                    "soft_descriptor": "ECHI4852",
                    "item_list": {
                      "items": [
                        {
                          "name": "Your seats",
                          "description": "door seat.",
                          "quantity": "1",
                          "price": d,
                          "tax": "0.00",
                          "sku": "product2",
                          "currency": "USD"
                        }
                        
                      ],
                      "shipping_address": {
                        "recipient_name": name,
                        "line1": "9th Floor",
                        "line2": "Unit #32",
                        "city": "San Jose",
                        "country_code": "US",
                        "postal_code": "95121",
                        "phone": "011862217845678",
                        "state": "CA"
                      }
                    }
                  }
                ],
                "note_to_payer": "Contact us for any questions on your order.",
                "redirect_urls": {
                  "return_url": "https://example.com/return",
                  "cancel_url": "https://example.com/cancel"
                }
              
              
        }),
      })
      
     
      let responseJson = await response.json();
      console.log(responseJson);
      this.setState({link:responseJson.links[1].href,id:responseJson.id});
      console.log(this.state.link);
      console.log(this.state.id);
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }




  _onNavigationStateChange =(webstate)=> {
     
    console.log(webstate.url);
    if (webstate != null || webstate.url != 'about:blank') {
      console.log("search params");
      const params =webstate.url.toString();
      const p =params.indexOf('PayerID=');
      console.log(p);
     if (p>=0 && this.state.count) {
      this.setState({count:false});
      const l =params.length;
        console.log(p);       
        const res = params.substring(p, l).replace('PayerID=',"");
        console.log(res);

      
       
        const paid= this.payment(res);
       // console.log(paid);
       ToastAndroid.show(`Your Payment is confirmed`,ToastAndroid.LONG);
       this.props.navigation.navigate('Payment');
        
    }



//       try {
//     var urlParams = new URLSearchParams(webstate.url);
//     const payer_id = urlParams.get('PayerID');
//     console.log(payer_id);
   
//     // const url = new URLSearchParams(webstate.url);
//     // const c = url.searchParams.get("PayerID");
//     // console.log(c);


//     if (payer_id !=null && this.state.count){
//      // debugger;
//       console.log(payer_id);
   
//    const paid= this.payment(payer_id);
//     this.setState({count:false})
//     //console.log(paid);
//     // this.props.navigation.navigate('Payment');


//     }
//   }catch (error) {
//     console.error(error);
//   }
// }
  }
  }  

   async payment(payer){
    // debugger;
     console.log(payer);
   
   
         try {
           let response = await fetch('https://api.sandbox.paypal.com/v1/payments/payment/'+this.state.id+'/execute', {
             method: 'POST',
             headers: {
                 'Accept' :'application/json',
               'Authorization':  `Bearer ${this.state.access_token}`,
               'Content-Type': 'application/json',
             },
             body: JSON.stringify({
                 
               
                 "payer_id": payer
               
                
           })
         })
           
           let responseJson = await response.json();
           console.log(responseJson);
            return responseJson;
         } catch (error) {
           alert(error);
           this.props.navigation.navigate('Payment');
         }
       
       
     }










  render() {
    return (
    //   <Modal
    //   animationType={'slide'}
    //   visible={this.state.modalVisible}
    //   //onRequestClose={this.hide.bind(this)}
    //   transparent
    // >
    <View style={styles.container}>
      {/* {this.state.url
      ? */}
        <WebView
         source={{uri: this.state.link}}
          style={{marginTop: 20}}
          onNavigationStateChange={this._onNavigationStateChange.bind(this)}
              javaScriptEnabled = {true}
              domStorageEnabled = {true}
              injectedJavaScript = {this.state.cookie}
              startInLoadingState={false}
            //  onLoadEnd={this.home}
             BackAndroid={true}
             BackHandler={true}
    />
    {/* :


    <Text>ahmed  {this.state.access_token}</Text>
      } */}
    </View>
            // </Modal>
    
              
           
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
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
