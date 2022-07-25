/* eslint-disable react-native/no-inline-styles */
import {
  Text,
  Linking,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React from 'react';

export const Libraries = () => {
  const openURL = (url: string): void => {
    Linking.openURL(url).catch(() => {
      // console.warn('An error has occurred', err);
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>
        {'Libraries installed to be testing\nin this App'}
      </Text>
      <Text style={{marginLeft: 8}}>
        Press card for more information about the library
      </Text>
      <TouchableOpacity style={styles.card}>
        <Text
          style={styles.cardTitle}
          onPress={() =>
            openURL('https://github.com/SudoPlz/sp-react-native-in-app-updates')
          }>
          sp-react-native-in-app-updates
        </Text>
        <Text style={styles.cardDescription}>
          Checks the stores (play/app) for a new version of your app and can
          prompt your user for an update
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}>
        <Text
          style={styles.cardTitle}
          onPress={() => openURL('https://shopify.github.io/flash-list/docs')}>
          @shopify/flash-list
        </Text>
        <Text style={styles.cardDescription}>
          {'Fast \u0026 Performant React Native List'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}>
        <Text
          style={styles.cardTitle}
          onPress={() =>
            openURL(
              'https://github.com/crazycodeboy/react-native-splash-screen',
            )
          }>
          react-native-splash-screen
        </Text>
        <Text style={styles.cardDescription}>
          A splash screen API for react-native which can programatically hide
          and show the splash screen. Works on iOS and Android
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}>
        <Text
          style={styles.cardTitle}
          onPress={() =>
            openURL('https://github.com/DylanVann/react-native-fast-image')
          }>
          react-native-fast-image
        </Text>
        <Text style={styles.cardDescription}>
          FastImage is a wrapper around SDWebImage (iOS) and Glide (Android).
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333',
    flexGrow: 1,
    padding: 5,
  },
  header: {
    fontSize: 21,
    margin: 10,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 8,
    margin: 5,
  },
  cardTitle: {
    fontSize: 20,
    color: '#333',
    marginTop: 2,
  },
  cardDescription: {
    color: '#555',
  },
});
