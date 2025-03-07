import React from 'react';
import { View ,Image,ScrollView} from 'react-native';
import TextInputView from '../components/textInput';
import AuthBottom from '../components/authBottom';
import { styles } from './styles';
import {  ValidateEmail, ValidPassword } from '../../utills/Validation';
import { useSelector , useDispatch } from 'react-redux';
import { clearError, loginUser, setToken } from '../../redux/slice/loginSlice';
import { Title } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { displayMessage } from '../../utills/function';

const Login = (props) => {
   const [email, setEmail] = React.useState('');
   const [password, setPassword] = React.useState('');
   const [emailError,setEmailError] = React.useState('')
   const [passwordError,setPassowrdError] =  React.useState('')
    const [checked, setChecked] = React.useState(false);
    const [buttonCheckError,setButtonCheckedError] = React.useState('')
    const [error,setError] = React.useState('')
    const dispatch = useDispatch()
    const {loading } = useSelector((state) => state.login)


    const onButtonPress = async () => {
      const emailValidation = ValidateEmail(email);
      const passwordValidation = ValidPassword(password);
  
      if (emailValidation || passwordValidation || checked == false) {
        setEmailError(emailValidation);
        setPassowrdError(passwordValidation);
        setButtonCheckedError('Please select agreement');
        return;
      } else {
        try {
          dispatch(clearError());
          const payload = { email, password };
          dispatch(loginUser(payload))
            .unwrap()
            .then(async (response) => {
              // Save the token to AsyncStorage
              await AsyncStorage.setItem('token', response.token);
  
              // Dispatch an action to set the token in the Redux state
              dispatch(setToken(response.token));
              console.log("RESPONSE IS",response)
              displayMessage({message:'Login Successfully'})  
              setEmailError('');
              setPassowrdError('');
              setError('');
              props.navigation.navigate('Home');
            })
            .catch((error) => {
              console.log('ERROR IS', error);
              setError(error?.msg || 'Login failed');
            });
        } catch (error) {
          console.log('ERROR IS', error);
          setError(error?.msg || 'Login failed');
        }
      }
    };
  

  return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainerStyle} style={styles.container}>
        <View style={styles.main}>
             <Image source={require('../../assets/images/Vector.png')} style={styles.image}/>
        </View>
     <TextInputView  title={'Sign in to your account'}  label={'Email address'}   placeholder={"Enter your email address"}  onChangeText={(text) => {
          setEmail(text)
          setEmailError(ValidateEmail(text))
     }}
     error={emailError}
     />
     <TextInputView secureTextEntry  placeholder={"Enter your password"} label={'Password'}  onChangeText={(text) => {
      setPassword(text)
      setPassowrdError(ValidPassword(text))
     }}
      error={passwordError}
     />
     {error && <Title style={styles.error}>{error}</Title>}
    <AuthBottom btnTitle={'Sign in'} loading={loading} onButtonPress={() => onButtonPress()} gotoScreen={() => props.navigation.navigate('SignUp') } checkedButton={checked} setCheckedButton={setChecked} buttonCheckError={buttonCheckError} title={'Don’t have an account?'} subTitle={'Create Account'}/> 
    </ScrollView>

  );
};

export default Login;