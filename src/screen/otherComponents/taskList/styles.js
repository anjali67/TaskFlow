import { StyleSheet } from "react-native";
import appColors from "../../../theme/appColors";
import { windowHeight, windowWidth } from "../../../theme/appConstant";
import { fontSizes } from "../../../theme/appConstant";
import appFonts from "../../../theme/appFonts";

export const styles = StyleSheet.create({
    main:{
       marginTop:windowHeight(10),
        right:windowWidth(10),
       paddingBottom:20,
       height:"73%"

    },
    task:{
        width:'97%',
        backgroundColor:appColors.white,
        shadowOpacity:0.08,
        shadowOffset:{
            width:0,
            height:20
        },
        shadowRadius:10,
        elevation:5,
        borderRadius:10,
        paddingBottom:windowHeight(12),        
       padding:20,     
    },
    mainContainer:{
        width:'100%',
        paddingLeft:20,
    },
    iconContainer:{
        position:"absolute",
        right:0,
        alignItems:"center",
        justifyContent:"center",
     top:windowHeight(-3)
    },
    title:{
        color:appColors.black,
        fontSize:fontSizes.FONT20,
        fontWeight:"bold"
    },
    description:{
        color:appColors.lightGray,
        fontFamily:appFonts.RobotoRegular,
         paddingTop:4
    },
    center:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
       
    }
});





