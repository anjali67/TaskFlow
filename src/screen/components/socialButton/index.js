import { StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import { windowHeight, windowWidth } from '../../../theme/appConstant'
import appColors from '../../../theme/appColors'


export default function SocialButton(props) {
  return (
     <TouchableOpacity activeOpacity={0.5} style={styles.innerContainer}>
         {props.icon}
     </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
   innerContainer:{
    height:windowHeight(38),
    width:windowHeight(38),
    borderRadius:windowHeight(20),
    borderColor:appColors.gray,
    borderWidth:1,
    alignItems:"center",
    justifyContent:"center",
    margin:windowWidth(10)
   }
})