
/**
 * Función principal para calcular las tablas de frecuencia
 * Acepta un string (por ejemplo: "15,16,15,17,16,15,18,16,16,17")
 * o un array (por ejemplo: [15,16,15,17,16,15,18,16,16,17])
 * Devuelve un arreglo con las frecuencias:
 * [{ valor, f, fr, fa, fra }]
 */

export type FilaFrecuencia = {
  valor: string | number
  f: number
  fr: number
  fa: number
  fra: number
}

export function calcularFrecuencia(input: string | (string | number)[]): FilaFrecuencia[] {

  let datos: (string | number)[] = []

  if (typeof input === "string") {

    datos = input
      .split(/[\s,;]+/)
      .filter(Boolean)
      .map((v) => (isNaN(Number(v)) ? v : Number(v)))
  } else {
    datos = input
  }

  if (datos.length === 0) {
    throw new Error("No se proporcionaron datos válidos.")
  }

  const esNumerico = typeof datos[0] === "number"

  if (esNumerico) {
    datos = (datos as number[]).sort((a, b) => a - b)
  } else {
    datos = (datos as string[]).sort()
  }

  const total = datos.length

  const conteo: Record<string, number> = {}
  datos.forEach((valor) => {
    const key = String(valor)
    conteo[key] = (conteo[key] || 0) + 1
  })

  const valoresUnicos = Object.keys(conteo)

  let acumulada = 0
  const resultado: FilaFrecuencia[] = valoresUnicos.map((v) => {
    const f = conteo[v]
    acumulada += f
    const fr = f / total
    const fra = acumulada / total

    return {
      valor: esNumerico ? Number(v) : v,
      f,
      fr: Number(fr.toFixed(4)),
      fa: acumulada,
      fra: Number(fra.toFixed(4))
    }
  })

  return resultado
}

