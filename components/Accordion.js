import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { List } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import { removeTask, doneTask } from "../redux/redux";
import { format } from 'date-fns';
const Accordion = ({
  title,
  categorie,
  description,
  priorite,
  heureFin,
  heureDebut,
  date,
  id,
  done,
}) => {
  const [expanded, setExpanded] = useState(false);
  const handlePress = () => setExpanded(!expanded);
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(removeTask(id));
  
  };

  const handleDone = (id) => {
    dispatch(doneTask(id));
  };
  const formatTime = (date) => {
    date = new Date(date);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  
  let color = "#277dfa";
  if(priorite === 'haute'){
    color = '#ff009d'

  }
  if(priorite === 'moyenne'){
    color = '#3af183'
  }
  if(priorite === 'basse'){
    color = '#267fff'
  }
  return (
    <View style={styles.accordContainer}>
      
      <List.Accordion
        title={title}
        description={categorie}
        left={(props) => <List.Icon {...props} color={color} icon="circle" />}
        right={(props) => (
          <List.Icon
            {...props}
            color="#277dfa"
            icon={expanded ? "chevron-up" : "chevron-down"}
          />
        )}
        expanded={expanded}
        onPress={handlePress}
        style={{
          borderBottomColor: "#d6deeb",
          borderBottomWidth: 1,
          backgroundColor: "#fff",
        }}>
        {/* <List.Item
          title={description}
          style={{ backgroundColor: "#fff" }}
          // description={description}
        /> */}
        <Text style={{ fontWeight: "bold", marginTop: 20, marginBottom: 20 }}>
          {description}
        </Text>
      </List.Accordion>
      <View style={styles.footer}>
        <View
          style={{
            width: "70%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <View
            style={{
              backgroundColor: "#d6deed",
              borderRadius: 10,
              padding: 2,
              alignItems: "center",
              flexDirection: "row",
            }}>
            <Text>
              {formatTime(heureDebut)} - {formatTime(heureFin)}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#d6deed",
              borderRadius: 10,
              padding: 2,
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Text>{format(date, "dd-MM-yyy")}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Pressable onPress={() => handleDone(id)}>
            {done === 0 ? (
              <Ionicons
                name="checkbox-sharp"
                size={24}
                color="#277dfa"
                paddingRight={10}
              />
            ) : null}
          </Pressable>

          <Pressable onPress={() => handleDelete(id)}>
            <Ionicons name="ios-trash-outline" size={24} color="#277dfa" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  accordContainer: {
    paddingBottom: 4,
    // height:150,
    backgroundColor: "#fff",
    marginBottom: 12,
    borderRadius: 20,
    overflow: "hidden",
    position:'relative'
  },
  accordHeader: {
    padding: 12,
    backgroundColor: "#fff",
    height: 50,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#000",
  },
  accordTitle: {
    fontSize: 20,
    color: "#b2bccd",
  },
  accordBody: {
    padding: 12,
  },
  textSmall: {
    fontSize: 16,
  },
  seperator: {
    height: 12,
  },
  footer: {
    padding: 12,
    backgroundColor: "#fff",
    height: 50,
    width1: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopColor: "#d6deeb",
    borderTopWidth: 1,
  },
});
export default Accordion;
