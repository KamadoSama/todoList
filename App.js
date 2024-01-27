import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabRoute from './components/Tab';
import { Provider } from "react-redux";
import { store } from './redux/redux';
export default function App() {
  
  return (
   <Provider store={store}>
    <NavigationContainer>
      <TabRoute />
    </NavigationContainer>
    </Provider>
  );
}

