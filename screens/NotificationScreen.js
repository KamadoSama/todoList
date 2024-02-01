import React, { useMemo } from "react";
import { Button, View, StyleSheet, Text, ScrollView } from "react-native";
import { Image } from "expo-image";
import { ProgressCircle } from "react-native-svg-charts";
import { useSelector } from "react-redux";
import { format, subDays } from "date-fns";

export default function NotificationScreen({ navigation }) {
  const todos = useSelector((state) => state.todos.tasks);

  const getTasksDoneThisWeek = () => {
    const today = new Date();
    const startOfWeek = subDays(today, today.getDay());

    return todos.filter((todo) => todo.done === 1);
  };

  const tasksDoneThisWeek = useMemo(() => getTasksDoneThisWeek(), [todos]);
  const percentageDone = (tasksDoneThisWeek.length / todos.length) * 100;

  const data = tasksDoneThisWeek.reduce((acc, task) => {
    const taskDate = format(new Date(task.date), "EEEE");
    acc[taskDate] = (acc[taskDate] || 0) + 1;
    return acc;
  }, {});

  console.log("data", data);
  const chartData = Object.keys(data).map((label) => ({
    name: label,
    value: data[label],
    color: "#277dfa", // You can implement getRandomColor function
  }));
  console.log("chart", chartData);
  const widthAndHeight = 200
  const series = [4,1]
  const sliceColor = ['#277dfa', '#ccc']

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
        <ScrollView style={{ width: "90%", marginTop: 70 }}>
          <View style={{ backgroundColor: "#fff", height: 200, marginTop: 50 }}>
          < ProgressCircle style={{ height: 200 }} progress={0.7} progressColor={'rgb(134, 65, 244)'} />
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
});
