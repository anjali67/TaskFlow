import { View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import { styles } from './styles';
import { Title } from 'react-native-paper';

export default function LottieAnimation() {
  return (
    <View style={styles.lottieView}>
    <LottieView
      source={require('../../../assets/lottie/1.json')}
      style={{ height: 200, width: 200 }}
      autoPlay
      loop
    />
    <Title style={styles.textStyle}>
      You have Done all Task!!
    </Title>
  </View>
  )
}