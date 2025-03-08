import { StyleSheet } from "react-native";
import appFonts from "../../../theme/appFonts";
import { fontSizes, windowHeight } from "../../../theme/appConstant";
import appColors from "../../../theme/appColors";

export const styles = StyleSheet.create({
    lottieView:{
        width:"100%",
        alignItems:"center",
        justifyContent:"center",
       
        
    },
     textStyle:{
            color:appColors.black,
            fontFamily:appFonts.RobotoRegular,
            fontSize:fontSizes.FONT20HALF
        },
})