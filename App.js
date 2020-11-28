/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * iLat !== 0 ? iLat : 30
 * @format
 * @flow strict-local
 */
navigator.geolocation = require('@react-native-community/geolocation');

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import { Divider } from 'react-native-elements';
import Geolocation from '@react-native-community/geolocation';

const App = () => {

  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [iLat, setiLat] = useState(0);
  const [iLong, setiLong] = useState(0);

  let tempLat = 0;
  let tempLong = 0;

  const [cargado, setCargado] = useState(false);
  
useEffect (() => {
  Geolocation.getCurrentPosition(position => {
    if (!cargado){
        const initialPosition = position;
          setiLat(initialPosition.coords.latitude);
          setiLong(initialPosition.coords.longitude);
          setCargado(true);
    }
  });
});

  function setLatLong(){
    setLat(tempLat);
    setLong(tempLong);
  }

  return (
    <View>
{lat === 0 ?     <MapView
    provider={PROVIDER_GOOGLE}
    style={styles.map}
    region={{
      latitude: iLat,
      longitude: iLong,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}>
    </MapView> :     <MapView
    provider={PROVIDER_GOOGLE}
    style={styles.map}
    region={{
      latitude: lat,
      longitude: long,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}>
    </MapView>}
    <View>

        <TextInput 
        placeholder='Enter Latitude' 
        style={styles.input}
        numeric
        type="number"
        keyboardType={'numeric'}
        onChangeText={(value) => tempLat=Number(value)} />
        <Divider style={{margin: 5}}/>
        <TextInput 
        placeholder='Enter Longitude' 
        style={styles.input}
        numeric
        type="number"
        keyboardType={'numeric'}
        onChangeText={(value) => tempLong=Number(value)} />
        <Divider style={{margin: 5}}/>
            <Button style={styles.button} title="Find" onPress={() => setLatLong()}/>
          
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    height: '75%'
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 10,
    width: 200,
  },
  button: {
    flex: 1,
    margin: 10,
  },
});

export default App;
