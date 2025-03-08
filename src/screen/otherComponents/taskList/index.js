import React, { useCallback, useState, useEffect } from 'react';
import { View, FlatList, RefreshControl,ActivityIndicator } from 'react-native';
import { styles } from './styles';
import TaskItem from './taskItem';
import { useDispatch , useSelector } from 'react-redux';
import { fetchTasks , deleteTask } from '../../../redux/slice/taskSlice';
import appColors from '../../../theme/appColors';
import LottieAnimation from '../lottieAnimation'

export default function TaskList(props) {
  const {tasks,loading} = useSelector((state) => state.tasks)
  const dispatch = useDispatch()
  const [taskList, setTaskList] = useState(tasks);
  const [refreshing, setRefreshing] = useState(false);

useEffect(() => {
  setTaskList(tasks); 
}, [tasks]);

  useEffect(() => {
    dispatch(fetchTasks())
  },[dispatch])

  const onDismiss = useCallback(async (task) => {
    try {
      await dispatch(deleteTask(task._id)).unwrap();
      dispatch(fetchTasks()); // Fetch latest tasks from the backend
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  }, [dispatch]);

  const onRefresh = useCallback(() => {
    setRefreshing(true); 
    setTimeout(() => {
      setTaskList(tasks); 
      setRefreshing(false);
    }, 2000); 
  }, [dispatch]);
  
  if(loading) return (
    <View style={styles.center}>
         <ActivityIndicator color={appColors.title}/>
    </View>
  )

  return (
    <View style={styles.main}>
  <FlatList
  data={tasks}  
  keyExtractor={(item) => item._id}
  renderItem={({ item }) => (
    <TaskItem navigation={props.navigation} item={item}  onDismiss={onDismiss} />
  )}
  showsVerticalScrollIndicator={false}
  refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      colors={['#0000FF']}
      tintColor="#0000FF"
    />
  }
  ListEmptyComponent={tasks.length === 0 ? <LottieAnimation /> : null}
/>
  </View>
);

}