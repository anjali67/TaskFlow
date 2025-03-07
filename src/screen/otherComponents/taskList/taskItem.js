import React from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';
import { styles } from '../taskList/styles';
import { Delete } from '../../../assets/icons/delete';
import appColors from '../../../theme/appColors';

const TaskItem = ({ onDismiss, item,navigation }) => {
  // Create a shared value for this task item
  const translateX = useSharedValue(0);
  const LIST_ITEM_HEIGHT = 70;
  const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
  const marginVertical = useSharedValue(10);
  const opacity = useSharedValue(1);
  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3;

  // Create a pan gesture for this task item
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      // Update the shared value with the translationX
      translateX.value = event.translationX;
    })
    .onEnd(() => {
      // Reset the translation when the gesture ends
      const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        opacity.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished) {
            runOnJS(onDismiss)(item);
          }
        });
      } else {
        translateX.value = withTiming(0);
      }
    });

  // Animated style for this task item
  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  const rTaskContainerStyle = useAnimatedStyle(() => {
    return {
      marginVertical: marginVertical.value,
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View key={item?._id} style={[styles.mainContainer, rTaskContainerStyle]}>
      <GestureDetector gesture={panGesture}>
        <TouchableOpacity activeOpacity={0.9}  onPress={() => navigation.navigate('AddTask', { updatedItem: item })}>
        <Animated.View style={[styles.task, rStyle]}>
         <View style={{flexDirection:"row"}}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
          <View style={styles.iconContainer}>
            <Delete color={appColors.error} />
          </View>
          </View>
           <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
              {item.description}
            </Text>
        </Animated.View>
        </TouchableOpacity>
       
      </GestureDetector>
    </Animated.View>
  );
};

export default TaskItem;