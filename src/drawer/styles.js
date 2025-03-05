import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#004643',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      },
      mainContainer:{
        flexGrow: 1,
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  paddingHorizontal: 15,
                  paddingVertical: 20,
      },
      image:{
          width: 20,
                        height: 20,
                        tintColor: 'black',
                        marginTop: 40,
      },
      tabContainer:{
        flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 8,
            paddingLeft: 13,
                    paddingRight: 35,
                    marginTop: 15,
      },
      textStyle:{
        fontSize: 15,
            fontWeight: 'bold',
            paddingLeft: 15,
      },
      imageStyle:{
        width: 25,
        height: 25,
      }
})