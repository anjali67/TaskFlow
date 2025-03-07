import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FlashMessage from 'react-native-flash-message';
import Drawer from '../drawer';
import Home from '../screen/home';
import Search from '../screen/search';
import Settings from '../screen/settings';
import Notification from '../screen/notification';
import AddTask from '../screen/addTask';

const Stack = createNativeStackNavigator();

const ScreenWrapper = ({ component: Component, ...rest }) => (
  <Drawer>
    <Component {...rest} />
  </Drawer>
);

export default function Navigation() {
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
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
      </Stack.Navigator>
      <FlashMessage position={'bottom'} />
    </>
  );
}