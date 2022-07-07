/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';

// components
import {ListComponent} from '../../components';

// data
import {DATA} from './data-information';

export const List = () => {
  return (
    <View style={{backgroundColor: '#333', flex: 1, padding: 5}}>
      <View
        style={{justifyContent: 'center', alignItems: 'center', padding: 5}}>
        <Text style={{textAlign: 'center', fontWeight: '600', fontSize: 20}}>
          FlashList
        </Text>
      </View>
      <ListComponent data={DATA} />
    </View>
  );
};
