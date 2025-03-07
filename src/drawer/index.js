import React, { useRef, useState, useCallback } from 'react';
import { Animated, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; 
import HomeIcon from '../assets/images/home.png';
import SearchIcon from '../assets/images/search.png';
import NotificationIcon from '../assets/images/bell.png';
import SettingsIcon from '../assets/images/settings.png';
import LogoutIcon from '../assets/images/logout.png';
import menu from '../assets/images/menu.png';
import close from '../assets/images/close.png';
import { styles } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { logOutUser } from '../redux/slice/loginSlice';

const Drawer = ({ children }) => {
  const navigation = useNavigation();
  const [currentTab, setCurrentTab] = useState('Home'); 
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch()

  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;

  const handleTabPress = async (title) => {
    if (title === 'LogOut') {
      await AsyncStorage.setItem('token',null)
      dispatch(logOutUser())
      navigation.navigate('Auth')
    } else {
      setCurrentTab(title);
      navigation.navigate(title); 
    }
  };

  const animateDrawer = () => {
    Animated.timing(scaleValue, {
      toValue: showMenu ? 1 : 0.88,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(offsetValue, {
      toValue: showMenu ? 0 : 230,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(closeButtonOffset, {
      toValue: !showMenu ? -30 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setShowMenu(!showMenu);
  };

  
  useFocusEffect(
    useCallback(() => {
      const currentRoute = navigation.getState()?.routes[navigation.getState().index]?.name;
      if (currentRoute) {
        setCurrentTab(currentRoute); 
      }
    }, [navigation])
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Drawer Content */}
      <View style={{ justifyContent: 'flex-start', padding: 15 }}>
        <View style={{ flexGrow: 1, marginTop: 50 }}>
          <TabButton
            currentTab={currentTab}
            handleTabPress={handleTabPress}
            title="Home"
            image={HomeIcon}
          />
          <TabButton
            currentTab={currentTab}
            handleTabPress={handleTabPress}
            title="Search"
            image={SearchIcon}
          />
          <TabButton
            currentTab={currentTab}
            handleTabPress={handleTabPress}
            title="Notification"
            image={NotificationIcon}
          />
          <TabButton
            currentTab={currentTab}
            handleTabPress={handleTabPress}
            title="Settings"
            image={SettingsIcon}
          />
        </View>

        <View>
          <TabButton
            currentTab={currentTab}
            handleTabPress={handleTabPress}
            title="LogOut"
            image={LogoutIcon}
          />
        </View>
      </View>

      {/* Main Content */}
      <Animated.View
        style={[styles.mainContainer,{  borderRadius: showMenu ? 15 : 0,
          transform: [{ scale: scaleValue }, { translateX: offsetValue }]}]}
      >
        <Animated.View
          style={{
            transform: [{ translateY: closeButtonOffset }],
          }}
        >
          <TouchableOpacity onPress={animateDrawer}>
            <Image
              source={showMenu ? close : menu}
              style={styles.image}
            />
          </TouchableOpacity>
          {children}
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
};

const TabButton = ({ currentTab, handleTabPress, title, image }) => {
  return (
    <TouchableOpacity onPress={() => handleTabPress(title)}>
      <View
        style={[styles.tabContainer,{ backgroundColor: currentTab === title ? '#5F8575' : 'transparent'}]}
      >
        <Image
          source={image}
          style={[styles.imageStyle,{ tintColor: currentTab === title ? '#355E3B' : 'white',}]}
        />
        <Text
          style={[styles.textStyle,{ color: currentTab === title ? '#355E3B' : 'white',}]}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default Drawer;