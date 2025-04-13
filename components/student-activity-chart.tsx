"use client"

import { useEffect, useRef, useState } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

interface StudentActivityChartProps {
  studentId: string
}

export function StudentActivityChart({ studentId }: StudentActivityChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Gera dados de atividade de exemplo para os últimos 30 dias
        const dates = Array.from({ length: 30 }, (_, i) => {
          const date = new Date()
          date.setDate(date.getDate() - (29 - i))
          return date.toLocaleDateString("pt-BR", { month: "short", day: "numeric" })
        })

        // Determina o nível de risco com base no ID do aluno
        const studentIdNum = Number.parseInt(studentId.replace(/\D/g, ""), 10)
        const riskLevel = studentIdNum % 3 === 0 ? "low" : studentIdNum % 3 === 1 ? "medium" : "high"

        // Gera dados de atividade aleatórios com base no nível de risco
        let baseLoginRate = 5
        let baseResourceRate = 8
        let baseForumRate = 3

        if (riskLevel === "high") {
          baseLoginRate = 2
          baseResourceRate = 3
          baseForumRate = 1
        } else if (riskLevel === "medium") {
          baseLoginRate = 3
          baseResourceRate = 5
          baseForumRate = 2
        }

        const logins = dates.map(() => Math.floor(Math.random() * baseLoginRate) + 1)
        const resourceAccess = dates.map(() => Math.floor(Math.random() * baseResourceRate) + 1)
        const forumActivity = dates.map(() => Math.floor(Math.random() * baseForumRate))

        // Adiciona uma tendência de declínio para alunos de alto risco
        if (riskLevel === "high") {
          for (let i = 20; i < 30; i++) {
            logins[i] = Math.max(0, logins[i] - 1)
            resourceAccess[i] = Math.max(0, resourceAccess[i] - 2)
            forumActivity[i] = 0
          }
        }

        const activityData = {
          dates,
          logins,
          resourceAccess,
          forumActivity,
        }

        renderChart(activityData)
      } catch (error) {
        console.error("Falha ao gerar dados de atividade:", error)
        setError("Não foi possível carregar os dados de atividade do aluno.")
      } finally {
        setIsLoading(false)
      }
    }

    loadData()

    // Função de limpeza
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [studentId])

  const renderChart = (activityData: any) => {
    if (!chartRef.current) return

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
          labels: activityData.dates,
          datasets: [
            {
              label: "Frequência de Login",
              data: activityData.logins,
              borderColor: "rgb(59, 130, 246)",
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              tension: 0.3,
              fill: true,
            },
            {
              label: "Acesso a Recursos",
              data: activityData.resourceAccess,
              borderColor: "rgb(16, 185, 129)",
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              tension: 0.3,
              fill: true,
            },
            {
              label: "Atividade em Fóruns",
              data: activityData.forumActivity,
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
              title: {
                display: true,
                text: "Contagem de Atividades",
              },
            },
            x: {
              title: {
                display: true,
                text: "Data",
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
  }

  if (isLoading) {
    return <div className="flex h-full items-center justify-center">Carregando dados de atividade...</div>
  }

  if (error) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
        <p className="text-red-500">{error}</p>
        <p className="text-sm text-muted-foreground">
          Verifique se o ID do aluno está correto ou tente novamente mais tarde.
        </p>
      </div>
    )
  }

  return <canvas ref={chartRef} />
}
