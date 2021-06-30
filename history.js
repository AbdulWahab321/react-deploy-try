import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as WebBrowser from 'expo-web-browser';
import * as Sharing from 'expo-sharing';

var history = [];
export default class HistoryScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      datasetted: ' ',
      histories: [],
    };
  }

  render() {
    this.setTheState = (
      whatYouNeedToPush,
      stateYouNeedToSet,
      valueYouNeedToSET
    ) => {
      history.push(whatYouNeedToPush);
      this.setState({ histories: history });
    };

    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            this.setTheState(this.props.navigation.getParam('data'));
          }}
          style={styles.button}>
          <Text style={styles.buttonText}>See Your Histories</Text>
        </TouchableOpacity>

        {this.state.histories.map((item) => {
          console.log(this.state.histories.length);
          for (var i = 0; i < this.state.histories.length; i++) {
            return (
              <View>
                <Text style={styles.displayTextS}>
                  {item}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    WebBrowser.openBrowserAsync(item);
                  }}
                  style={styles.button}>
                  <Text style={styles.buttonText}>Open this Link</Text>
                </TouchableOpacity>
              </View>
            );
          }
        })}
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('S');
          }}
          style={styles.button}>
          <Text style={styles.buttonText}>Back to Scanner</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'cyan',
  },
  button: {
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 3,
    borderRadius: 15,
    backgroudColor: 'red',
    borderColor: 'darkgreen',
    marginTop: 50,
    width: 200,
    height: 50,
  },
  button1: {
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 3,
    borderRadius: 15,
    backgroudColor: 'red',
    borderColor: 'darkgreen',
    marginTop: 600,
    width: 200,
    height: 50,
  },
  subContainer: {
    marginTop: 50,
    flex: 1,
    borderWidth: 2,
    alignItems: 'center',
    backgroundColor: 'cyan',
  },
  input: {
    borderColor: 'black',
    borderWidth: 2,
    width: 250,
    height: 25,
    textAlign: 'center',
    marginTop: 30,
    alignSelf: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: 'darkblue',
  },
  displayTextS: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bolder',
    fontSize: 20,
  },
  title: {
    margin: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
});
