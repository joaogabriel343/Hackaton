"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
}

export default function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight

    // Declarar particles antes de qualquer função que o utilize
    const particles: Particle[] = []

    const resizeCanvas = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
      initParticles()
    }

    function initParticles() {
      particles.length = 0
      const particleCount = Math.min(Math.floor((width * height) / 15000), 100)

      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 3 + 1
        const x = Math.random() * width
        const y = Math.random() * height
        const speedX = (Math.random() - 0.5) * 0.5
        const speedY = (Math.random() - 0.5) * 0.5
        const opacity = Math.random() * 0.5 + 0.2

        // Cores que combinam com o tema
        const colors = [
          "rgba(124, 58, 237, 0.8)", // primary (roxo)
          "rgba(59, 130, 246, 0.8)", // secondary (azul)
          "rgba(14, 165, 233, 0.8)", // accent (azul claro)
          "rgba(255, 255, 255, 0.8)", // branco
        ]

        const color = colors[Math.floor(Math.random() * colors.length)]

        particles.push({
          x,
          y,
          size,
          speedX,
          speedY,
          opacity,
          color,
        })
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    let animationFrame: number

    function animate() {
      ctx.clearRect(0, 0, width, height)

      particles.forEach((particle) => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Rebate nas bordas
        if (particle.x < 0 || particle.x > width) {
          particle.speedX *= -1
        }

        if (particle.y < 0 || particle.y > height) {
          particle.speedY *= -1
        }

        // Desenha a partícula
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color.replace("0.8", particle.opacity.toString())
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

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-5 pointer-events-none" />
}
