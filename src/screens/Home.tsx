import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import Presentation from '../components/Presentation';
import {getVersion} from 'react-native-device-info';

const Home = () => {
  const curVersion = getVersion();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`App version: ${curVersion}`}</Text>
      <Presentation />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#333',
    padding: 5,
  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
});
