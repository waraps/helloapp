import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';

// libs
import Modal from 'react-native-modal';

interface IModalUpdateComponentProps {
  showUpdateModal: boolean;
  updateNow: () => void;
}

export const ModalUpdateComponent = (
  props: IModalUpdateComponentProps,
): JSX.Element => {
  const {showUpdateModal, updateNow} = props;
  return (
    <Modal
      isVisible={showUpdateModal}
      animationIn="slideInUp"
      animationOut="slideOutDown">
      <View style={styles.modalContent}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Update</Text>
        </View>
        <Text style={styles.modalTitle}>New version available 🆕</Text>
        <Text style={styles.modalDescription}>The app needs to be updated</Text>
        <Image
          source={require('../../assets/images/logo.webp')}
          style={styles.tinyLogo}
        />
        <TouchableOpacity style={styles.modalButton} onPress={updateNow}>
          <Text style={styles.modalButtonText}>Update now</Text>
        </TouchableOpacity>
      </View>
    </Modal>
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
