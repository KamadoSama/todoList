import * as React from "react";
import { Button, View, StyleSheet,Text } from "react-native";
import { Image } from "expo-image";
export default function NotificationScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.viewTop}>
        <Image
          style={styles.image}
          source={require("../assets/idea.svg")}
          contentFit="cover"
        />
      </View>

      <View style={styles.viewBottom}>
        <View style={styles.viewMiddle}>
          <View style={{width:'30%',height:"100%", }}>
            <Image
              style={{...styles.image,height:"100%"}}
              source={require("../assets/task.png")}
              contentFit="cover"
            />
          </View>
          <View style={{width:'60%',height:"100%"}} >
            <Text style={{fontWeight: "900",fontSize: 16,color: "#132033"}} >Salut, Kamado</Text>
            <Text style={{fontWeight: "100",fontSize: 14,color: "#b2bccd"}} >Tu as 4 tâches à faire aujourd'hui, 1 de haute priorité, 2 de moyenne priorité et 1 de basse priorité </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#145ac7",
  },
  viewTop: {
    backgroundColor: "transparent",
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  viewMiddle: {
    backgroundColor: "#fff",
    height: 120,
    position: "absolute",
    flexDirection: "row",
    width: "90%",
    borderRadius: 20,
    top: -30,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  viewBottom: {
    backgroundColor: "#E8EAED",
    height: "60%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  image: {
    flex: 1,
    width: "100%",

  },
});
