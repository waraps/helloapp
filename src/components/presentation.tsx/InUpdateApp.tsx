/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  Button,
  Text,
} from 'react-native';
import {useInAppUpdate} from '../../hooks/useInAppUpdate';

export enum AndroidInstallStatus {
  UNKNOWN = 0,
  PENDING = 1,
  DOWNLOADING = 2,
  INSTALLING = 3,
  INSTALLED = 4,
  FAILED = 5,
  CANCELED = 6,
  DOWNLOADED = 11,
}

const InUpdateApp = () => {
  const {state, checkForUpdates, startUpdating, doInstallUpdate} =
    useInAppUpdate();

  const {needsUpdate, error, statusUpdate} = state;

  const BUTTON_COLOR = '#46955f';
  let statusTxt = 'Not sure yet';

  if (needsUpdate) {
    statusTxt = 'YES';
  } else if (needsUpdate === false) {
    statusTxt = 'NO';
  } else if (error) {
    statusTxt = 'Error, check below';
  }

  function bytesToSize(bytes: number, seperator = ' ') {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) {
      return '0 Bytes';
    }
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    if (i === 0) {
      return `${bytes}${seperator}${sizes[i]}`;
    }
    return `${(bytes / 1024 ** i).toFixed(1)}${seperator}${sizes[i]}`;
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.aButton}>
            <Button
              title="Check for updates"
              color={BUTTON_COLOR}
              onPress={checkForUpdates}
            />
          </View>
          <View style={styles.aButton}>
            <Button
              disabled={!needsUpdate}
              title="Start Updating"
              color={BUTTON_COLOR}
              onPress={startUpdating}
            />
          </View>
          {statusUpdate && (
            <Text>{`status: ${statusUpdate.status} - Downloading: ${bytesToSize(
              statusUpdate.bytesDownloaded,
            )}/${bytesToSize(statusUpdate.totalBytesToDownload)}`}</Text>
          )}
          <View style={styles.aButton}>
            <Button
              disabled={
                !(AndroidInstallStatus.DOWNLOADED === statusUpdate?.status)
              }
              title="Install Update"
              color={BUTTON_COLOR}
              onPress={doInstallUpdate}
            />
            {AndroidInstallStatus.INSTALLING === statusUpdate?.status && (
              <Text>Instalando</Text>
            )}
            {AndroidInstallStatus.INSTALLED === statusUpdate?.status && (
              <Text>Instalado</Text>
            )}
            {AndroidInstallStatus.FAILED === statusUpdate?.status && (
              <Text>Fallo Instalacion</Text>
            )}
          </View>
          <View style={{alignItems: 'center'}}>
            <Text
              style={
                styles.textStyle
              }>{`Needs update: ${'\n'}${statusTxt}`}</Text>
          </View>
          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorTextStyle}>{`Error: ${error}`}</Text>
            </View>
          ) : null}
        </View>
      </SafeAreaView>
    </>
  );
};

export default InUpdateApp;

const styles = StyleSheet.create({
  container: {
    // flexGrow: 1,
    // height: '100%',
    justifyContent: 'center',
  },
  aButton: {
    marginVertical: 10,
    borderRadius: 10,
    marginHorizontal: 50,
  },
  textStyle: {
    color: '#d09a9a',
    fontSize: 26,
    textAlign: 'center',
  },
  errorContainer: {
    marginTop: 10,
    margin: 5,
    padding: 5,
    borderRadius: 10,
    backgroundColor: 'red',
  },
  errorTextStyle: {
    color: 'black',
    fontSize: 14,
  },
});
