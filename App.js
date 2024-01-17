import React , {useState} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { HomeScreen, FindScreen,NotificationScreen,CalendarScreen,AddScreen } from "./screens"; 
import { View,TouchableOpacity,StyleSheet, Button } from "react-native";


const Tab = createBottomTabNavigator();
const CustomTabBarButton = ({children,onPress}) => (
  <TouchableOpacity
  style={{
    top: -30,
    justifyContent: 'center',
    alignItems: 'center',
    ...styles.shadow
  }}
  onPress={onPress}
  >
    
    <View style={{width:60,height:60,borderRadius:20, backgroundColor:'#277dfa' }} >
      {children}
    </View>
  </TouchableOpacity>
  
)
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#ffffff",
            height: 70,
          },
        })}
      >
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="ios-home"
                size={24}
                color={focused ? "#277dfa" : "#b2bccd"}
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
                color={focused ? "#277dfa" : "#b2bccd"}
              />
            ),
          }}
          name="Find"
          component={FindScreen}
        />
        <Tab.Screen
         name="Add"
         component={AddScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="ios-add"
                size={34}
                color={focused ? "#f3f6fd" : "#f3f6fd"}
              />
            ),
            tabBarButton: (props) => (
              <CustomTabBarButton {...props} />
            )
          }}
         
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="ios-calendar"
                size={24}
                color={focused ? "#277dfa" : "#b2bccd"}
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
                color={focused ? "#277dfa" : "#b2bccd"}
              />
            ),
          }}
          name="Settings"
          component={NotificationScreen}
        />
      </Tab.Navigator>ù
    <Button title="Go back home" >Go back home</Button>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#277dfa" ,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 55,
  },
});