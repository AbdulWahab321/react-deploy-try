import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Share,
  ScrollView,
  Platform,
  ToastAndroid,
} from 'react-native';
import { BarCodeScanner, PermissionResponse } from 'expo-barcode-scanner';
import * as WebBrowser from 'expo-web-browser';
import * as Device from 'expo-device';
import { Audio } from 'expo-av';
import styles from './style';
import Clipboard from 'expo-clipboard';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';

export default class ScanScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      nextEventStartOrShouldNotStart: true,
      scanned: false,
      data: ' ',
      type: ' ',
      permissionGranted: true,
      storageValue: ' ',
    };
  }
  shareMessage = async (message) => {
    try {
      const result = await Share.share({
        message: message,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  requestCameraPermission = async () => {
    await BarCodeScanner.requestPermissionsAsync();
  };

  componentDidMount = async () => {
    this.requestCameraPermission();
  };

  render() {
    this.showAds = async () => {
      await AdMobRewarded.setAdUnitID('ca-app-pub-3624987478965650/5418419735'); // Test ID, Replace with your-admob-unit-id
      await AdMobRewarded.requestAdAsync();
      await AdMobRewarded.showAdAsync();

      AdMobRewarded.addEventListener('rewardedVideoDidFailToPresent', () => {
        this.setState({ scanned: false });
      });
    };

    const barCodeScanned = async ({ type, data }) => {
 
      Audio.Sound.createAsync(
        { uri: 'http://soundbible.com/grab.php?id=1252&type=mp3' },
        { shouldPlay: true }
      );
      await this.setState({ scanned: true, data: data, type: type });
    };

    this.setStorage = (key, value) => {
      var keyS = JSON.stringify(key);
      var valueS = JSON.stringify(value);
    };
    this.getStorage = (key) => {
      var keys = JSON.stringify(key);
    };

    if (this.state.scanned === true) {
      this.setStorage('h1', this.state.data);
      return (
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.subContainer}>
              <Text style={styles.title}>QR Code Scanner App</Text>
              <Text style={styles.displayTextS}>URL: {this.state.data}</Text>
              <Text style={styles.displayTextS}>Type: {this.state.type}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  WebBrowser.openBrowserAsync(this.state.data.toString());
                }}>
                <Text style={styles.buttonText}>Open The Link</Text>
              </TouchableOpacity>
              <Text> </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={async () => {
                  await Clipboard.setString(this.state.data);
                  var link = Clipboard.getStringAsync(this.state.data);

                  if (Platform.OS === 'android') {
                    ToastAndroid.showWithGravity(
                      'link successfuly copied',
                      ToastAndroid.LONG,
                      1
                    );
                  } else {
                    alert(`link successfuly copied`);
                  }
                }}>
                <Text style={styles.buttonText}>
                  Copy link to the clipboard
                </Text>
              </TouchableOpacity>
              <Text> </Text>
              <TouchableOpacity
                onPress={() => {
                  this.shareMessage(this.state.data);
                }}
                style={styles.button}>
                <Text style={styles.buttonText}>Share The Link</Text>
              </TouchableOpacity>
              <Text> </Text>
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  borderWidth: 3,
                  borderRadius: 15,
                  backgroudColor: 'red',
                  borderColor: 'darkgreen',
                  marginTop: 80,
                  width: 200,
                  height: 50,
                }}
                onPress={() => {
                  this.setState({ scanned: false });
                }}>
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
              <Text> </Text>
              <TouchableOpacity
                onPress={() => {
                  this.shareMessage(
                    'https://snack.expo.io/@jr.abdulwahab/qr-code-scanner'
                  );
                }}
                style={styles.button}>
                <Text style={styles.buttonText}>Share My App</Text>
              </TouchableOpacity>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'black',
                  fontWeight: 'bolder',
                  fontSize: 20,
                  marginTop: 20,
                }}>
                A QR Code Scanner App By AbdulWahab
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'black',
                  fontWeight: 'bolder',
                  fontSize: 20,
                  marginTop: 20,
                }}>
                ^PLease share my app^
              </Text>
            </View>
          </View>
        </ScrollView>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.subContainer}>
            <Text style={styles.title}>QR Code Scanner App</Text>
            <BarCodeScanner
              onBarCodeScanned={this.state.scanned ? undefined : barCodeScanned}
              style={StyleSheet.absoluteFillObject}
              focusable={true}
            />
          </View>
        </View>
      );
    }
  }
}
