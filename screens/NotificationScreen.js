import * as React from 'react';
import { Button, View , StyleSheet } from 'react-native';
import { Image } from 'expo-image';
export default function NotificationScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <View style={styles.viewTop}>
        <Image
        style={styles.image}
        source={require('../assets/idea.svg')}
   
        contentFit="cover"
    
      />
        </View>
        <View style={styles.viewBottom}>

        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#145ac7",
  },
  viewTop:{
    backgroundColor: "transparent",
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  viewBottom:{
    backgroundColor: "#fff",
    height: "60%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    width: '100%',
    backgroundColor: '#0553',
  },
  
})