"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

interface InterventionEffectivenessChartProps {
  data: any
}

export function InterventionEffectivenessChart({ data }: InterventionEffectivenessChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current || !data) return

    // Destrói gráfico anterior se existir
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    // Prepara dados para o gráfico
    const labels = data.map((item: any) => item.intervention)
    const effectivenessData = data.map((item: any) => item.effectiveness)

    // Gera cores baseadas no valor da eficácia
    const backgroundColors = effectivenessData.map((value: number) => {
      // Escala de cores de vermelho a verde baseada na eficácia
      const normalizedValue = value / 100 // Normaliza para 0-1
      const r = Math.round(255 * (1 - normalizedValue))
      const g = Math.round(255 * normalizedValue)
      const b = 50
      return `rgba(${r}, ${g}, ${b}, 0.7)`
    })

    // Cria novo gráfico
    const ctx = chartRef.current.getContext("2d")
    if (ctx) {
      chartInstance.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: labels,
          datasets: [
            {
              data: effectivenessData,
              backgroundColor: backgroundColors,
              borderColor: backgroundColors.map((color) => color.replace("0.7", "1")),
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "right",
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.label || ""
                  const value = context.raw as number
                  return `${label}: ${value}% eficácia`
                },
              },
            },
          },
        },
      })
    }

    // Função de limpeza
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data])

  if (!data) {
    return <div className="flex h-full items-center justify-center">Carregando dados...</div>
  }

  return <canvas ref={chartRef} />
}
