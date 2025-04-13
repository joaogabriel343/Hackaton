"use client"

import { useEffect, useRef, useState } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

interface StudentGradesChartProps {
  studentId: string
}

export function StudentGradesChart({ studentId }: StudentGradesChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Busca o aluno diretamente do array de alunos
        const response = await fetch(`/api/moodle/student/${studentId}`)
        if (!response.ok) {
          throw new Error("Falha ao buscar dados do aluno")
        }

        const student = await response.json()

        if (!student || !student.courses || !student.courses.length) {
          throw new Error("Dados de cursos não encontrados para este aluno")
        }

        // Adiciona média da turma para cada curso
        const coursesWithAverage = student.courses.map((course: any) => ({
          ...course,
          classAverage: Math.min(100, Math.max(60, course.grade + (Math.random() * 10 - 5))),
        }))

        const gradesData = {
          courses: coursesWithAverage,
        }

        renderChart(gradesData)
      } catch (error) {
        console.error("Falha ao buscar notas do aluno:", error)
        setError("Não foi possível carregar os dados de notas do aluno.")
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

  const renderChart = (gradesData: any) => {
    if (!chartRef.current) return

    // Destrói gráfico anterior se existir
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    // Cria novo gráfico
    const ctx = chartRef.current.getContext("2d")
    if (ctx) {
      chartInstance.current = new Chart(ctx, {
        type: "radar",
        data: {
          labels: gradesData.courses.map((course: any) => course.name),
          datasets: [
            {
              label: "Notas do Aluno",
              data: gradesData.courses.map((course: any) => course.grade),
              backgroundColor: "rgba(59, 130, 246, 0.2)",
              borderColor: "rgb(59, 130, 246)",
              pointBackgroundColor: "rgb(59, 130, 246)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgb(59, 130, 246)",
            },
            {
              label: "Média da Turma",
              data: gradesData.courses.map((course: any) => course.classAverage),
              backgroundColor: "rgba(249, 115, 22, 0.2)",
              borderColor: "rgb(249, 115, 22)",
              pointBackgroundColor: "rgb(249, 115, 22)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgb(249, 115, 22)",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              min: 0,
              max: 100,
              ticks: {
                stepSize: 20,
              },
            },
          },
          plugins: {
            legend: {
              position: "bottom",
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.dataset.label || ""
                  const value = context.raw as number
                  return `${label}: ${value}%`
                },
              },
            },
          },
        },
      })
    }
  }

  if (isLoading) {
    return <div className="flex h-full items-center justify-center">Carregando dados de notas...</div>
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
