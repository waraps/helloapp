/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useCounter} from '../../hooks/useCounter';

interface ICounterProps {
  title?: string;
  description?: string;
  initialCount?: number;
}

export const Counter = (props: ICounterProps) => {
  const {title, description, initialCount} = props;
  const {counter, increase, decrease, reset} = useCounter(initialCount);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title ? title : 'Presentation title'}</Text>
      <Text style={styles.description}>
        {description ? description : 'Presentation description'}
      </Text>
      <View style={styles.counterContainer}>
        <Text
          style={{
            color: '#444',
            textAlign: 'center',
            fontWeight: 'bold',
            marginBottom: 8,
          }}>
          {`Counter starts at: ${counter}`}
        </Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[
              styles.button,
              {borderTopEndRadius: 0, borderBottomEndRadius: 0},
            ]}
            onPress={increase}>
            <Text
              style={{color: '#444', textAlign: 'center', fontWeight: 'bold'}}>
              Increase
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              {borderLeftWidth: 0, borderRightWidth: 0, borderRadius: 0},
            ]}
            onPress={reset}>
            <Text
              style={{color: '#444', textAlign: 'center', fontWeight: 'bold'}}>
              Reset
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              {borderTopStartRadius: 0, borderBottomStartRadius: 0},
            ]}
            onPress={decrease}>
            <Text
              style={{color: '#444', textAlign: 'center', fontWeight: 'bold'}}>
              Decrease
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 22,
    marginBottom: 2,
  },
  description: {
    color: 'white',
    textAlign: 'justify',
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  counterContainer: {
    marginTop: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'center',
  },
  button: {
    borderWidth: 0.8,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
});
