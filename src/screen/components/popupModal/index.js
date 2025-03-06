import React from 'react';
import {View, Modal,TouchableOpacity,Text} from 'react-native';
import styles from './styles';
export default function popupModal(props) {
  return (
    <View style={styles.main}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => props.setModalVisible(false)}>
        <View style={styles.container}>
      <View
        style={
          styles.mainContainer}>
        <View>
          <Text
            style={
              styles.title}>
            Oops!
          </Text>
          <Text style={styles.content}>There is No Task For delete!</Text>
          <Text style={styles.horizontalLine}></Text>
          <View style={styles.row}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => props.setModalVisible(false)}>
              <Text
                style={[
                  styles.title,
                  styles.cancel,
                ]}>
            Cancel
              </Text>
            </TouchableOpacity>
            <View style={styles.vertical}></View>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => props.setModalVisible(false)}>
              <Text style={[styles.title, styles.remove]}>
                Okay
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
      </Modal>
    </View>
  );
}
