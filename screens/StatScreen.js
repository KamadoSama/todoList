import React, { useMemo } from "react";
import { Button, View, StyleSheet, Text, ScrollView } from "react-native";
import { Image } from "expo-image";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useSelector } from "react-redux";
import { format, subDays } from "date-fns";

export default function StatScreen({ navigation }) {
  const todos = useSelector((state) => state.todos.tasks);
  console.log("todos_____________", todos);

  const getTasksDoneThisWeek = () => {
    const today = new Date();
    const startOfWeek = subDays(today, today.getDay());
    return todos.filter((todo) => todo.done === 1);
  };
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

  console.log("getTasksForThisWeek", getTasksDoneThisWeek());

  const tasksThisWeek = getTasksForThisWeek();
  const totalTasks = tasksThisWeek.length;
  const completedTasks = tasksThisWeek.filter((task) => task.done === 1).length;
  console.log("totalTasks", totalTasks);
  console.log("completedTasks", completedTasks);
  // Calculer le pourcentage
  const percentageCompleted =
    totalTasks === 0 ? 0 : 1 - (totalTasks - completedTasks) / totalTasks;
  console.log("percentageCompleted", percentageCompleted);
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
          <View style={{ width: "30%", height: "100%" }}>
            <Image
              style={{ ...styles.image, height: "100%" }}
              source={require("../assets/task.png")}
              contentFit="cover"
            />
          </View>
          <View style={{ width: "60%", height: "100%" }}>
            <Text style={{ fontWeight: "900", fontSize: 16, color: "#132033" }}>
              Salut, Kamado
            </Text>
            <Text style={{ fontWeight: "100", fontSize: 14, color: "#b2bccd" }}>
              Tu as 4 tâches à faire aujourd'hui, 1 de haute priorité, 2 de
              moyenne priorité et 1 de basse priorité{" "}
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
                  fill={percentageCompleted * 100}
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
              <View style={styles.rateChild}>
                <Text style={styles.numberRateStyle}>2</Text>
                <Text style={styles.textRateStyle}>En retard</Text>
              </View>
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
                  fill={percentageCompleted * 100}
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
                <Text style={styles.numberRateStyle}>4</Text>
                <Text style={styles.textRateStyle}>Restantes</Text>
              </View>
              <View style={styles.rateChild}>
                <Text style={styles.numberRateStyle}>2</Text>
                <Text style={styles.textRateStyle}>En retard</Text>
              </View>
              <View
                style={{
                  ...styles.rateChild,
                  borderBottomRightRadius: 20,
                  borderBottomLeftRadius: 10,
                }}
              >
                <Text style={styles.numberRateStyle}>12</Text>
                <Text style={styles.textRateStyle}>Terminées</Text>
              </View>
            </View>
          </View>
        </ScrollView>
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
    height: "32%",
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
});
