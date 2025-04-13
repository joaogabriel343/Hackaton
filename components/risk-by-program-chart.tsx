"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

interface RiskByProgramChartProps {
  data: any
}

export function RiskByProgramChart({ data }: RiskByProgramChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current || !data) return

    // Destrói gráfico anterior se existir
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    // Prepara dados para o gráfico
    const labels = data.map((item: any) => item.program)
    const highRiskData = data.map((item: any) => item.highRisk)
    const mediumRiskData = data.map((item: any) => item.mediumRisk)
    const lowRiskData = data.map((item: any) => item.lowRisk)

    // Cria novo gráfico
    const ctx = chartRef.current.getContext("2d")
    if (ctx) {
      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Alto Risco",
              data: highRiskData,
              backgroundColor: "rgba(239, 68, 68, 0.7)",
              borderColor: "rgb(239, 68, 68)",
              borderWidth: 1,
            },
            {
              label: "Médio Risco",
              data: mediumRiskData,
              backgroundColor: "rgba(245, 158, 11, 0.7)",
              borderColor: "rgb(245, 158, 11)",
              borderWidth: 1,
            },
            {
              label: "Baixo Risco",
              data: lowRiskData,
              backgroundColor: "rgba(34, 197, 94, 0.7)",
              borderColor: "rgb(34, 197, 94)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Número de Alunos",
              },
              stacked: true,
            },
            x: {
              title: {
                display: true,
                text: "Programa Acadêmico",
              },
              stacked: true,
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
