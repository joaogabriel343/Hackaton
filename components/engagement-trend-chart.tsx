"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

interface EngagementTrendChartProps {
  data: any
}

export function EngagementTrendChart({ data }: EngagementTrendChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current || !data) return

    // Destrói gráfico anterior se existir
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    // Cria novo gráfico
    const ctx = chartRef.current.getContext("2d")
    if (ctx) {
      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: data.labels,
          datasets: [
            {
              label: data.datasets[0].label,
              data: data.datasets[0].data,
              borderColor: "rgb(59, 130, 246)",
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              tension: 0.3,
              fill: true,
            },
            {
              label: data.datasets[1].label,
              data: data.datasets[1].data,
              borderColor: "rgb(16, 185, 129)",
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              tension: 0.3,
              fill: true,
            },
            {
              label: data.datasets[2].label,
              data: data.datasets[2].data,
              borderColor: "rgb(249, 115, 22)",
              backgroundColor: "rgba(249, 115, 22, 0.1)",
              tension: 0.3,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              title: {
                display: true,
                text: "Porcentagem (%)",
              },
            },
            x: {
              title: {
                display: true,
                text: "Mês",
              },
            },
          },
          plugins: {
            legend: {
              position: "bottom",
            },
            tooltip: {
              mode: "index",
              intersect: false,
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
