import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ScrollView,
  StyleSheet,
} from "react-native";
import { calcularFrecuencia, FilaFrecuencia } from "../Utils/CalcularFrecuencias";

export default function HomeScreen() {
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

      // Calcular medidas estadísticas
      const datosExpand = resultado.flatMap((fila) =>
        Array(fila.f).fill(fila.valor)
      );
      const media = calcularMedia(datosExpand);
      const mediana = calcularMediana(datosExpand);
      const moda = calcularModa(datosExpand);

      setTabla(resultado);
      setTotal({ n: totalF, fr: totalFr });
      setEstadisticas({ media, mediana, moda });
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  const limpiar = () => {
    setEntrada("");
    setTabla(null);
    setTotal({ n: 0, fr: 0 });
    setEstadisticas({ media: 0, mediana: 0, moda: [] });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>
        Ingresa tus datos separados por comas o espacios:
      </Text>

      <TextInput
        value={entrada}
        onChangeText={setEntrada}
        placeholder="Ejemplo: 15,16,15,17,16,15,18,16,16,17"
        multiline
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
        <View style={styles.tableContainer}>
          <Text style={styles.tableTitle}>Tabla de Frecuencias</Text>

          {/* Encabezado */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.cell, styles.headerText]}>Valor</Text>
            <Text style={[styles.cell, styles.headerText]}>f</Text>
            <Text style={[styles.cell, styles.headerText]}>fr</Text>
            <Text style={[styles.cell, styles.headerText]}>Fa</Text>
            <Text style={[styles.cell, styles.headerText]}>Fra</Text>
          </View>

          {/* Filas */}
          <FlatList
            data={tabla}
            keyExtractor={(item) => String(item.valor)}
            renderItem={({ item }) => (
              <View style={styles.tableRow}>
                <Text style={styles.cell}>{item.valor}</Text>
                <Text style={styles.cell}>{item.f}</Text>
                <Text style={styles.cell}>{(item.fr * 100).toFixed(1)}%</Text>
                <Text style={styles.cell}>{item.fa}</Text>
                <Text style={styles.cell}>{(item.fra * 100).toFixed(1)}%</Text>
              </View>
            )}
          />

          {/* Totales */}
          <View style={[styles.tableRow, styles.totalRow]}>
            <Text style={[styles.cell, styles.totalText]}>Total</Text>
            <Text style={[styles.cell, styles.totalText]}>{total.n}</Text>
            <Text style={[styles.cell, styles.totalText]}>
              {(total.fr * 100).toFixed(1)}%
            </Text>
            <Text style={[styles.cell, styles.totalText]}></Text>
            <Text style={[styles.cell, styles.totalText]}></Text>
          </View>

          {/* Estadísticas */}
          <View style={styles.statsContainer}>
            <Text style={styles.statsTitle}>📈 Medidas Estadísticas</Text>
            <Text style={styles.statItem}>Media: {estadisticas.media.toFixed(2)}</Text>
            <Text style={styles.statItem}>Mediana: {estadisticas.mediana}</Text>
            <Text style={styles.statItem}>
              Moda:{" "}
              {estadisticas.moda.length > 0
                ? estadisticas.moda.join(", ")
                : "No hay moda"}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

// --- FUNCIONES AUXILIARES ---
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

// --- ESTILOS ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#3B3B98",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    textAlignVertical: "top",
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 14,
    gap: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  generateButton: {
    backgroundColor: "#3B3B98",
  },
  clearButton: {
    backgroundColor: "#999",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  tableContainer: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginTop: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#3B3B98",
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    paddingVertical: 6,
  },
  tableHeader: {
    borderBottomWidth: 2,
    borderBottomColor: "#AAA",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    color: "#333",
  },
  headerText: {
    fontWeight: "bold",
    color: "#222",
  },
  totalRow: {
    backgroundColor: "#EFEFFF",
    borderTopWidth: 2,
    borderTopColor: "#AAA",
  },
  totalText: {
    fontWeight: "bold",
    color: "#3B3B98",
  },
  statsContainer: {
    marginTop: 16,
    backgroundColor: "#F0F3FF",
    padding: 10,
    borderRadius: 8,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3B3B98",
    marginBottom: 6,
  },
  statItem: {
    fontSize: 14,
    color: "#333",
    marginBottom: 2,
  },
});
