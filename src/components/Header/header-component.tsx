import React from 'react';
import {StyleSheet, ImageBackground, Text, View} from 'react-native';

export const HeaderComponent = () => {
  return (
    <ImageBackground
      source={require('../../assets/images/rocket.webp')}
      style={styles.cover}>
      <View style={styles.welcome}>
        <Text style={styles.text}>Welcome to</Text>
        <Text style={styles.text}>
          Hello <Text style={styles.highlight}>Waraps</Text> App 👋
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  cover: {
    width: '100%',
    aspectRatio: 16 / 7,
    height: undefined,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    marginLeft: 145,
  },
  text: {
    fontSize: 18,
    textShadowColor: 'rgba(0, 0, 0, 0.50)',
    textShadowOffset: {width: -0.5, height: 0.5},
    textShadowRadius: 6,
  },
  highlight: {
    fontWeight: 'bold',
  },
});
