import React, { useState, useEffect } from 'react';
import { View, Modal, TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAllTask } from '../../../redux/slice/taskSlice';

export default function PopupModal(props) {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  const [isDeleted, setIsDeleted] = useState(false); 
  
  useEffect(() => {
    setIsDeleted(false); 
  }, [props.modalVisible]);

  const onDeleteClick = async () => {
    await dispatch(deleteAllTask());
    setIsDeleted(true); 
  };

  return (
    <View style={styles.main}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => props.setModalVisible(false)}>
        <View style={styles.container}>
          <View style={styles.mainContainer}>
            <View>
              <Text style={styles.title}>
                {isDeleted ? 'Success!' : tasks.length === 0 ? 'Oops!' : 'Are you sure you delete all Task?'}
              </Text>
              {isDeleted ? (
                <Text style={styles.successMessage}>All tasks have been deleted successfully!</Text>
              ) : tasks.length === 0 ? (
                <Text style={styles.content}>There is No Task For delete!</Text>
              ) : (
                <Text style={styles.content}>Delete all Task</Text>
              )}
              <Text style={styles.horizontalLine}></Text>
              <View style={styles.row}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => props.setModalVisible(false)}>
                  <Text style={[styles.title, styles.cancel]}>
                    {isDeleted ? 'Close' : 'Cancel'}
                  </Text>
                </TouchableOpacity>
                {!isDeleted && tasks.length > 0 && (
                  <>
                    <View style={styles.vertical}></View>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={onDeleteClick}>
                      <Text style={[styles.title, styles.remove]}>
                        Delete
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}