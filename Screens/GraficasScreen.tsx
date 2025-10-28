import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth: number = Dimensions.get('window').width;

const GraficasScreen: React.FC = () => {
  const [frecuencias, setFrecuencias] = useState<number[]>([6, 7, 4, 2, 1]);

  const actualizarFrecuencia = (index: number, texto: string): void => {
    const copia = [...frecuencias];
    const numero = parseInt(texto);
    copia[index] = isNaN(numero) ? 0 : numero;
    setFrecuencias(copia);
  };

  const etiquetas: string[] = frecuencias.map((_, i) => (i + 1).toString());

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tabla de Frecuencia</Text>

      <View style={styles.table}>
        {frecuencias.map((valor: number, index: number) => (
          <View key={index} style={styles.row}>
            <Text style={styles.label}>Xi: {index + 1}</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={valor.toString()}
              onChangeText={(texto: string) => actualizarFrecuencia(index, texto)}
            />
          </View>
        ))}
      </View>

      <Text style={styles.title}>Gráfica de Frecuencia Absoluta</Text>

      <BarChart
        data={{
          labels: etiquetas,
          datasets: [{ data: frecuencias }],
        }}
        width={screenWidth - 32}
        height={220}
        fromZero={true}
        withHorizontalLabels={true}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: (opacity: number) => `rgba(0, 122, 255, ${opacity})`,
          labelColor: () => '#333',
          style: {
            borderRadius: 16,
          },
        }}
        style={{ marginVertical: 16, borderRadius: 16 }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
  table: { marginVertical: 10 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  label: { width: 100, fontSize: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 6,
    width: 60,
    textAlign: 'center',
    borderRadius: 4,
  },
});

export default GraficasScreen;
