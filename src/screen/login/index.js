import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import TextInputView from '../components/textInput';
import AuthBottom from '../components/authBottom';
import { styles } from './styles';
import { ValidateEmail, ValidPassword } from '../../utills/Validation';
import { useSelector, useDispatch } from 'react-redux';
import { clearError, loginUser, setToken } from '../../redux/slice/loginSlice';
import { Title } from 'react-native-paper';
import { displayMessage } from '../../utills/function';
import { fetchTasks } from '../../redux/slice/taskSlice';

const Login = (props) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPassowrdError] = React.useState('');
  const [checked, setChecked] = React.useState(false);
  const [buttonCheckError, setButtonCheckedError] = React.useState('');
  const [error, setError] = React.useState('');
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.login);

  const onButtonPress = async () => {
    const emailValidation = ValidateEmail(email);
    const passwordValidation = ValidPassword(password);

    if (emailValidation || passwordValidation || !checked) {
      setEmailError(emailValidation);
      setPassowrdError(passwordValidation);
      setButtonCheckedError('Please select agreement');
      return;
    }

   else {
    
    const payload = { email, password };

    dispatch(loginUser(payload))
      .unwrap()
      .then(async (response) => {
        // Save the token to AsyncStorage
        dispatch(setToken(response.token));
        await dispatch(fetchTasks());
        // Clear errors
        setEmailError('');
        setPassowrdError('');
        setError('');
        dispatch(clearError());
        displayMessage({ message: 'Login Successfully' });
        // props.navigation.dispatch(
        //   CommonActions.reset({
        //     index: 0,
        //     routes: [{ name: 'Home' }],
        //   })
        // );
        
         props.navigation.navigate('Home');
      })
      .catch((error) => {
        console.log('ERROR IS', error);
        setError(error?.message || 'Login failed');
      });
   }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainerStyle}
      style={styles.container}
    >
      <View style={styles.main}>
        <Image source={require('../../assets/images/Vector.png')} style={styles.image} />
      </View>
      <TextInputView
        title={'Sign in to your account'}
        label={'Email address'}
        placeholder={'Enter your email address'}
        onChangeText={(text) => {
          setEmail(text);
          setEmailError(ValidateEmail(text));
        }}
        error={emailError}
      />
      <TextInputView
        secureTextEntry
        placeholder={'Enter your password'}
        label={'Password'}
        onChangeText={(text) => {
          setPassword(text);
          setPassowrdError(ValidPassword(text));
        }}
        error={passwordError}
      />
      {error && <Title style={styles.error}>{error}</Title>}
      <AuthBottom
        btnTitle={'Sign in'}
        loading={loading}
        onButtonPress={onButtonPress}
        gotoScreen={() => props.navigation.navigate('Signup')}
        checkedButton={checked}
        setCheckedButton={setChecked}
        buttonCheckError={buttonCheckError}
        title={"Don’t have an account?"}
        subTitle={'Create Account'}
      />
    </ScrollView>
  );
};

export default Login;