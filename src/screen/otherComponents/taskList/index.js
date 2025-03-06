import React, { useCallback, useState } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { styles } from './styles';
import TaskItem from './taskItem';

export default function TaskList() {
  const TITLES = [
    'Record discrammeled record',
    'Leave to the video',
    'Check for comments',
    'Subscribe to the channel',
    
  ];

  const tasks = TITLES.map((title, index) => ({ title, index }));

  const [taskList, setTaskList] = useState(tasks);
  const [refreshing, setRefreshing] = useState(false);

  const onDismiss = useCallback((task) => {
    setTaskList((tasks) => tasks.filter((item) => item.index !== task.index));
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true); 
    setTimeout(() => {
      setTaskList(tasks); 
      setRefreshing(false);
    }, 2000); 
  }, [tasks]);

  return (
    <View style={styles.main}>
      <FlatList
        data={taskList} 
        keyExtractor={(item) => item.index.toString()} 
        renderItem={({ item }) => (
          <TaskItem item={item} key={item.index} title={item.title} onDismiss={onDismiss} />
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
      />
    </View>
  );
}