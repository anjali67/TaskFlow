import { StyleSheet } from "react-native";
import appColors from "../../../theme/appColors";
import { windowHeight, windowWidth } from "../../../theme/appConstant";

export const styles = StyleSheet.create({
    main:{
        marginTop:windowHeight(20),
        right:windowWidth(10)
    },
    task:{
        width:'97%',
        height:70,
      
        backgroundColor:appColors.white,
        shadowOpacity:0.08,
        shadowOffset:{
            width:0,
            height:20
        },
        shadowRadius:10,
        elevation:5,
        borderRadius:10,
        padding:15
    },
    mainContainer:{
        width:'100%',
        alignItems:"center",
        justifyContent:"center",
        paddingLeft:20,
        marginVertical:10,
    },
    iconContainer:{
        height:70,
        width:70,
        position:"absolute",
        right:0,
        alignItems:"center",
        justifyContent:"center"
    }
});





