import React, { useEffect, useState } from "react";

import { Agenda, LocaleConfig } from "react-native-calendars";
import {Card, Avatar} from 'react-native-paper';
import {View, TouchableOpacity,Text, StyleSheet} from 'react-native';
import { format } from 'date-fns';
import { useSelector } from "react-redux";
const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
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
  const [items, setItems] = useState({});
  const date = new Date();
  const today = format(date, 'yyyy-MM-dd');
  useEffect(() => {
 
    todos.forEach((task) => {
      const taskDate = format(task.date, 'yyyy-MM-dd');
      console.log('taskDate',taskDate);
      if (!items[taskDate]) {
        items[taskDate] = [];
      }
      items[taskDate].push({
        name: task.titre,
        height: 61,
      })
      
    } );

    const newItems = {};
    
  
    Object.keys(items).forEach((key) => {
      newItems[key] = items[key];
      
    });
    setItems(newItems);
  }, [todos]);

  const loadItems = (day) => {
    const formattedDay = format(day.timestamp, 'yyyy-MM-dd');
    console.log(day);
    if (!items[formattedDay]) {
      items[formattedDay] = [];
    }
    
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
      <TouchableOpacity style={{marginRight: 10, marginTop: 17}}>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text>{item.name}</Text>
              <Avatar.Text label="J" />
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={today}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  emptyDateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  emptyDateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray',
  },
});

export default CalendarScreen;
