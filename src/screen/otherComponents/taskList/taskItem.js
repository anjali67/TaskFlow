import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';
import { styles } from '../taskList/styles';
import { Delete } from '../../../assets/icons/delete';
import appColors from '../../../theme/appColors';

const TaskItem = ({ title, onDismiss, item }) => {
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
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={[styles.mainContainer, rTaskContainerStyle]}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.task, rStyle]}>
          {/* Delete Icon */}
          <View style={styles.iconContainer}>
            <Delete color={appColors.error} />
          </View>
          {/* Task Title */}
          <Text>{title}</Text>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
};

export default TaskItem;