import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export const PickerLabel = ({ label, items, selectedValue, onValueChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Picker
        style={styles.picker}
        selectedValue={selectedValue}
        onValueChange={onValueChange}
      >
        {items.map((item, index) => (
          <Picker.Item key={index} label={item.label} value={item.value} color={item.color} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
 
    width: '48%',
  },
  label: {
    fontSize: 13,
    marginBottom: 5,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#d6deeb",
    borderRadius: 8,
    fontSize: 5,
    backgroundColor: "#f3f6fd",
  },
});

