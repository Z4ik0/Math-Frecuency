import React from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { useDatosContext } from "../Contexts/DatosContext"; 

const screenWidth: number = Dimensions.get('window').width;

const GraficasScreen: React.FC = () => {
    const { datos } = useDatosContext();
    const { valores, frecuencias, tabla } = datos;

    if (frecuencias.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                    Genera tu tabla de frecuencia para ver la gráfica.
                </Text>
            </View>
        );
    }

    const etiquetas: string[] = valores.map((v) => v.toString());
    
    const barColors = etiquetas.map((_, index) => {
        return index % 2 === 0 
          ? 'rgba(40, 40, 40, 1)'     
          : 'rgba(90, 90, 90, 1)';   
    });

    const pieColors = [
        '#6A5ACD', '#4169E1', '#8A2BE2', '#483D8B', '#20B2AA', '#6495ED', '#9370DB', 
    ];
    
   
    const pieData = tabla.map((item, index) => ({
        name: `${item.valor} (${(item.fr * 100).toFixed(1)}% fi)`, 
        population: item.f, 
        color: pieColors[index % pieColors.length],
        legendFontColor: '#000000', 
        legendFontSize: 12, 
    }));

    const chartConfig = {
        backgroundColor: '#FFFFFF', 
        backgroundGradientFrom: '#FFFFFF',
        backgroundGradientTo: '#FFFFFF',
        decimalPlaces: 0,
        color: () => '#000000', 
        labelColor: () => '#000000', 
        axisLineColor: '#CCCCCC', 
        gridColor: '#EEEEEE', 
    };

    const barWidth = 60; 
    const minChartWidth = screenWidth - 30; 
    const dynamicBarChartWidth = Math.max(minChartWidth, etiquetas.length * barWidth);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            
            <Text style={styles.title}>Gráfico de Frecuencia Absoluta (ni)</Text>

            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={true} 
                style={styles.barChartScrollView}
                contentContainerStyle={{ paddingRight: 30 }} 
            >
                <BarChart
                    data={{
                        labels: etiquetas,
                        datasets: [{ 
                            data: frecuencias, 
                            colors: barColors.map(color => (opacity = 1) => color), 
                        }],
                    }}
                    width={dynamicBarChartWidth} 
                    height={320}
                    fromZero={true}
                    withHorizontalLabels={true}
                    yAxisLabel="" 
                    yAxisSuffix="" 
                    chartConfig={chartConfig}
                    style={{ 
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />
            </ScrollView>

            <Text style={styles.title}>Gráfico de Frecuencia Relativa Porcentual (%fi)</Text>

            <PieChart
                data={pieData}
                width={screenWidth - 32}
                height={280}
                chartConfig={chartConfig}
                accessor="population" 
                backgroundColor="transparent"
                paddingLeft="15"
            />
            
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { 
        backgroundColor: '#FFFFFF', 
        padding: 16,
        paddingBottom: 40,
    },
    title: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        marginVertical: 25, 
        marginTop: 10,
        color: '#000000', 
        borderBottomWidth: 2,
        borderBottomColor: '#CCCCCC', 
        paddingBottom: 5,
        textAlign: 'center', 
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 80,
        minHeight: 700, 
    },
    emptyText: {
        fontSize: 18,
        color: '#666666',
        textAlign: 'center',
        fontWeight: '600',
    },
    barChartScrollView: {
       
    }
});

export default GraficasScreen;