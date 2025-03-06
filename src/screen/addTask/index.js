import { View, SafeAreaView,TouchableOpacity,TextInput } from 'react-native'
import React , {useState} from 'react'
import { styles } from './styles'
import { Back } from '../../assets/icons/back'
import { Divider, Text , Button } from 'react-native-paper';
import appColors from '../../theme/appColors';
import Toast from 'react-native-toast-message';
import { showInfoToast } from '../../utills/toast';

export default function AddTask({navigation}) {
 const [title,setTitle] = useState('')
 const [description,setDescription] = useState('')

    const toastConfig = {
        info: ({ text1, text2 }) => (
          <View style={styles.toastView}>
            <Text style={styles.toastText}>{text1}</Text>
            <Text style={{ color: 'white' }}>{text2}</Text>
          </View>
        ),
      }
    
      const onAddTask = () => {
          if(!title.trim() || !description.trim()) {
            showInfoToast()
          }
      }

     
      
  return (
    <SafeAreaView style={styles.mainContainer}>
        <View style={styles.container}>
     <TouchableOpacity onPress={() => navigation.goBack()}>
     <Back/>
     </TouchableOpacity>
     <View style={styles.dividerContainer}>
        <Divider style={styles.divider} />
        <Text style={styles.text}>Add New Task</Text>
        <Divider style={styles.divider} />
      </View>
      <View style={styles.textView}>
        <Text style={styles.textStyle}>What are you planing 😇 ?</Text>
      </View>
      <View style={styles.main}>
        <Text style={[styles.textStyle,{color:appColors.black}]}>Title</Text>
        <TextInput placeholderTextColor={appColors.gray} style={styles.textInput} placeholder='Enter title' onChangeText={(text) => setTitle(text)}/>
        <Divider/>
      </View>
      <View style={styles.main}>
      <Text style={[styles.textStyle,{color:appColors.black}]}>Description</Text>
      <TextInput multiline placeholderTextColor={appColors.gray} style={[styles.textInput,{textAlignVertical:'top',minHeight:80}]} placeholder='Enter description' onChangeText={(text) => setDescription(text)}/>
      <Divider/>
      </View>   
    </View>
    <View style={styles.center}>
      <Button style={styles.button}  mode="contained" onPress={() => onAddTask()}>
   Add Task
  </Button>
  <Toast config={toastConfig} />
      </View>
    </SafeAreaView>
  )
}