import React from 'react';
import {StyleSheet, View} from 'react-native';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';

interface IAvatarComponent {
  uri?: string;
  size?: number;
  borderColor?: string;
}

export const AvatarComponent = ({uri, size, borderColor}: IAvatarComponent) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: size ? size + wp('2%') : wp('20%'),
      height: size ? size + wp('2%') : wp('20%'),
      borderWidth: 2,
      borderColor: borderColor ? borderColor : '#333',
      borderRadius: size ? size : wp('20%'),
    },
    tinyLogo: {
      alignSelf: 'center',
      width: size ? size : wp('20%'),
      height: size ? size : wp('20%'),
      borderRadius: size ? size / 2 : wp('10%'),
    },
  });

  const image: string = uri
    ? uri
    : 'https://cdn-icons-png.flaticon.com/512/7285/7285300.png';

  return (
    <View style={styles.container}>
      <FastImage
        style={styles.tinyLogo}
        source={{
          uri: image,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );
};
