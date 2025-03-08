import { StyleSheet } from "react-native";
import { windowHeight, windowWidth } from "../../theme/appConstant";
import appColors from "../../theme/appColors";
import appFonts from "../../theme/appFonts";
import { fontSizes } from "../../theme/appConstant";

export const styles = StyleSheet.create({
  mainConatiner:{
    flex:1,
    backgroundColor:appColors.white
  },
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
    },
     error:{
          color:appColors.error,
          fontFamily:appFonts.RobotoBold,
          fontSize:fontSizes.FONT20,
          marginHorizontal:windowWidth(10)
        }
   
  });