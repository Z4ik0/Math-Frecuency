import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, StyleSheet } from "react-native";
import { calcularFrecuencia } from "../Utils/CalcularFrecuencias"; 
import { useDatosContext, FilaFrecuencia } from "../Contexts/DatosContext"; 

function calcularMedia(datos: number[]) {
  const suma = datos.reduce((acc, val) => acc + val, 0);
  return suma / datos.length;
}

function calcularMediana(datos: number[]) {
  const ordenados = [...datos].sort((a, b) => a - b);
  const mitad = Math.floor(ordenados.length / 2);

  if (ordenados.length % 2 === 0) {
    return (ordenados[mitad - 1] + ordenados[mitad]) / 2;
  } else {
    return ordenados[mitad];
  }
}

function calcularModa(datos: number[]) {
  const conteo: Record<number, number> = {};
  datos.forEach((num) => {
    conteo[num] = (conteo[num] || 0) + 1;
  });

  const max = Math.max(...Object.values(conteo));
  const modas = Object.keys(conteo)
    .filter((num) => conteo[Number(num)] === max)
    .map(Number);
  if (modas.length === Object.keys(conteo).length) return [];
  return modas;
}

export default function HomeScreen() {
  const { setDatos } = useDatosContext();
  const [entrada, setEntrada] = useState("");
  const [tabla, setTabla] = useState<FilaFrecuencia[] | null>(null);
  const [total, setTotal] = useState({ n: 0, fr: 0 });
  const [estadisticas, setEstadisticas] = useState({
    media: 0,
    mediana: 0,
    moda: [] as number[],
  });

  const generarTabla = () => {
    try {
      if (!entrada.trim()) {
        Alert.alert("Error", "Por favor, ingresa al menos un dato.");
        return;
      }

      const resultado = calcularFrecuencia(entrada);

      const totalF = resultado.reduce((acc, cur) => acc + cur.f, 0);
      const totalFr = resultado.reduce((acc, cur) => acc + cur.fr, 0);

      const datosExpand = resultado.flatMap((fila) =>
        Array(fila.f).fill(fila.valor)
      );
      
      const media = calcularMedia(datosExpand as number[]);
      const mediana = calcularMediana(datosExpand as number[]);
      const moda = calcularModa(datosExpand as number[]);

      setTabla(resultado);
      setTotal({ n: totalF, fr: totalFr });
      setEstadisticas({ media, mediana, moda });

      setDatos(resultado); 

    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  const handleEntradaChange = (text: string) => {
    let filteredText = text.replace(/[^0-9\s,\.\-]/g, "");
    filteredText = filteredText.replace(/\s{3,}/g, ' '); 
    filteredText = filteredText.trimStart();
    
    setEntrada(filteredText);
  };

  const limpiar = () => {
    setEntrada("");
    setTabla(null);
    setTotal({ n: 0, fr: 0 });
    setEstadisticas({ media: 0, mediana: 0, moda: [] });
    setDatos([]); 
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.mainContent}>
        
        <Text style={styles.subtitle}>
          Ingresa tus datos separados por comas o espacios:
        </Text>

        <TextInput
          value={entrada}
          onChangeText={handleEntradaChange}
          placeholder="Ejemplo: 15,16,15,17,16,15,18,16,16,17"
          keyboardType="numbers-and-punctuation"
          style={styles.input}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={generarTabla} style={[styles.button, styles.generateButton]}>
            <Text style={styles.buttonText}>Generar tabla</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={limpiar} style={[styles.button, styles.clearButton]}>
            <Text style={styles.buttonText}>Limpiar</Text>
          </TouchableOpacity>
        </View>

        {tabla && (
          <View style={styles.resultsContainer}>
            <View style={styles.statsContainer}>
              <Text style={styles.statsTitle}>Medidas Estadísticas </Text>
              <Text style={styles.statItem}>Media: {estadisticas.media.toFixed(2)}</Text>
              <Text style={styles.statItem}>Mediana: {estadisticas.mediana}</Text>
              <Text style={styles.statItem}>
                Moda:{" "}
                {estadisticas.moda.length > 0
                  ? estadisticas.moda.join(", ")
                  : "No hay moda"}
              </Text>
            </View>

            <View style={styles.tableContainer}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={[styles.cell, styles.headerText, styles.topLeftCell, styles.firstColumn]}>Xi</Text>
                <Text style={[styles.cell, styles.headerText]}>ni</Text>
                <Text style={[styles.cell, styles.headerText]}>Ni</Text>
                <Text style={[styles.cell, styles.headerText]}>fi</Text>
                <Text style={[styles.cell, styles.headerText, styles.topRightCell, styles.lastColumn]}>Fi</Text>
              </View>

              {tabla.map((item, index) => (
                <View 
                    key={String(item.valor)} 
                    style={[
                        styles.tableRow, 
                        styles.dataRow, 
                        index === tabla.length - 1 && { borderBottomWidth: 0 } 
                    ]}
                >
                    <Text style={[styles.cell, styles.firstColumn]}>{item.valor}</Text>
                    <Text style={styles.cell}>{item.f}</Text>
                    <Text style={styles.cell}>{item.fr.toFixed(2)}</Text> 
                    <Text style={styles.cell}>{item.fa}</Text>
                    <Text style={[styles.cell, styles.lastColumn]}>{(item.fra * 100).toFixed(0)}%</Text>
                </View>
              ))}

              <View style={[styles.tableRow, styles.totalRow, { borderBottomWidth: 0, borderTopWidth: 1, borderTopColor: '#000000' }]}>
                <Text style={[styles.cell, styles.totalText, styles.bottomLeftCell, styles.firstColumn]}>TOTAL</Text>
                <Text style={[styles.cell, styles.totalText]}>N={total.n}</Text>
                <Text style={[styles.cell, styles.totalText]}>
                  {total.fr.toFixed(2)}
                </Text>
                <Text style={[styles.cell, styles.totalText]}></Text>
                <Text style={[styles.cell, styles.totalText, styles.bottomRightCell, styles.lastColumn]}>{(tabla[tabla.length - 1].fra * 100).toFixed(0)}%</Text> 
              </View>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const BORDER_RADIUS = 10;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", 
    padding: 20,
  },
  mainContent: {
    backgroundColor: "#FFFFFF",
    padding: 0,
    alignSelf: 'center', 
    width: '100%',
    maxWidth: 400, 
  },
  subtitle: {
    fontSize: 16,
    color: "#333333",
    marginBottom: 10,
    textAlign: 'left',
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#000000", 
    borderRadius: BORDER_RADIUS, 
    padding: 15,
    fontSize: 16,
    textAlignVertical: "center",
    color: "#333333",
    marginBottom: 15,
    height: 48,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 15, 
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: BORDER_RADIUS, 
    flex: 1,
  },
  generateButton: {
    backgroundColor: "#000000",
  },
  clearButton: {
    backgroundColor: "#666666",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 16,
  },
  resultsContainer: {
    marginTop: 10, 
  },
  statsContainer: {
    marginTop: 10, 
    marginBottom: 20, 
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: BORDER_RADIUS, 
    borderWidth: 1,
    borderColor: "#000000",
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 8,
    textAlign: 'center', 
  },
  statItem: {
    fontSize: 16,
    color: "#333333",
    marginBottom: 2,
  },
  tableContainer: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1, 
    borderColor: "#000000",
    borderRadius: BORDER_RADIUS, 
    overflow: 'hidden',
  },
  tableHeader: {
    backgroundColor: "#EAEAEA", 
    borderBottomWidth: 1, 
    borderBottomColor: "#000000",
    paddingVertical: 10,
    flexDirection: "row",
  },
  headerText: {
    fontWeight: "600",
    color: "#333333",
    fontSize: 14,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1, 
    borderBottomColor: "#000000",
    paddingVertical: 8,
  },
  dataRow: {
    backgroundColor: "#FFFFFF",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    color: "#333333",
    paddingHorizontal: 5,
    fontSize: 14,
    borderRightWidth: 1, 
    borderRightColor: "#000000",
  },
  firstColumn: {
    borderLeftWidth: 0, 
  },
  lastColumn: {
    borderRightWidth: 0, 
  },
  totalRow: {
    backgroundColor: "#FFFFFF", 
    borderTopWidth: 1,
    borderTopColor: "#000000",
    flexDirection: "row",
  },
  totalText: {
    fontWeight: "bold",
    color: "#000000",
  },
  topLeftCell: {
    borderTopLeftRadius: BORDER_RADIUS,
  },
  topRightCell: {
    borderTopRightRadius: BORDER_RADIUS,
  },
  bottomLeftCell: {
    borderBottomLeftRadius: BORDER_RADIUS,
  },
  bottomRightCell: {
    borderBottomRightRadius: BORDER_RADIUS,
  },
});