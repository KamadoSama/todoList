import React, { useEffect } from 'react'
import { Button, View } from 'react-native';
import { retrieveTasks } from "../db/db";
const CalendarScreen = () => {
    useEffect(() => {
      retrieveTasks();},
       []);
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button onPress={() => navigation.goBack()} title="Go back home" />
        </View>
      );
  
}

export default CalendarScreen