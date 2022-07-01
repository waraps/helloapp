import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

// libs
import Modal from 'react-native-modal';

export const HelloComponent = (): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false);
  const title = 'Greetings';
  const description =
    'This is a simple greetins button press it and say Hi! 😁';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
        <Text style={styles.buttonText}>Greetings</Text>
      </TouchableOpacity>
      <Modal
        isVisible={visible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        onBackdropPress={() => setVisible(false)}>
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.buttonModal}
            onPress={() => setVisible(false)}>
            <Text style={styles.buttonTextModal}>X</Text>
          </TouchableOpacity>
          <Text style={styles.contentTitle}>Hi, Dear user 👋😁!</Text>
          <Text style={styles.contentDescription}>
            {
              'The purpose of this app is to test automatic updates (In app updates)'
            }
          </Text>
        </View>
      </Modal>
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
  button: {
    marginTop: 10,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#f5f5f5',
    width: '70%',
    elevation: 1,
  },
  buttonText: {
    color: '#444',
    textAlign: 'center',
    fontSize: 16,
  },
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitle: {
    marginTop: 20,
    fontSize: 20,
    color: '#444',
  },
  contentDescription: {
    marginTop: 5,
    fontSize: 15,
    color: '#444',
  },
  buttonModal: {
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#ff6347',
    elevation: 1,
    position: 'absolute',
    top: 8,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextModal: {
    textAlign: 'center',
    color: '#ff6347',
    fontWeight: 'bold',
  },
});
