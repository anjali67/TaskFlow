import { StyleSheet } from "react-native";
import appColors from "../../../theme/appColors";
import { fontSizes, windowHeight, windowWidth } from "../../../theme/appConstant";
import appFonts from "../../../theme/appFonts";

export default styles = StyleSheet.create({
    main:{
        flex: 1, justifyContent: 'center', alignItems: 'center'
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    mainContainer: {
      backgroundColor: appColors.white,
      paddingHorizontal: windowHeight(13),
      borderRadius: windowHeight(15),
      paddingTop: windowHeight(17),
      paddingBottom: windowHeight(8),
    },
    title: {
      color: appColors.title,
      fontFamily: appFonts.RobotoMedium,
      fontSize: fontSizes.FONT19,
      textAlign: 'center',
    },
    cancel: {
      fontFamily: appFonts.RobotoRegular,
    },
    content: {
      color: appColors.gray,
      fontFamily: appFonts.RobotoRegular,
      fontSize: fontSizes.FONT19,
      width: windowWidth(350),
      textAlign: 'center',
      marginVertical: windowHeight(8),
    },
    horizontalLine: {
      borderTopColor: appColors.lightGray,
      borderTopWidth: 1,
      marginTop: windowHeight(8),
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-around',
  
      bottom: windowHeight(7),
    },
    vertical: {
      height: '110%',
      width: 1.1,
      backgroundColor: appColors.lightGray,
    },
    remove: {
      fontFamily: appFonts.RobotoRegular,
      color: '#4466F2',
    },
  });
  