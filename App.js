import React from 'react';
import Detecter from './detecter'
import * as Device from 'expo-device';
import { isMobile,isIPad13,isChrome } from "react-device-detect";
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import HistoryScreen from './history'
import ScanScreen from './scanner'
import styles from './style'
import {View} from 'react-native'

var AppNavigator = createSwitchNavigator({ S: ScanScreen, H: HistoryScreen });
const AppContainer = createAppContainer(AppNavigator);
export default class App extends React.Component {
  render() {
    return (   
     <Detecter/>
    );
  }
}
