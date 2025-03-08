import { StyleSheet } from 'react-native';
import { fontSizes, windowHeight, windowWidth } from '../../theme/appConstant';
import appColors from '../../theme/appColors';
import appFonts from '../../theme/appFonts';

export const styles = StyleSheet.create({
  mainContainer: {
   height:"93%",
    backgroundColor: appColors.white,
  },
  conatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: windowWidth(8),
  },
  circleStyle: {
    height: windowHeight(24),
    width: windowHeight(24),
    borderWidth: 4,
    borderRadius: windowHeight(20),
    borderColor: appColors.gray,
  },
  main: {
    marginTop: windowHeight(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainView: {
    marginHorizontal: windowHeight(20),
  },
  imageStyle: {
    width: windowWidth(350),
    height: windowHeight(3),
  },
  imageView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: windowHeight(10),
  },
  title: {
    fontFamily: appFonts.RobotoBlack,
    color: appColors.black,
    fontWeight: 'bold',
    fontSize: fontSizes.FONT38,
  },
  textStyle: {
    color: '#d3d3d3',
    fontFamily: appFonts.RobotoRegular,
    fontSize: fontSizes.FONT20HALF,
  },
  fab: {
   position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: appColors.title,
  },
});