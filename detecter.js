import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity,Platform } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as WebBrowser from 'expo-web-browser';
import * as Sharing from 'expo-sharing';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import ScanScreen from './scanner';
import HistoryScreen from './history';
import styles from './style';
import { Audio } from 'expo-av';
var AppNavigator = createSwitchNavigator({ S: ScanScreen, H: HistoryScreen });
const AppContainer = createAppContainer(AppNavigator);
import * as Device from 'expo-device';
import { isMobile, isIPad13, isChrome } from 'react-device-detect';


export default class Detecter extends React.Component {
  render() {
    console.log(Platform.OS)
    this.playsound = async () => {
      await Audio.Sound.createAsync(
        { uri: 'http://soundbible.com/grab.php?id=1540&type=mp3' },
        { shouldPlay: true }
      );
    };


    if (Device.osName !== 'Windows'&&Device.osName!=='Linux') {
      return <ScanScreen />;
    } else {
      Audio.Sound.createAsync(
        { uri: 'http://soundbible.com/grab.php?id=1540&type=mp3' },
        { shouldPlay: true }
      );
      return (
        <View style={styles.subContainer}>
          <View style={styles.subContainer}>
          <Text style={styles.title}>
            Oops, QR Code scanner is not compatible with this device, please use
            mobile iPad etc
          </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              WebBrowser.openBrowserAsync(
                'https://snack.expo.io/@jr.abdulwahab/my-all-apps-2'
              );
            }}
            style={styles.button}>
            <Text style={styles.buttonText}>Go to homePage</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}
