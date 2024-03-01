import React, { useEffect, useState }  from "react";
import {  View, StyleSheet, Text, ScrollView, Image,TextInput, TouchableOpacity } from "react-native";
// import { Image } from "expo-image";
import { AnimatedCircularProgress } from "react-native-circular-progress";

import {useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/redux";
import { subDays } from "date-fns";
import { Modal, Portal, PaperProvider } from 'react-native-paper';


export default function StatScreen({ navigation }) {
  const dispatch = useDispatch();
  //modal pour ajouter son username
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState("");

  const todos = useSelector((state) => state.todos.tasks);
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    if (!user) {
      setModalVisible(true);
    }
  } , [user]);

  

  const handleUsername = () => {
    dispatch(setUser(username));
    setModalVisible(false);
  }
  // prendre les taches d'auiourd'hui

  const getTasksForToday = () => {  
    const currentDate = new Date();
    const tasksToday = todos.filter((task) => {
      const taskDate = new Date(task.date);
      const isSameDay =
        currentDate.getFullYear() === taskDate.getFullYear() &&
        currentDate.getMonth() === taskDate.getMonth() &&
        currentDate.getDate() === taskDate.getDate() && 
        task.done === 0;

      return isSameDay;
    });

    return tasksToday;
  }

  const totalTasksToday = getTasksForToday().length;
  // compter tasks par priorité

  const getTasksByPriority = (priority) => {
    const tasksToday = getTasksForToday();
    return tasksToday.filter((task) => task.priorite === priority).length;
  }

  // const getTasksDoneThisWeek = () => {
  //   const today = new Date();
  //   const startOfWeek = subDays(today, today.getDay());
  //   return todos.filter((todo) => todo.done === 1);
  // };

  const getTasksForThisWeek = () => {
    const currentDate = new Date();

    const tasksThisWeek = todos.filter((task) => {
      const taskDate = new Date(task.date);
      const isSameWeek =
        currentDate.getFullYear() === taskDate.getFullYear() &&
        currentDate.getMonth() === taskDate.getMonth() &&
        currentDate.getDate() - taskDate.getDate() <= 7;

      return isSameWeek;
    });

    return tasksThisWeek;
  };

  const getTasksForThisMonth = () => {
    const currentDate = new Date();

    const tasksThisMonth = todos.filter((task) => {
      const taskDate = new Date(task.date);
      const isSameMonth =
        currentDate.getFullYear() === taskDate.getFullYear() &&
        currentDate.getMonth() === taskDate.getMonth();

      return isSameMonth;
    }
    );

    return tasksThisMonth;

  };
 
  const tasksThisMonth = getTasksForThisMonth();
  const totalTasksMonth = tasksThisMonth.length;
  const completedTasksMonth = tasksThisMonth.filter((task) => task.done === 1).length;

  // Calculer le pourcentage
  const percentageCompletedMonth = totalTasksMonth === 0 ? 0 : 1 - (totalTasksMonth - completedTasksMonth) / totalTasksMonth;

  const tasksThisWeek = getTasksForThisWeek();
  const totalTasks = tasksThisWeek.length;
  const completedTasks = tasksThisWeek.filter((task) => task.done === 1).length;

  // Calculer le pourcentage
  const percentageCompletedWeek =
    totalTasks === 0 ? 0 : 1 - (totalTasks - completedTasks) / totalTasks;

  return (
    <PaperProvider>

      <Portal>
        <Modal visible={modalVisible} style={{padding: 20}} onDismiss={() => setModalVisible(false)}>
          <View style={styles.modalStyle}>
            <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 20 }}>
              Ajouter votre nom d'utilisateur
            </Text>
            <TextInput
              style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 20}}
              onChangeText={(text) => setUsername(text)}
              value={username}
            />
            <TouchableOpacity 
            style={{
              backgroundColor:'#277dfa', 
              padding:10,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center'
              
              }} onPress={handleUsername}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 15,
                  color: "#fff",
                }}
                >Ajouter</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </Portal>

      <View style={styles.container}>
      

      <View style={styles.viewTop}>
        <Image
          style={styles.image}
          source={require("../assets/idea.png")}
          contentFit="cover"
        />
      </View>

      <View style={styles.viewBottom}>
        <View style={styles.viewMiddle}>
          <View style={{ width: "30%", height: "100%" }}>
            <Image
              style={{ ...styles.image, height: "100%" }}
              source={require("../assets/task.png")}
              // contentFit="cover"
            />
          </View>
          <View style={{ width: "60%", height: "100%" }}>
            <Text style={{ fontWeight: "900", fontSize: 16, color: "#132033" }}>
              Salut, {user ? user : "Utilisateur"}
            </Text>
            <Text style={{ fontWeight: "100", fontSize: 14, color: "#b2bccd" }}>
              Tu as {totalTasksToday} {totalTasksToday >1 ? "tâches" : "tâche"} à faire aujourd'hui, {getTasksByPriority('haute')} de haute priorité, {getTasksByPriority('moyenne')} de
              moyenne priorité et {getTasksByPriority('basse')} de basse priorité{" "}
            </Text>
          </View>
        </View>

        <ScrollView style={{ width: "90%", marginTop: 100 }}>
          <View
            style={{
              width: "100%",
              display: "flex",
              marginTop: 50,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ ...styles.chartContent, position: "relative" }}>
              <Text
                style={{
                  fontWeight: 500,
                  fontSize: 15,
                  color: "#132033",
                  textAlign: "center",
                }}
              >
                Stats hebdomadaires
              </Text>

              <View
                style={{
                  width: "100%",
                  height: 150,
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                }}>
                <AnimatedCircularProgress
                  size={150}
                  width={4}
                  fill={percentageCompletedWeek * 100}
                  tintColor="#277dfa"
                  onAnimationComplete={() => {}}
                  backgroundColor="#3d5875"
                  style={{ transform: [{ rotate: "-90deg" }], marginTop: 15 }}>
                  {() => (
                    <View style={{transform:[{ rotate: "90deg" }],display: "flex",
                    alignItems: "center",
                    justifyContent: "center"}}>
                      <Text
                        style={{ ...styles.numberRateStyle, color: "#132033" }}>
                        {totalTasks - completedTasks}
                      </Text>
                      <Text
                        style={{ ...styles.textRateStyle, color: "#132033" }}>
                        Restantes
                      </Text>
                    </View>
                  )}
                </AnimatedCircularProgress>
              </View>

            </View>
            <View style={styles.rateContent}>
              <View
                style={{
                  ...styles.rateChild,
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 10,
                }}
              >
                <Text style={styles.numberRateStyle}>
                  {totalTasks - completedTasks}
                </Text>
                <Text style={styles.textRateStyle}>Restantes</Text>
              </View>
              {/* <View style={styles.rateChild}>
                <Text style={styles.numberRateStyle}>2</Text>
                <Text style={styles.textRateStyle}>En retard</Text>
              </View> */}
              <View
                style={{
                  ...styles.rateChild,
                  borderBottomRightRadius: 20,
                  borderBottomLeftRadius: 10,
                }}
                >
                <Text style={styles.numberRateStyle}>{completedTasks}</Text>
                <Text style={styles.textRateStyle}>Terminées</Text>
              </View>
            </View>
          </View>

          <View
            style={{
              width: "100%",
              display: "flex",
              marginTop: 40,
              marginBottom: 40,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={styles.chartContent}>
              <Text
                style={{
                  fontWeight: 500,
                  fontSize: 15,
                  color: "#132033",
                  textAlign: "center",
                }}
              >
                Stats mensuelles
              </Text>
              <View
                style={{
                  width: "100%",
                  height: 150,
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                }}>
                <AnimatedCircularProgress
                  size={150}
                  width={4}
                  fill={completedTasksMonth * 100}
                  tintColor="#277dfa"
                  onAnimationComplete={() => {}}
                  backgroundColor="#3d5875"
                  style={{ transform: [{ rotate: "-90deg" }], marginTop: 15 }}>
                  {() => (
                    <View style={{transform:[{ rotate: "90deg" }],display: "flex",
                    alignItems: "center",
                    justifyContent: "center"}}>
                      <Text
                        style={{ ...styles.numberRateStyle, color: "#132033" }}>
                        {totalTasksMonth - completedTasksMonth}
                      </Text>
                      <Text
                        style={{ ...styles.textRateStyle, color: "#132033" }}>
                        Restantes
                      </Text>
                    </View>
                  )}
                </AnimatedCircularProgress>
              </View>
            </View>
            <View style={styles.rateContent}>
              <View
                style={{
                  ...styles.rateChild,
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 10,
                }}
              >
                <Text style={styles.numberRateStyle}>{totalTasksMonth - completedTasksMonth}</Text>
                <Text style={styles.textRateStyle}>Restantes</Text>
              </View>
              {/* <View style={styles.rateChild}>
                <Text style={styles.numberRateStyle}>2</Text>
                <Text style={styles.textRateStyle}>En retard</Text>
              </View> */}
              <View
                style={{
                  ...styles.rateChild,
                  borderBottomRightRadius: 20,
                  borderBottomLeftRadius: 10,
                }}
                >
                <Text style={styles.numberRateStyle}>
                  {completedTasksMonth}
                </Text>
                <Text style={styles.textRateStyle}>Terminées</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
    </PaperProvider>
    
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
  chartContent: {
    backgroundColor: "#fff",
    width: "68%",
    height: 200,

    display: "flex",
    borderRadius: 10,
  },
  rateContent: {
    width: "29%",
    height: 200,
    display: "flex",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 20,
    justifyContent: "space-between",
    flexDirection: "column",
  },
  rateChild: {
    backgroundColor: "#277dfa",
    height: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  numberRateStyle: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 20,
  },
  textRateStyle: {
    fontWeight: "300",
    color: "#fff",
    fontSize: 13,
  },
  modalStyle:{
    backgroundColor: "#fff", 
    padding: 20,
    borderRadius: 10
  }
});
