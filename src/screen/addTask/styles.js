import { StyleSheet } from "react-native";
import { fontSizes, windowHeight, windowWidth } from "../../theme/appConstant";
import appFonts from "../../theme/appFonts";
import appColor from '../../theme/appColors'

export const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    backgroundColor:appColor.white
  },
 container:{
     marginTop:windowHeight(40),
     marginHorizontal:windowWidth(20),
 },
 dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
    width: '100%',
    marginTop:windowHeight(40)
  },
  divider: {
    flex: 1, 
    height: 1,
    backgroundColor: '#D3D3D3', 
  },
  text: {
    marginHorizontal: 8, 
    fontFamily:appFonts.RobotoBlack,
           color:appColors.black,
           fontWeight:"bold",
           fontSize:fontSizes.FONT38
  },
  textView:{
    marginTop:windowHeight(10)
  },
  textStyle:{
    color:appColor.gray,
    fontFamily:appFonts.RobotoRegular,
    fontSize:fontSizes.FONT20
  },
  main:{
    marginTop:windowHeight(20),
   
  },
  textInput:{
    color:appColor.black,
    fontFamily:appFonts.RobotoRegular,
    fontSize:fontSizes.FONT18
  },
   button: {
          marginTop: windowHeight(30),
          padding:windowHeight(3),
         width:windowWidth(380),
         backgroundColor:appColors.title,
         borderRadius:windowHeight(20), 
        },
        center:{
          alignItems:"center",justifyContent:"center",
          marginTop:windowHeight(20)
        },
        toastView:{
          padding: 10, backgroundColor:appColor.lightGray , borderRadius: 5 
        },
        toastText:{ color: 'white', fontWeight: 'bold' }
 
})