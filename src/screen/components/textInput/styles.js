import { StyleSheet } from "react-native";
import appColors from "../../../theme/appColors";
import { windowHeight, windowWidth } from "../../../theme/appConstant";
import appFonts from "../../../theme/appFonts";
import { fontSizes } from "../../../theme/appConstant";

export const styles = StyleSheet.create({
    title:{
      color:appColors.title,
      fontFamily:appFonts.RobotoBold,
      fontSize:fontSizes.FONT24,
      textAlign:"center",
      marginTop:windowHeight(15)
    },
      input: {
       // marginBottom: windowHeight(5),
        fontSize:fontSizes.FONT17HALF,
        bottom:windowHeight(3),
        borderColor:appColors.gray,
        height:windowHeight(42),
        fontWeight:appFonts.RobotoRegular,
        marginHorizontal:windowWidth(8)
      },
      label:{
        fontFamily:appFonts.RobotoBold,
        fontSize:fontSizes.FONT18HALF,
        color:appColors.black,
        marginHorizontal:windowWidth(8)
      },
      blankView:{
        height:windowHeight(15)
      },
      error:{
        color:'red',
        fontFamily:appFonts.RobotoBold,
        fontSize:fontSizes.FONT16,
        marginHorizontal:windowWidth(10),
        bottom:windowHeight(6)
      }
     
})