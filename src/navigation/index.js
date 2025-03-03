import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screen/login'
import SignUp from '../screen/signUp';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import FlashMessage from 'react-native-flash-message'; 

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
      <Provider store={store}>
        <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
   </Stack.Navigator>
   <FlashMessage position={'bottom'}/>
    </NavigationContainer>
      </Provider>

  )
}