import React from "react";
import { Button, View } from "react-native";
const NotifScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button onPress={() => navigation.goBack()} title="Go back hme" />
    </View>
  );
};

export default NotifScreen;
