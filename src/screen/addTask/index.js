import { View, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { styles } from './styles';
import { Back } from '../../assets/icons/back';
import { Divider, Text, Button, ActivityIndicator } from 'react-native-paper';
import appColors from '../../theme/appColors';
import Toast from 'react-native-toast-message';
import { displayMessage, showInfoToast } from '../../utills/function';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, updateTask } from '../../redux/slice/taskSlice';

export default function AddTask({ navigation, route }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.tasks);
  const { updatedItem } = route?.params || {};

  // Set initial values if updating a task
  useEffect(() => {
    if (updatedItem) {
      setTitle(updatedItem.title);
      setDescription(updatedItem.description);
    }
  }, [updatedItem]);

  // Toast configuration
  const toastConfig = {
    info: ({ text1, text2 }) => (
      <View style={styles.toastView}>
        <Text style={styles.toastText}>{text1}</Text>
        <Text style={{ color: 'white' }}>{text2}</Text>
      </View>
    ),
  };

  // Reusable function for adding/updating tasks
  const handleTaskSubmission = async () => {
    if (!title.trim() || !description.trim()) {
      showInfoToast(); // Show toast if fields are empty
      return;
    }

    const taskData = {
      title: title,
      description: description,
    };

    try {
      if (updatedItem) {
        // Update task
        await dispatch(updateTask({ id: updatedItem._id, ...taskData }));
        displayMessage({message: 'Task Updated Successfully'})
      } else {
        // Add new task
        await dispatch(addTask(taskData));
        displayMessage({message:'Task Added Successfully '})
      }

      // Reset form and navigate back
      setTitle('');
      setDescription('');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error submitting task:', error);
      displayMessage({message:'Failed to submit task',type:'danger'})
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Back />
        </TouchableOpacity>
        <View style={styles.dividerContainer}>
          <Divider style={styles.divider} />
          <Text style={styles.text}>{updatedItem ? 'Update Task' : 'Add New Task'}</Text>
          <Divider style={styles.divider} />
        </View>
        <View style={styles.textView}>
          <Text style={styles.textStyle}>What are you planning 😇?</Text>
        </View>
        <View style={styles.main}>
          <Text style={[styles.textStyle, { color: appColors.black }]}>Title</Text>
          <TextInput
            value={title}
            placeholderTextColor={appColors.gray}
            style={styles.textInput}
            placeholder="Enter title"
            onChangeText={(text) => setTitle(text)}
          />
          <Divider />
        </View>
        <View style={styles.main}>
          <Text style={[styles.textStyle, { color: appColors.black }]}>Description</Text>
          <TextInput
            value={description}
            multiline
            placeholderTextColor={appColors.gray}
            style={[styles.textInput, { textAlignVertical: 'top', minHeight: 80 }]}
            placeholder="Enter description"
            onChangeText={(text) => setDescription(text)}
          />
          <Divider />
        </View>
      </View>
      <View style={styles.center}>
        <Button
          style={styles.button}
          mode="contained"
          onPress={handleTaskSubmission}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="green" />
          ) : (
            updatedItem ? 'Update Task' : 'Add Task'
          )}
        </Button>
        <Toast config={toastConfig} />
      </View>
    </SafeAreaView>
  );
}