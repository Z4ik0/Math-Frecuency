import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default function CreditScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créditos</Text>
      <Text style={styles.text}>Aplicación de Tablas de Frecuencia y Estadística</Text>
      <Text style={styles.version}>Versión 1.0.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 5,
    textAlign: 'center',
  },
  version: {
    fontSize: 14,
    color: '#666666',
    marginTop: 15,
  },
});