import { StyleSheet } from "react-native";
import { windowHeight } from "../../theme/appConstant";
import appColors from "../../theme/appColors";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor:appColors.white
    },
    main:{
      alignItems:"center",
      justifyContent:"center",
      marginTop:windowHeight(30)
    },
    image:{
      height:windowHeight(60),
      width:windowHeight(60),
      resizeMode:"contain"
    },
    contentContainerStyle:{
  paddingBottom:windowHeight(50)
    }
   
  });