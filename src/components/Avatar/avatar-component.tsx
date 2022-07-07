import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

interface IAvatarComponent {
  uri?: string;
}

export const AvatarComponent = ({uri}: IAvatarComponent) => {
  const image: string = uri
    ? uri
    : 'https://cdn-icons-png.flaticon.com/512/7285/7285300.png';

  return (
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: image,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 2.5,
    borderColor: '#333',
    overflow: 'hidden',
  },
  tinyLogo: {
    width: 60,
    height: 60,
    marginBottom: 2,
  },
});
