import React , {useState} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { HomeScreen, FindScreen,NotificationScreen,CalendarScreen,AddScreen } from "./screens"; 
import {TextInput, View,TouchableOpacity,StyleSheet, Button , Modal, Pressable, Text  } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

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
  const [taskName, setTaskName] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate !== undefined) {
      setSelectedDate(selectedDate);
    }
  };
  const handleAddTask = () => {
      if (taskName.trim()) {
        onAddTask(taskName);
        setTaskName(''); 
      }
    };
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    console.log("toggleModal")
    setModalVisible(!modalVisible);
  };
  
  return (
    <NavigationContainer>
       <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            
            <View style={styles.modalView}>
            <View style={styles.topModal}>
              <Text style={{fontSize:20,fontWeight:"bold"}}>Nouvelle tâche</Text>
              <Ionicons name="ios-close" size={24} color="#277dfa" onPress={toggleModal} />
            </View>
             <View style={{width:"100%",marginTop:10}}>
              <TextInput style={styles.input} placeholder="Titre de la tâche" value={taskName} onChangeText={text=>setTaskName(text)} />
              <TextInput style ={styles.input} placeholder="Description" value={taskName} onChangeText={text=>setTaskName(text)} />
              <TextInput style ={styles.input} placeholder="Categorie" value={taskName} onChangeText={text=>setTaskName(text)} />
             </View>
              <View>

              <TextInput
              style={styles.input}
            placeholder="Sélectionnez une date"
            value={selectedDate.toDateString()}
            onFocus={() => setShowDatePicker(true)}
          />

          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              locale="fr-FR"
              onChange={handleDateChange}
            />
          )}
              </View>
            </View>
          </View>
        </Modal>
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
          name="Tâches"
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
              <CustomTabBarButton {...props} onPress={toggleModal}  />
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
      </Tab.Navigator>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  topModal: {
    // flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
   flexDirection:'row',
  //  height:,
    width:'100%',
    marginBottom:20,
  }
  ,
  modalView: {
    // paddingTop:2,
    width:'80%',
    height:400,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    backgroundColor: "#f3f6fd",
    borderRadius: 5,
    width: "100%",
    height: 50,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
});
