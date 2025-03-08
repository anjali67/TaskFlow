import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import FlashMessage from 'react-native-flash-message';
import Drawer from '../drawer';
import Home from '../screen/home';
import Search from '../screen/search';
import Settings from '../screen/settings';
import Notification from '../screen/notification';
import AddTask from '../screen/addTask';
import Login from '../screen/login';
import Signup from '../screen/signUp';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const ScreenWrapper = ({ component: Component, ...rest }) => (
  <Drawer>
    <Component {...rest} />
  </Drawer>
);



const RootNavigation = () => {
  const [authToken,setAuthToken] = useState('')
  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem('token');
      setAuthToken(token || ''); 
    };
    getToken();
  }, []);

  if (authToken === null) return null;
  return (
    <>
       
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* {!authToken ? <> */}
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
        {/* </> : */}
        <>
          <Stack.Screen name="Home">
              {(props) => <ScreenWrapper {...props} component={Home} />}
            </Stack.Screen>
          <Stack.Screen name="Search">
              {(props) => <ScreenWrapper {...props} component={Search} />}
            </Stack.Screen>
            <Stack.Screen name="Settings">
              {(props) => <ScreenWrapper {...props} component={Settings} />}
            </Stack.Screen>
            <Stack.Screen name="Notification">
              {(props) => <ScreenWrapper {...props} component={Notification} />}
            </Stack.Screen>
            <Stack.Screen name="AddTask" component={AddTask} />    
        </>
        {/* } */}
      </Stack.Navigator>
      <FlashMessage position={'bottom'} />
    </>
  );
};

export default RootNavigation;