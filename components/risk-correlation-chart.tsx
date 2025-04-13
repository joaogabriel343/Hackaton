"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

interface RiskCorrelationChartProps {
  data: any
}

export function RiskCorrelationChart({ data }: RiskCorrelationChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current || !data) return

    // Destrói gráfico anterior se existir
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    // Prepara dados para o gráfico
    const labels = data.map((item: any) => item.metric)
    const correlationData = data.map((item: any) => item.correlation)

    // Gera cores baseadas no valor da correlação
    const backgroundColors = correlationData.map((value: number) => {
      const r = Math.round(255 * (1 - value))
      const g = Math.round(255 * value)
      const b = 100
      return `rgba(${r}, ${g}, ${b}, 0.7)`
    })

    // Cria novo gráfico
    const ctx = chartRef.current.getContext("2d")
    if (ctx) {
      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Correlação com Risco de Evasão",
              data: correlationData,
              backgroundColor: backgroundColors,
              borderColor: backgroundColors.map((color) => color.replace("0.7", "1")),
              borderWidth: 1,
            },
          ],
        },
        options: {
          indexAxis: "y",
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              beginAtZero: true,
              max: 1,
              title: {
                display: true,
                text: "Correlação (0-1)",
              },
            },
            y: {
              title: {
                display: true,
                text: "Métrica",
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const value = context.raw as number
                  return `Correlação: ${(value * 100).toFixed(1)}%`
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
