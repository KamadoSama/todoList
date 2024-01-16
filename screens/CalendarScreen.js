import React from 'react'
import { Button, View } from 'react-native';
const CalendarScreen = () => {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button onPress={() => navigation.goBack()} title="Go back home" />
        </View>
      );
  
}

export default CalendarScreen