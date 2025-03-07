import React, { useEffect }  from 'react';
import {View, Modal,TouchableOpacity,Text} from 'react-native';
import styles from './styles';
import { useDispatch , useSelector } from 'react-redux';
import { deleteAllTask } from '../../../redux/slice/taskSlice';

export default function popupModal(props) {
  const dispatch = useDispatch()
  const { tasks} = useSelector((state) => state.tasks)

  useEffect(() => {},[tasks])

  const onDeleteClick = async () => {
   await dispatch(deleteAllTask()).then(() => props.setModalVisible(false))
  }

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
            {tasks ? 'Are you sure you delete all Task ? ' : ' Oops!'}
          </Text>
          {tasks ? <Text style={styles.content}>Delete all Task</Text> : <Text style={styles.content}>There is No Task For delete!</Text>}
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
                {tasks ? <TouchableOpacity onPress={() => onDeleteClick()}>
                  <Text style={{color:'blue'}}>Delete</Text>
                </TouchableOpacity> : 'Okay'}
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
