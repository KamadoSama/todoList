import React, { useState, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { List } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
const Accordion = ({ title, categorie ,description, footer, heureFin ,heureDebut, date  }) => {
  const [expanded, setExpanded] = useState(false);
  const handlePress = () => setExpanded(!expanded);

  return (
    <View style={styles.accordContainer}>
      <List.Accordion
        title={title}
        description={categorie}
        left={(props) => <List.Icon {...props} icon="circle-outline" />}
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
        }}
      >
        {/* <List.Item
          title={description}
          style={{ backgroundColor: "#fff" }}
          // description={description}
        /> */}
        <Text style={{ fontWeight:'bold',marginTop:20, marginBottom:20}} >{description}</Text>
      </List.Accordion>
      <View style={styles.footer}>
        <View style={{width:'70%',flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{backgroundColor:"#d6deed", borderRadius:10,  padding:2,alignItems:'center',flexDirection:'row' }}>
          <Text >
            {heureDebut} - {heureFin} 
          </Text>
          </View>
          <View style={{backgroundColor:"#d6deed", borderRadius:10,  padding:2,alignItems:'center',flexDirection:'row' }}>
          <Text >
            {date}
          </Text>
          </View>
          
        </View>
        <View style={{flexDirection:'row',}}>
            <Ionicons name="ios-pencil-outline" size={24} color="#277dfa" />
            <Ionicons name="ios-trash-outline" size={24} color="#277dfa" />
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
