import React from 'react';
import { View ,Image,ScrollView} from 'react-native';
import TextInputView from '../components/textInput';
import AuthBottom from '../components/authBottom';
import { styles } from './styles';
import {  ValidateEmail, ValidPassword } from '../../utills/Validation';
import { useSelector , useDispatch } from 'react-redux';
import { clearError, loginUser } from '../../redux/slice/loginSlice';
import {showMessage} from 'react-native-flash-message';

const Login = (props) => {
   const [email, setEmail] = React.useState('');
   const [password, setPassword] = React.useState('');
   const [emailError,setEmailError] = React.useState('')
   const [passwordError,setPassowrdError] =  React.useState('')
    const [checked, setChecked] = React.useState(false);
    const [buttonCheckError,setButtonCheckedError] = React.useState('')
    const dispatch = useDispatch()
    const {loading } = useSelector((state) => state.login)
  
   const onButtonPress =  async() => {
     const emailValidation = ValidateEmail(email)
     const passwordValidation = ValidPassword(password)

     if(emailValidation || passwordValidation || checked == false) {
       setEmailError(emailValidation)
       setPassowrdError(passwordValidation)
       setButtonCheckedError("Please select agreement")
       return
     } else {
      try {
        dispatch(clearError())
        const payload = { email, password}

        dispatch(loginUser(payload))
        .unwrap()
        .then(() => {showMessage({
          message: 'Login Successfully',
          type: 'success',
          duration: 1000,
          floating: true,
          icon: 'auto', 
        }),setEmailError(''),setPassowrdError('')})
        .catch((error) => {
          console.log('ERROR IS', error);
          setEmailError(error?.msg || 'Login failed')
        })
      } catch (error) {
         console.log("ERROR IS",error)
         setEmailError(error?.msg || 'Login failed')
      }
     }
   }

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
    <AuthBottom loading={loading} onButtonPress={() => onButtonPress()} gotoScreen={() => props.navigation.navigate('SignUp') } checkedButton={checked} setCheckedButton={setChecked} buttonCheckError={buttonCheckError} title={'Don’t have an account?'} subTitle={'Create Account'}/> 
    </ScrollView>
  );
};

export default Login;