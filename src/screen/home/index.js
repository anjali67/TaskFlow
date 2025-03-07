import React , {useState} from 'react';
import { View, TouchableOpacity, Image,SafeAreaView ,Text} from 'react-native';
import { Delete } from '../../assets/icons/delete';
import { styles } from './styles';
import { Title } from 'react-native-paper';
import appColors from '../../theme/appColors';
import TaskList from '../otherComponents/taskList';
import { FAB } from 'react-native-paper';
import PopupModal from '../components/popupModal';


const HomeScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <SafeAreaView>
      <View style={{width:"100%"}}>
          {/* Header Section */}
     <View style={styles.conatiner}>
        <View />
        <TouchableOpacity onPress={() => toggleModal()}>
          <Delete  />
        </TouchableOpacity>
      </View> 

      {/* Main Content */}
     <View style={styles.main}>
        <View style={styles.circleStyle} />
        <View style={styles.mainView}>
          <Text style={styles.title}>My Tasks</Text>
          <Title style={styles.textStyle}>0 of 0 Task</Title>
        </View> 
      </View> 

      {/* Divider Image */}
     <View style={styles.imageView}>
        <Image
          style={styles.imageStyle}
          tintColor={'#D3D3D3'}
          source={require('../../assets/images/divider.png')}
        />
      </View>

      {/* Lottie Animation */}
      <TaskList navigation={navigation}/> 
     {/* <LottieAnimation/> */}
       
       {/* {popup Modal} */}
       <PopupModal
              setModalVisible={setModalVisible}
              modalVisible={modalVisible}
            />
      </View>
      {/* Floating Action Button */}
      <FAB
        icon="plus"
        color={appColors.white}
        style={styles.fab}
        onPress={() => navigation.navigate('AddTask')}
      />
      
    </SafeAreaView>
  );
};

export default HomeScreen;