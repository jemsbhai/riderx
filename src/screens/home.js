import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Line, Circle } from 'react-native-svg';
import { Icon } from 'react-native-elements'
import { useFonts } from 'expo-font';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar,Modal, Portal, Provider, ToggleButton } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';






export default function Home() {
    const navigation = useNavigation();
    

    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const [status, setStatus] = React.useState('checked');

  const onButtonToggle = value => {
    setStatus(status === 'checked' ? 'unchecked' : 'checked');
  };
    

   
    return (
        <View style={styles.container}>
          <Provider>
          <Portal>
              <View style={{paddingHorizontal:'7.5%', marginTop:'15%', marginHorizontal:'5%', borderRadius:20, backgroundColor:"#EFF9FF", paddingVertical:'5%'}}>
                  <Text style={{fontWeight:'bold'}}>Next Task:</Text>
                  <Text style={{fontWeight:'bold', fontSize:18}}>Pick Up reed richards</Text>
                  <View style={{flexDirection:'row'}}>
                    <View style={{borderRadius:20, backgroundColor:"#bcbcbc", width:20, height:20, marginBottom:'5%'}}>
                          <Text style={{color:"#FFF", fontWeight:'bold', textAlign:'center'}}>1</Text>
                    </View>
                    <Text style={{fontWeight:'bold', color:"#bcbcbc"}}> Fortis Hospital</Text>
                    </View>
                  <View style={{flexDirection:'row'}}>
                    <View style={{borderRadius:20, backgroundColor:"#1B3D6D", width:20, height:20, marginBottom:'5%'}}>
                          <Text style={{color:"#FFF", fontWeight:'bold', textAlign:'center'}}>2</Text>
                    </View>
                    <Text style={{fontWeight:'bold', color:"#1B3D6D"}}> Pickup reed richards</Text>
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <View style={{borderRadius:20, backgroundColor:"#bcbcbc", width:20, height:20, marginBottom:'5%'}}>
                          <Text style={{color:"#FFF", fontWeight:'bold', textAlign:'center'}}>3</Text>
                    </View>
                    <Text style={{fontWeight:'bold', color:"#bcbcbc"}}> Pickup Jane</Text>
                    
                  </View>
                  
                  <View style={{flexDirection:'row'}}>
                    <View style={{borderRadius:20, backgroundColor:"#bcbcbc", width:20, height:20, marginBottom:'5%'}}>
                          <Text style={{color:"#FFF", fontWeight:'bold', textAlign:'center'}}>4</Text>
                    </View>
                    <Text style={{fontWeight:'bold', color:"#bcbcbc"}}> Pharmacy</Text>
                    
                  </View>
                  
              </View>

              <View style={{borderRadius:20, width:'90%', height:'50%', backgroundColor:"#EFF9FF", alignSelf:'center', marginTop:'5%'}}>
              <MapView
                initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }}
                style={{width:350, height:370, alignSelf:'center', marginTop:'5%'}}
                ><Marker
                coordinate={{'latitude':37.78825,'longitude':-122.4324}}
                title={'reed richards'}
                description={'Pickup reed richards'}
              /></MapView>
                  <Text></Text>
              </View>
            
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{borderRadius:10, backgroundColor:'#FFF', width:'80%', alignSelf:'center'}}>
                    <Text style={{fontFamily:'Roboto', fontSize:20, marginLeft:'5%', marginTop:'5%'}}>Reaction</Text>
                    <View style={{flexDirection:'row', display:'flex', marginLeft:'2.5%', alignSelf:'center', marginBottom:'5%'}}>
                        <TouchableOpacity><Text style={{fontSize:30}}>🙂</Text></TouchableOpacity>
                        <TouchableOpacity><Text style={{fontSize:30}}>😊</Text></TouchableOpacity>
                        <TouchableOpacity><Text style={{fontSize:30}}>😄</Text></TouchableOpacity>
                        <TouchableOpacity><Text style={{fontSize:30}}>😁</Text></TouchableOpacity>
                        <TouchableOpacity><Text style={{fontSize:30}}>😆</Text></TouchableOpacity>
                        <TouchableOpacity><Text style={{fontSize:30}}>😅</Text></TouchableOpacity>
                        <TouchableOpacity><Text style={{fontSize:30}}>😂</Text></TouchableOpacity>
                        <TouchableOpacity><Text style={{fontSize:30}}>🤣</Text></TouchableOpacity>
                    </View>
                </Modal>
            </Portal>
            </Provider>
            <View style={{backgroundColor:"#3984B2", width:'90%', height:70, alignSelf:'center', borderRadius:20, marginBottom:'5%'}}>
                <TouchableOpacity onPress={()=>navigation.navigate('Qr')}><Icon name="qr-code-scanner" type="materialicon" color="#FFF" style={{marginTop:'5.5%'}}></Icon></TouchableOpacity>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        position: 'relative',
        backgroundColor: '#1B3D6D'
    },
    header: {
        height: '55%',
        width: '100%',
        marginTop: '-5%',
        resizeMode: 'contain',
        alignSelf: 'center'
    },

});