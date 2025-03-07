import { showMessage } from 'react-native-flash-message';
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

export const displayMessage = ({message,type}) => {
  showMessage({
    message: message,
    type: type ? type : 'success',
    duration: 1000,
    floating: true,
    icon: 'auto',
  });
}


      