/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Alert,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

// libs
import {getVersion} from 'react-native-device-info';
import {IAUInstallStatus} from 'sp-react-native-in-app-updates';
import Modal from 'react-native-modal';

// components
import {HeaderComponent} from '../components/Header/header-component';
import {Counter} from '../components/Counter/Counter';
import {HelloComponent} from '../components/Hello/hello-component';
import {useInAppUpdate} from '../hooks/useInAppUpdate';

export const Home = () => {
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const {state, checkForUpdates, startUpdating, doInstallUpdate} =
    useInAppUpdate();

  const {needsUpdate, error, statusUpdate} = state;
  const versionApp = getVersion();
  const title = 'Simple counter';
  const description =
    'This is a simple counter 🙂 press the buttons "Increase, Decrease and Reset" to increment, decrement and reset the count.';

  useEffect(() => {
    checkForUpdates();
  }, []);

  useEffect(() => {
    if (needsUpdate) {
      setShowUpdateModal(true);
    }
  }, [needsUpdate]);

  useEffect(() => {
    if (statusUpdate?.status === IAUInstallStatus.DOWNLOADED) {
      doInstallUpdate();
    }
  }, [statusUpdate?.status]);

  useEffect(() => {
    if (statusUpdate?.status === IAUInstallStatus.FAILED) {
      Alert.alert(
        `[FAILED]code: ${IAUInstallStatus.FAILED}`,
        `Error: ${error}`,
      );
    }
  }, [error]);

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

  const separator = (space: number): JSX.Element => (
    <View style={{marginTop: space}} />
  );

  return (
    <ScrollView>
      <HeaderComponent />
      {separator(10)}
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text>{`App version: ${versionApp ? versionApp : '0.0.0'}`}</Text>
        {statusUpdate && (
          <Text>{`status: ${statusUpdate.status} - Downloading: ${bytesToSize(
            statusUpdate.bytesDownloaded,
          )}/${bytesToSize(statusUpdate.totalBytesToDownload)}`}</Text>
        )}
      </View>
      {separator(15)}
      <Counter title={title} description={description} initialCount={0} />
      {separator(20)}
      <HelloComponent />
      <Modal
        isVisible={showUpdateModal}
        animationIn="slideInUp"
        animationOut="slideOutDown">
        <View style={styles.modalContent}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Update</Text>
          </View>
          <Text style={styles.modalTitle}>New version available 🆕</Text>
          <Text style={styles.modalDescription}>
            The app needs to be updated
          </Text>
          <Image
            source={require('../assets/images/logo.webp')}
            style={styles.tinyLogo}
          />
          <TouchableOpacity style={styles.modalButton} onPress={startUpdating}>
            <Text style={styles.modalButtonText}>Update now</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  badge: {
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#218e16',
    elevation: 1,
    position: 'absolute',
    top: 12,
    right: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    textAlign: 'center',
    color: '#218e16',
    fontWeight: 'bold',
  },
  modalTitle: {
    marginTop: 30,
    fontSize: 18,
    color: '#444',
  },
  modalDescription: {
    fontSize: 15,
    color: '#444',
    marginBottom: 10,
  },
  tinyLogo: {
    width: 60,
    height: 60,
    padding: 5,
    borderColor: '#444',
    borderRadius: 100,
    borderWidth: 0.5,
  },
  modalButton: {
    width: '60%',
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#218e16',
  },
  modalButtonText: {
    textAlign: 'center',
    color: '#218e16',
    fontWeight: 'bold',
  },
});
