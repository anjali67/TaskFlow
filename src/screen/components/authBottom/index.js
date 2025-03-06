import { TouchableOpacity, View} from 'react-native'
import React from 'react'
import { styles } from './styles'
import { RadioButton, Title,Button, ActivityIndicator } from 'react-native-paper'
import appColors from '../../../theme/appColors';
import appFonts from '../../../theme/appFonts';
import SocialButton from '../socialButton';
import { Google } from '../../../assets/icons/google';
import { Facebook } from '../../../assets/icons/facebook';
import { windowHeight } from '../../../theme/appConstant';

export default function AuthBottom(props) {
  return (
    <>
    <View style={styles.container}>
      <View style={styles.row}>
      <RadioButton
        status={props.checkedButton ? "checked" : "unchecked"}
        onPress={() => props.setCheckedButton(!props.checkedButton)}
        color={appColors.title} 
      />
         <Title style={styles.title}>  I’ve read and agreed to <Title style={[styles.title,{color:appColors.title,fontFamily:appFonts.RobotoBold}]}>User Agreement  </Title>
           and <Title style={[styles.title,{color:appColors.title,fontFamily:appFonts.RobotoBold}]}>Privacy Policy</Title></Title>
          
      </View>
      {!props.checkedButton && <Title style={styles.error}>{props.buttonCheckError}</Title>}
     <View style={styles.center}>
     <Button mode="contained" onPress={props.onButtonPress} style={styles.button}>
         {props.loading ? <ActivityIndicator color='white'/> : props.btnTitle} 
      </Button>
      <Title style={styles.textStyle}>other way to sign in</Title>
      <View style={styles.rowView}>
     <SocialButton icon={<Google/>}/>
     <SocialButton icon={<Facebook/>}/>
     </View>
     </View>
     <View style={styles.inner}>
     <Title style={styles.title}>{props.title}<TouchableOpacity onPress={props.gotoScreen}><Title style={[styles.title,{color:appColors.title,fontFamily:appFonts.RobotoBlack,height:windowHeight(20),marginTop:windowHeight(5)}]}>{props.subTitle}</Title></TouchableOpacity></Title>
     </View>
    </View>   
    </>
  )
}