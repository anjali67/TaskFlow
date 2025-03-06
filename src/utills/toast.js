import Toast from 'react-native-toast-message';
 export const showInfoToast = () => {
             Toast.show({
                type: 'info',
                text1: 'Oops!',
                text2: 'You must fill all Fields',
                visibilityTime: 1000,
                  position: 'top'
              });
      };