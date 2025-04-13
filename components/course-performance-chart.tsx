"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

interface CoursePerformanceChartProps {
  students: any[]
  courseId: number
}

export function CoursePerformanceChart({ students, courseId }: CoursePerformanceChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current || !students.length) return

    // Extrai dados de desempenho dos alunos para este curso específico
    const performanceData = students
      .map((student) => {
        const courseData = student.courses.find((c: any) => c.id === courseId) || {}
        return {
          name: student.name,
          grade: courseData.grade || 0,
          attendance: student.attendance,
          assignmentCompletion: student.assignmentCompletion,
        }
      })
      .sort((a, b) => a.name.localeCompare(b.name))

    // Destrói gráfico anterior se existir
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    // Cria novo gráfico
    const ctx = chartRef.current.getContext("2d")
    if (ctx) {
      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: performanceData.map((d) => d.name),
          datasets: [
            {
              label: "Nota no Curso",
              data: performanceData.map((d) => d.grade),
              backgroundColor: "rgba(59, 130, 246, 0.7)",
              borderColor: "rgb(59, 130, 246)",
              borderWidth: 1,
            },
            {
              label: "Frequência",
              data: performanceData.map((d) => d.attendance),
              backgroundColor: "rgba(16, 185, 129, 0.7)",
              borderColor: "rgb(16, 185, 129)",
              borderWidth: 1,
            },
            {
              label: "Conclusão de Tarefas",
              data: performanceData.map((d) => d.assignmentCompletion),
              backgroundColor: "rgba(249, 115, 22, 0.7)",
              borderColor: "rgb(249, 115, 22)",
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
              max: 100,
              title: {
                display: true,
                text: "Porcentagem (%)",
              },
            },
            x: {
              title: {
                display: true,
                text: "Alunos",
              },
              ticks: {
                display: students.length <= 10, // Só mostra os nomes se houver poucos alunos
                maxRotation: 45,
                minRotation: 45,
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
  }, [students, courseId])

  if (!students.length) {
    return <div className="flex h-full items-center justify-center">Sem dados disponíveis</div>
  }

  return <canvas ref={chartRef} />
}
