import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import {HomeScreen,FindScreen,NotificationScreen,CalendarScreen,AddScreen,} from "../screens";
import {View,TouchableOpacity,StyleSheet,Modal,Pressable,Text,} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { PickerLabel, TextInputLabel } from ".";
import { Button } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { insertTask } from "../db/crudTodo";
import { db,init } from "../db/db";
import { format } from 'date-fns';

const Tab = createBottomTabNavigator();
const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity style={{top: -30,justifyContent: "center",alignItems: "center",...styles.shadow,}}onPress={onPress}>
    <View style={{width: 60,height: 60,borderRadius: 20,backgroundColor: "#277dfa",}}>
      {children}
    </View>
  </TouchableOpacity>
);

const TabRoute = () => {
    useEffect(() => {
        init(db);   
      }, []);
    
      const navigation = useNavigation();
      const [selectedDate, setSelectedDate] = useState(new Date());
      const [showDatePicker, setShowDatePicker] = useState(false);
      const [taskDate, setTaskDate] = useState("");
      const [selectedPriority, setSelectedPriority] = useState();
      const [startDateTime, setStartDateTime] = useState("");
      const [endDateTime, setEndDateTime] = useState("");
      const [showStartPicker, setShowStartPicker] = useState(false);
      const [showEndPicker, setShowEndPicker] = useState(false);
    
      const {control,handleSubmit,setValue,register,formState: { errors },} = useForm();
    
      const showStartDateTimePicker = () => setShowStartPicker(true);
      const showEndDateTimePicker = () => setShowEndPicker(true);
    
      const handleStartDateTimeChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setStartDateTime(formatTime(currentDate));
        setValue("heureDebut", formatTime(currentDate));
        setShowStartPicker(!showStartPicker);
      };
    
      const handleEndDateTimeChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setEndDateTime(formatTime(currentDate));
        setValue("heureFin", formatTime(currentDate));
        setShowEndPicker(!showEndPicker);
      };
    
      const handleDateChange = ({ type }, selectedDate) => {
        const currentDate = selectedDate;
        setTaskDate(format(currentDate, "dd-MM-yyyy"));
        setValue("date", format(currentDate, "dd-MM-yyyy") );
        togglePicker();
      };
    
      const togglePicker = () => {
        setShowDatePicker(!showDatePicker);
      };
    
      const [modalVisible, setModalVisible] = useState(false);
      const reset = () => {
        setValue("titre", "");
        setValue("description", "");
        setValue("categorie", "");
        setValue("date", "");
        setValue("priorite", "");
        setValue("heureDebut", "");
        setValue("heureFin", "");
        setTaskDate("");
        setSelectedPriority("");
        setStartDateTime("");
        setEndDateTime("");
      }
    
      const toggleModal = () => {
        console.log("toggleModal");
        !modalVisible ?  reset() : null;
        setModalVisible(!modalVisible);
      };
    
      const pickerItems = [
        { label: "haute", value: "haute", color: "#ff009d" },
        { label: "basse", value: "basse", color: "#3af183" },
        { label: "moyenne", value: "moyenne", color: "#267fff" },
      ];
    
      const formatTime = (date) => {
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
      };
     
      
      const onSubmit = (data) => {
        insertTask(db,{...data});
        reset()
        toggleModal();
        navigation.navigate('Tâches'); 
        console.log(data)
      };
  return (
    <>
       <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="spinner"
            locale="fr-FR"
            onChange={handleDateChange}
          />
        )}

        {showStartPicker && (
          <DateTimePicker
            value={selectedDate}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={handleStartDateTimeChange}
          />
        )}

        {showEndPicker && (
          <DateTimePicker
            value={selectedDate}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={handleEndDateTimeChange}
          />
        )}
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.topModal}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Nouvelle tâche
              </Text>
              <Ionicons
                name="ios-close"
                size={24}
                color="#277dfa"
                onPress={toggleModal}
              />
            </View>
            <View style={{ width: "100%", marginTop: 10 }}>
              <Controller
                control={control}
                render={({ field }) => (
                  <TextInputLabel
                    label={"Titre de la tâche"}
                    value={field.value}
                    onChangeText={(text) => setValue("titre", text)}
                  />
                )}
                name="titre"
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field }) => (
                  <TextInputLabel
                    label={"Description"}
                    value={field.value}
                    onChangeText={(text) => setValue("description", text)}
                  />
                )}
                name="description"
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field }) => (
                  <TextInputLabel
                    label={"Catégorie"}
                    value={field.value}
                    onChangeText={(text) => setValue("categorie", text)}
                  />
                )}
                name="categorie"
                defaultValue=""
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Pressable onPress={togglePicker} style={{ width: "48%" }}>
                <Controller
                  control={control}
                  render={({ field }) => (
                    <TextInputLabel
                      style={{
                        ...styles.inputRow,
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                      label={"Date"}
                      value={taskDate}
                      onChangeText={(text) => setValue("date", text)}
                      editable={false}
                    />
                  )}
                  name="date"
                  defaultValue=""
                />
              </Pressable>

              <Controller
                control={control}
                render={({ field }) => (
                  <PickerLabel
                    label={"Priorité"}
                    selectedValue={field.value}
                    onValueChange={(itemValue) =>
                      setValue("priorite", itemValue)
                    }
                    items={pickerItems}
                  />
                )}
                name="priorite"
                defaultValue=""
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Pressable
                onPress={showStartDateTimePicker}
                style={{ width: "48%" }}
              >
                <TextInputLabel
                  style={{
                    ...styles.inputRow,
                    fontSize: 20,
                    fontWeight: "bold",
                    paddingHorizontal: 20,
                  }}
                  label={"Heure de début"}
                  value={startDateTime}
                  onChangeText={(text) => setTaskDate(text)}
                  editable={false}
                />
              </Pressable>
              <Pressable
                onPress={showEndDateTimePicker}
                style={{ width: "48%" }}
              >
                <TextInputLabel
                  style={{
                    ...styles.inputRow,
                    fontSize: 20,
                    fontWeight: "bold",
                    paddingHorizontal: 20,
                  }}
                  label={"Heure de fin"}
                  value={endDateTime}
                  onChangeText={(text) => setTaskDate(text)}
                  editable={false}
                />
              </Pressable>
            </View>
            <View style={{ width: "100%" }}>
              <Button
                mode="contained"
                style={{
                  borderRadius: 5,
                  backgroundColor: "#277dfa",
                  marginBottom: 4,
                }}
                onPress={handleSubmit(onSubmit)}
              >
                Ajouter
              </Button>
              <Button
                mode="contained"
                style={{ borderRadius: 5, backgroundColor: "#d6deeb" }}
                textColor="#000"
              >
                Annuler
              </Button>
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
              <CustomTabBarButton {...props} onPress={toggleModal} />
            ),
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
              <Ionicons name="ios-bar-chart" size={24} color={focused ? "#277dfa" : "#b2bccd"}/>
            ),
          }}
          name="Settings"
          component={NotificationScreen}
        />
      </Tab.Navigator>
    </>
  )
}

export default TabRoute
const styles = StyleSheet.create({
    shadow: {
      shadowColor: "#277dfa",
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
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    topModal: {
      // flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
      //  height:,
      width: "100%",
      marginBottom: 20,
    },
    modalView: {
      // paddingTop:2,
      width: "80%",
      height: 560,
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 20,
      alignItems: "center",
      shadowColor: "#000",
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
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
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
    inputRow: {
      backgroundColor: "#f3f6fd",
      borderRadius: 5,
      height: 50,
      paddingVertical: 5,
      marginBottom: 10,
      borderColor: "#d6deeb",
      borderWidth: 1,
    },
  });
  