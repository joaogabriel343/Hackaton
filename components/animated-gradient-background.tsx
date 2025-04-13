"use client"

import { useEffect, useRef } from "react"

export default function AnimatedGradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight

    const resizeCanvas = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Configuração dos círculos gradientes
    const circles = [
      { x: width * 0.2, y: height * 0.3, radius: Math.max(width, height) * 0.4, speed: 0.002 },
      { x: width * 0.8, y: height * 0.7, radius: Math.max(width, height) * 0.5, speed: 0.003 },
      { x: width * 0.5, y: height * 0.1, radius: Math.max(width, height) * 0.3, speed: 0.004 },
    ]

    // Cores para os gradientes
    const colors = {
      primary: [
        { stop: 0, color: "rgba(124, 58, 237, 0.5)" }, // Roxo (primary)
        { stop: 1, color: "rgba(124, 58, 237, 0)" },
      ],
      secondary: [
        { stop: 0, color: "rgba(59, 130, 246, 0.5)" }, // Azul (secondary)
        { stop: 1, color: "rgba(59, 130, 246, 0)" },
      ],
      accent: [
        { stop: 0, color: "rgba(14, 165, 233, 0.5)" }, // Azul claro (accent)
        { stop: 1, color: "rgba(14, 165, 233, 0)" },
      ],
    }

    const colorSets = [colors.primary, colors.secondary, colors.accent]

    let animationFrame: number
    let time = 0

    const animate = () => {
      time += 0.01
      ctx.clearRect(0, 0, width, height)

      // Desenha os círculos gradientes
      circles.forEach((circle, i) => {
        const colorSet = colorSets[i % colorSets.length]

        // Movimento suave dos círculos
        const x = circle.x + Math.sin(time * circle.speed * 10) * width * 0.1
        const y = circle.y + Math.cos(time * circle.speed * 8) * height * 0.1

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, circle.radius)

        colorSet.forEach((color) => {
          gradient.addColorStop(color.stop, color.color)
        })

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(x, y, circle.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10" />
}
