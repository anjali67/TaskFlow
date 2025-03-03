import { StyleSheet } from "react-native";
import { fontSizes, windowHeight, windowWidth } from "../../../theme/appConstant";
import appColors from "../../../theme/appColors";
import appFonts from "../../../theme/appFonts";

export const styles = StyleSheet.create({
    container:{
        marginTop:windowHeight(15),
    },
    row:{
        flexDirection:"row",
        alignItems:"center",
       
    },
    title:{
        fontSize:fontSizes.FONT17HALF,
         lineHeight:20,
         color:appColors.lightGray,
         fontFamily:appFonts.RobotoMedium,
        width:windowWidth(414),
        left:windowWidth(6)
    },
    button: {
        marginTop: windowHeight(30),
        padding:windowHeight(3),
       width:windowWidth(380),
       backgroundColor:appColors.title,
       borderRadius:windowHeight(20), 
      },
      center:{
        alignItems:"center",
        justifyContent:"center"
      },
      textStyle:{
        fontFamily:appFonts.RobotoThin,
        fontSize:fontSizes.FONT19HALF,
        color:appColors.lightGray,
        marginTop:windowHeight(6)
      },
      rowView:{
        flexDirection:"row",
        justifyContent:"center",
        marginTop:windowHeight(10)
      },
     
      inner:{
       flexDirection:"row",
         marginTop:windowHeight(20),
        left:windowHeight(20)
      },
        error:{
              color:'red',
              fontFamily:appFonts.RobotoBold,
              fontSize:fontSizes.FONT16,
              marginHorizontal:windowWidth(10),
              bottom:windowHeight(6)
            }
});