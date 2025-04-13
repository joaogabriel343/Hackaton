"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

interface StudentRiskChartProps {
  data: any[]
}

export function StudentRiskChart({ data }: StudentRiskChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current || !data.length) return

    // Conta alunos por nível de risco
    const highRiskCount = data.filter((student) => student.riskLevel === "high").length
    const mediumRiskCount = data.filter((student) => student.riskLevel === "medium").length
    const lowRiskCount = data.filter((student) => student.riskLevel === "low").length

    // Destrói gráfico anterior se existir
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    // Cria novo gráfico
    const ctx = chartRef.current.getContext("2d")
    if (ctx) {
      chartInstance.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Alto Risco", "Médio Risco", "Baixo Risco"],
          datasets: [
            {
              data: [highRiskCount, mediumRiskCount, lowRiskCount],
              backgroundColor: ["#ef4444", "#f59e0b", "#22c55e"],
              borderColor: ["#ffffff", "#ffffff", "#ffffff"],
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.label || ""
                  const value = context.raw as number
                  const total = data.length
                  const percentage = Math.round((value / total) * 100)
                  return `${label}: ${value} alunos (${percentage}%)`
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

  return <canvas ref={chartRef} />
}
