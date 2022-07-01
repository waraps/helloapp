/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

// libs
import {getVersion} from 'react-native-device-info';
import SplashScreen from 'react-native-splash-screen';

// components
import {
  HeaderComponent,
  CounterComponent,
  HelloComponent,
  ModalUpdateComponent,
  SeparatorComponent,
} from '../components';

// hooks
import {useInAppUpdate} from '../hooks';

export const Home = (): JSX.Element => {
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const {state, checkForUpdates, startUpdating} = useInAppUpdate();

  const {needsUpdate, statusUpdate} = state;
  const versionApp = getVersion();
  const title = 'Simple counter';
  const description =
    'This is a simple counter 🙂 press the buttons "Increase, Decrease and Reset" to increment, decrement and reset the count.';

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    if (needsUpdate) {
      setShowUpdateModal(true);
    }
  }, [needsUpdate]);

  const bytesToSize = (bytes: number, seperator = ' '): string => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) {
      return '0 Bytes';
    }
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    if (i === 0) {
      return `${bytes}${seperator}${sizes[i]}`;
    }
    return `${(bytes / 1024 ** i).toFixed(1)}${seperator}${sizes[i]}`;
  };

  const updateNow = (): void => {
    startUpdating();
    setShowUpdateModal(false);
  };

  return (
    <ScrollView>
      <HeaderComponent />
      <SeparatorComponent />
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity onPress={checkForUpdates}>
          <Text>{`App version: ${versionApp ? versionApp : '0.0.0'}`}</Text>
        </TouchableOpacity>
        {statusUpdate && (
          <Text>{`status: ${
            statusUpdate.status
          } ⬇️ - Downloading: ${bytesToSize(
            statusUpdate.bytesDownloaded,
          )}/${bytesToSize(statusUpdate.totalBytesToDownload)}`}</Text>
        )}
      </View>
      <SeparatorComponent space={15} />
      <CounterComponent
        title={title}
        description={description}
        initialCount={0}
      />
      <SeparatorComponent space={20} />
      <HelloComponent />
      <ModalUpdateComponent
        showUpdateModal={showUpdateModal}
        updateNow={updateNow}
      />
    </ScrollView>
  );
};
