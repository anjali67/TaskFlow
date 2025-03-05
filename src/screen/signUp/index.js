import React  from 'react';
import { View ,Image,ScrollView} from 'react-native';
import TextInputView from '../components/textInput';
import AuthBottom from '../components/authBottom';
import { styles } from './styles';
import { ValidateConfirmPassword, ValidateEmail, ValidateName, ValidPassword } from '../../utills/Validation';
import { clearError, registerUser } from '../../redux/slice/registerSlice'
import { useDispatch , useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';

const SignUp = (props) => {

   const [name,setName] = React.useState('')
   const [email, setEmail] = React.useState('');
   const [password, setPassword] = React.useState('');
   const [confirmPassword,setConfirmPassword] = React.useState('')
   const [nameError,setNameError] = React.useState('')
   const [emailError,setEmailError] = React.useState('')
   const [passwordError,setPassowrdError] =  React.useState('')
   const [confirmPasswordError,setConfirmPasswordError] =  React.useState('')
   const [checked, setChecked] = React.useState(false);
   const [buttonCheckError,setButtonCheckedError] = React.useState('')
   const dispatch = useDispatch()
   const { loading } = useSelector((state) => state.auth);

   const onButtonPress = async () => {

    const nameValidation = ValidateName(name);
    const emailValidation = ValidateEmail(email);
    const passwordValidation = ValidPassword(password);
    const confirmValidation = ValidateConfirmPassword(password, confirmPassword);
  
    if (nameValidation || emailValidation || passwordValidation || confirmValidation || !checked) {
      setNameError(nameValidation);
      setEmailError(emailValidation);
      setPassowrdError(passwordValidation);
      setConfirmPasswordError(confirmValidation);
      setButtonCheckedError(!checked ? 'Please select agreement' : '');
      return;
    }
    try {
      dispatch(clearError());
      const payload = { name, email, password };
      
      dispatch(registerUser(payload))
        .unwrap()
        .then(() => {
         showMessage({
                   message: 'Register Successfully',
                   type: 'success',
                   duration: 1000,
                   floating: true,
                   icon: 'auto', 
                 }),
                 setEmailError('')
                 props.navigation.navigate('Login')
        })
        
        .catch((error) => {
          console.log('ERROR IS', error);
          setEmailError(error?.msg || 'Registration failed'); 
        });
    } catch (error) {
      console.log('ERROR IS', error);
      setEmailError(error?.msg || 'Registration failed'); 
    }
  };
  
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainerStyle} style={styles.container}>
        <View style={styles.main}>
             <Image source={require('../../assets/images/Vector.png')} style={styles.image}/>
        </View>
        <TextInputView  title={'Create new account'} label={'Name'}   placeholder={"Enter your name"}  onChangeText={(text) => {
          setName(text)
          setNameError(ValidateName(text)) 
     }}
     error={nameError}
     />
     <TextInputView    label={'Email address'}   placeholder={"Enter your email address"}  onChangeText={(text) => {
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
     <TextInputView secureTextEntry  placeholder={"Enter your confirm password"} label={' Confirm Password'}  onChangeText={(text) => {
      setConfirmPassword(text)
      setConfirmPasswordError(ValidateConfirmPassword(password,text))
     }}
     error={confirmPasswordError}
     />
    <AuthBottom btnTitle={'SignUp'} onButtonPress={() => onButtonPress()} gotoScreen={() => props.navigation.navigate('Login') } checkedButton={checked} setCheckedButton={setChecked} buttonCheckError={buttonCheckError} title={'Already have an account?'} subTitle={'Back to Sign In'} loading={loading}/> 
    </ScrollView>
  );
};

export default SignUp;