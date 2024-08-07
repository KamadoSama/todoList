import { useState, useEffect, useMemo } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import Accordion from "../components/Accordion";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Badge, Button } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks, setSearchInput } from "../redux/redux";
import { format } from "date-fns";
import * as Notifications from "expo-notifications";
import colors from "../constant/colors";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function HomeScreen() {
  const [taskItems, setTaskItems] = useState([]);
  const [search, setSearch] = useState("");
  const [finished, setFinished] = useState(false);
  // const [filteredTasks, setFilteredTasks] = useState([]);
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.tasks);
  // const filter = useSelector((state) => state.todos.tasks);
  const searchInput = useSelector((state) => state.todos.searchInput);


  useEffect(() => {
    checkNotificationsPermission();
  }, []);

  useEffect(() => {
    scheduleNotificationsForLateTasks();
  }, [todos]);

  const checkNotificationsPermission = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
  };

  const scheduleNotificationsForLateTasks = async () => {
    const now = new Date(); // Date et heure actuelles

    const lateTasks = filteredTasks.filter(task => {
        const taskDueDateTime = new Date(task.date); // Convertir la date de la tâche en objet Date
        const taskEndTime = new Date(task.heureFin); // Convertir l'heure de fin de la tâche en objet Date
        
        // Comparer la date et l'heure actuelles avec la date et l'heure de fin de la tâche
        return (now > taskDueDateTime || (now.getDate() === taskDueDateTime.getDate() && now > taskEndTime)) && !task.done; // Tâche non effectuée et en retard
    });

  
    for (const task of lateTasks) {
      
      const trigger = new Date(Date.now() + 60 * 60 * 1000);
      trigger.setMinutes(0);
      trigger.setSeconds(0);
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Tâche en retard",
          body: `La tâche "${task.titre}" est en retard.`,
        },
        trigger
      });
    }
  };
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleSearchChange = (text) => {
    dispatch(setSearchInput(text));
  };

  const filteredTasks = useMemo(() => {
    let filtered = todos;
    filtered = filtered.filter((todo) =>
      todo.titre.toLowerCase().includes(searchInput.toLowerCase())
    );
    if (finished) {
      filtered = filtered.filter((todo) => todo.done === 1);
    } else {
      filtered = filtered.filter((todo) => todo.done === 0);
    }
    return filtered;
  }, [todos, searchInput, finished]);

  const groupTasksByDate = (tasks) => {
    const groupedTasks = {};
    tasks.forEach((task) => {
      const taskDate = format(task.date, "dd-MM-yyyy");
      if (!groupedTasks[taskDate]) {
        groupedTasks[taskDate] = [];
      }
      groupedTasks[taskDate].push(task);
    });
    return groupedTasks;
  };

  const renderTasksByDate = (groupedTasks) => {
    const today = format(new Date(), "dd-MM-yyyy");
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowFormatted = format(tomorrow, "dd-MM-yyyy");

    const renderedTasks = [];
    Object.keys(groupedTasks)
      .filter((date) => date !== today && date !== tomorrowFormatted)
      .forEach((date) => {
        renderedTasks.push(
          <View key={date}>
            <Text style={styles.sectionTitle}>{date}</Text>
            {renderTasks(groupedTasks[date])}
          </View>
        );
      });
    if (groupedTasks[today]) {
      renderedTasks.push(
        <View key={today}>
          <Text style={styles.sectionTitle}>Aujourd'hui</Text>
          {renderTasks(groupedTasks[today])}
        </View>
      );
    }

    if (groupedTasks[tomorrowFormatted]) {
      renderedTasks.push(
        <View key={tomorrowFormatted}>
          <Text style={styles.sectionTitle}>Demain</Text>
          {renderTasks(groupedTasks[tomorrowFormatted])}
        </View>
      );
    }

    return renderedTasks;
  };
  const renderTasks = (tasks) => {
    return tasks.map((item) => (
      <Accordion
        key={item.id}
        title={item.titre}
        // categorie={item.categorie}
        description={item.description}
        footer={"This is a footer"}
        heureDebut={item.heureDebut}
        heureFin={item.heureFin}
        priorite={item.priorite}
        date={item.date}
        id={item.id}
        done={item.done}
      />
    ));
  };
  const handleFinish = (status) => {
    setFinished(status);
  
  };
  const renderedTasksByDate = useMemo(
    () => renderTasksByDate(groupTasksByDate(filteredTasks)),
    [filteredTasks]
  );
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.inputSearch}
              placeholder={"Rechercher..."}
              value={searchInput}
              onChangeText={handleSearchChange}
            />
            <Ionicons
              name="ios-search"
              size={24}
              color="#277dfa"
              style={{ position: "absolute", right: 5 }}
            />
          </View>
          <Button title="Search" style={styles.searchButton}>
            <Ionicons name="add" size={24} color="#fff" />
          </Button>
        </View>

        <View>
          <Badge style={{ backgroundColor: "#277dfa", marginTop: 10 }} size={12} />
        </View>

        <View
          style={{
            flexDirection: "row",
            width: "50%",
            justifyContent: "space-evenly",
            marginTop: 25,
          }}
        >
          {/* <Button mode="text" title="active" textColor="#277fda" style={styles.statusButton}  >
            En cours
          </Button>
          <Button mode="text" title="Terminer"  textColor="#277fda" style={styles.statusButton} >
            Terminé
          </Button> */}

          <TouchableOpacity onPress={() => handleFinish(false)}>
            <View style={styles.statusButton}>
              <Text
                style={[styles.addText, finished === false && styles.active]}
              >
                En cours
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFinish(true)}>
            <View style={styles.statusButton}>
              <Text
                style={[styles.addText, finished === true && styles.active]}
              >
                Terminé
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {/* Today's Tasks */}
      <View style={styles.taskWrapper}>
        <ScrollView style={styles.items}>{renderedTasksByDate}</ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  statusButton: {
    color: "#277dfa",
    // borderRadius: 5,
    paddingTop: 10,
    paddingHorizontal: 10,
    fontSize: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    paddingLeft: 10,
    position: "relative",
  },
  topContainer: {
    backgroundColor: "#fff",
    height: 150,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  inputSearch: {
    backgroundColor: "#f3f6fd",
    borderRadius: 5,
    width: 250,
    height: 50,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  searchButton: {
    backgroundColor: "#277dfa",
    borderRadius: 5,
    marginLeft: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  taskWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    // marginBottom: 20,
    // backgroundColor: "#fff",
    height: "80%",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
  },
  items: {
    marginTop: 30,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 35,
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
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {
    color: "#b2bccd",
    fontSize: 15,
    fontWeight: "700",
  },
  active: {
    color: "#277dfa",
    borderBottomColor: "#277dfa",
    borderBottomWidth: 2,
  },
});
