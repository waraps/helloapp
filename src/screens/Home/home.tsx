/* eslint-disable react-native/no-inline-styles */
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

// libs
import {getVersion} from 'react-native-device-info';
import SplashScreen from 'react-native-splash-screen';
import {StackNavigatorParamList} from '../../../App';

// components
import {
  HeaderComponent,
  CounterComponent,
  HelloComponent,
  ModalUpdateComponent,
  SeparatorComponent,
} from '../../components';

// hooks
import {useInAppUpdate, useInAppReview} from '../../hooks';

interface IHomeProps {
  navigation: NativeStackNavigationProp<StackNavigatorParamList>;
}

export const Home = ({navigation}: IHomeProps): JSX.Element => {
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const {state, checkForUpdates, startUpdating} = useInAppUpdate();
  useInAppReview(true); // true to run react-native-rate lib or false to run react-native-in-app-review lib

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
    <ScrollView contentContainerStyle={{backgroundColor: '#333', flexGrow: 1}}>
      <HeaderComponent />
      <SeparatorComponent />
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity onPress={checkForUpdates}>
          <Text style={{color: 'white'}}>
            {`App version: ${versionApp ? versionApp : '0.0.0'}`}
          </Text>
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
      <SeparatorComponent space={30} />
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => navigation.navigate('List')}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                textDecorationLine: 'underline',
                marginRight: 3,
                color: 'white',
              }}>
              Go to FlashList
            </Text>
            <Text>➡</Text>
          </View>
        </TouchableOpacity>
      </View>
      <SeparatorComponent space={15} />
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => navigation.navigate('Libraries')}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                textDecorationLine: 'underline',
                marginRight: 3,
                color: 'white',
              }}>
              What libraries do I use?
            </Text>
            <Text>➡</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
