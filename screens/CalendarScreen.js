import React, { useEffect, useState } from "react";

import { Agenda, LocaleConfig } from "react-native-calendars";
import { Card, Avatar } from "react-native-paper";
import { View, Modal, TouchableOpacity, Text, StyleSheet } from "react-native";
import { format } from "date-fns";
import { useSelector } from "react-redux";
const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
};
LocaleConfig.locales["fr"] = {
  monthNames: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  monthNamesShort: [
    "Janv.",
    "Févr.",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juil.",
    "Août",
    "Sept.",
    "Oct.",
    "Nov.",
    "Déc.",
  ],
  dayNames: [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ],
  dayNamesShort: ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."],
  today: "Aujourd'hui",
};

LocaleConfig.defaultLocale = "fr";

const CalendarScreen = () => {
  const todos = useSelector((state) => state.todos.tasks);
  const [todosItems, setTodoItems] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const date = new Date();
  const today = format(date, "yyyy-MM-dd");

  useEffect(() => {
    setTodoItems({});
    let items = {};
    todos.forEach((task) => {
      const taskDate = format(task.date, "yyyy-MM-dd");
      if (!items[taskDate]) {
        items[taskDate] = [];
      }
      items[taskDate].push({
        name: task.titre,
        description: task.description,
        height: 61,
      });
    });

    setTodoItems(items);
  }, [todos]);

  const loadItems = (day) => {
    const formattedDay = format(day.timestamp, "yyyy-MM-dd");
    console.log(day);
    if (!todosItems[formattedDay]) {
      todosItems[formattedDay] = [];
    }
  };
  const handleOpenModal = (task) => {
    setSelectedTask(task);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
    setModalVisible(false);
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDateContainer}>
        <Text style={styles.emptyDateText}>Pas de tâche</Text>
      </View>
    );
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity
        onPress={() => handleOpenModal(item)}
        style={{ marginRight: 10, marginTop: 17 }}
      >
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
              <Avatar.Text label="J" />
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Agenda
        items={todosItems}
        loadItemsForMonth={loadItems}
        selected={today}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View
          style={styles.centeredView}
        >
          {selectedTask && (
            <View>
              <Text>{selectedTask.name}</Text>
              <Text>{selectedTask.description}</Text>

              <TouchableOpacity onPress={handleCloseModal}>
                <Text>Fermer</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyDateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
  emptyDateText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "gray",
  },
  description: {
    fontSize: 14,
    color: "gray",
    overflow: "hidden",
    width: 200,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
});

export default CalendarScreen;
