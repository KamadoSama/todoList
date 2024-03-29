import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export const TextInputLabel = ({ label, ...props }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    // width: '100%',
  },
  label: {
    fontSize: 13,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
    backgroundColor: "#f3f6fd",
  },
});


