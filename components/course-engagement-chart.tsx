"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export function CourseEngagementChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Dados de exemplo - em um app real, isso viria de uma API
    const courseData = [
      { name: "CS101", attendance: 85, assignments: 78, forums: 62, resources: 70 },
      { name: "CS201", attendance: 72, assignments: 65, forums: 45, resources: 58 },
      { name: "CS301", attendance: 88, assignments: 82, forums: 75, resources: 80 },
      { name: "CS401", attendance: 80, assignments: 75, forums: 68, resources: 72 },
    ]

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
          labels: courseData.map((course) => course.name),
          datasets: [
            {
              label: "Frequência",
              data: courseData.map((course) => course.attendance),
              backgroundColor: "rgba(59, 130, 246, 0.7)",
              borderColor: "rgb(59, 130, 246)",
              borderWidth: 1,
            },
            {
              label: "Tarefas",
              data: courseData.map((course) => course.assignments),
              backgroundColor: "rgba(16, 185, 129, 0.7)",
              borderColor: "rgb(16, 185, 129)",
              borderWidth: 1,
            },
            {
              label: "Atividade em Fóruns",
              data: courseData.map((course) => course.forums),
              backgroundColor: "rgba(249, 115, 22, 0.7)",
              borderColor: "rgb(249, 115, 22)",
              borderWidth: 1,
            },
            {
              label: "Acesso a Recursos",
              data: courseData.map((course) => course.resources),
              backgroundColor: "rgba(139, 92, 246, 0.7)",
              borderColor: "rgb(139, 92, 246)",
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
                text: "Engajamento (%)",
              },
            },
            x: {
              title: {
                display: true,
                text: "Curso",
              },
            },
          },
          plugins: {
            legend: {
              position: "bottom",
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
  }, [])

  return <canvas ref={chartRef} />
}
