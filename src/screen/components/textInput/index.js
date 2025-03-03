import { View } from 'react-native'
import React  from 'react'
import { Title , TextInput } from 'react-native-paper'
import { styles } from './styles'
import appColors from '../../../theme/appColors'

export default function TextInputView(props) {
  return (
    <View>
    {props.title && <>
        <Title style={styles.title}>{props.title}</Title>
        <View style={styles.blankView}/>
    </>   }   
    <Title style={styles.label}>{props.label}</Title> 
  <TextInput
        placeholderTextColor={appColors.title}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        secureTextEntry={props.secureTextEntry}
        mode="outlined"
        style={styles.input}
        theme={{
            colors: {
              primary: props.error ? 'red' : appColors.gray, 
              outline: props.error ? 'red' : appColors.gray,
            },
             
          }}
      /> 
   {props.error && <Title style={styles.error}>{props.error}</Title>}
    </View>
  )
}

