import * as React from "react";
// import { Button, View } from 'react-native';

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomeScreen from "./screens/HomeScreen";
import NotificationScreen from "./screens/NotificationScreen";
import AddScreen from "./screens/AddScreen";
import FindScreen from "./screens/FindScreen";
import CalendarScreen from "./screens/CalendarScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          // tabBarIcon: ({ focused, color, size }) => {
          //   let iconName;

          //   if (route.name === 'Home') {
          //     iconName = focused
          //       ? 'ios-home'
          //       : 'ios-home';
          //   } else if (route.name === 'Settings') {
          //     iconName = focused ? 'ios-list' : 'ios-list-outline';
          //   }

          //   // You can return any component that you like here!
          //   return <Ionicons name={iconName} size={size} color={color} />;
          // },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="ios-home"
                size={24}
                color={focused ? "tomato" : "gray"}
              />
            ),
          }}
          name="Home"
          component={HomeScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="ios-search"
                size={24}
                color={focused ? "tomato" : "gray"}
              />
            ),
          }}
          name="Find"
          component={FindScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="ios-add"
                size={24}
                color={focused ? "tomato" : "gray"}
              />
            ),
          }}
          name="Add"
          component={AddScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="ios-calendar"
                size={24}
                color={focused ? "tomato" : "gray"}
              />
            ),
          }}
          name="Calendar"
          component={CalendarScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="ios-bar-chart"
                size={24}
                color={focused ? "tomato" : "gray"}
              />
            ),
          }}
          name="Settings"
          component={NotificationScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
