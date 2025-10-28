import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';

export type FilaFrecuencia = {
    valor: string | number
    f: number
    fr: number
    fa: number
    fra: number
}

export interface DatosEstadisticos {
    tabla: FilaFrecuencia[] | null;
    valores: number[];
    frecuencias: number[];
}

interface DatosContextType {
    datos: DatosEstadisticos;
    setDatos: (tabla: FilaFrecuencia[]) => void;
}

const initialDatos: DatosEstadisticos = {
    tabla: null,
    valores: [],
    frecuencias: [],
};

export const DatosContext = createContext<DatosContextType | undefined>(undefined);

export const DatosProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [datos, setDatosState] = useState<DatosEstadisticos>(initialDatos);

    const setDatos = useCallback((tabla: FilaFrecuencia[]) => {
        const valores = tabla.map(fila => Number(fila.valor)); 
        const frecuencias = tabla.map(fila => fila.f);

        setDatosState({ tabla, valores, frecuencias });
    }, []);

    return (
        <DatosContext.Provider value={{ datos, setDatos }}>
            {children}
        </DatosContext.Provider>
    );
};

export const useDatosContext = () => {
    const context = useContext(DatosContext);
    if (!context) {
        throw new Error('useDatosContext debe usarse dentro de un DatosProvider');
    }
    return context;
};