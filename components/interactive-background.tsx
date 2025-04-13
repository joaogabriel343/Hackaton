"use client"

import { useEffect, useRef, useState } from "react"

interface Particle {
  x: number
  y: number
  size: number
  color: string
  vx: number
  vy: number
  originalX: number
  originalY: number
  followMouse: boolean
}

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationFrameRef = useRef<number>(0)

  // Inicializa as partículas
  useEffect(() => {
    const initParticles = () => {
      if (!canvasRef.current) return

      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Ajusta o tamanho do canvas para preencher a tela
      const updateCanvasSize = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }

      updateCanvasSize()
      window.addEventListener("resize", updateCanvasSize)

      // Cria partículas
      const particles: Particle[] = []
      const particleCount = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 8000), 120)

      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const size = Math.random() * 2 + 2

        // Cores que combinam com o tema do EduInsight
        const colors = [
          "rgba(124, 58, 237, 0.7)", // primary (roxo)
          "rgba(59, 130, 246, 0.7)", // secondary (azul)
          "rgba(14, 165, 233, 0.7)", // accent (azul claro)
        ]

        const color = colors[Math.floor(Math.random() * colors.length)]

        // 40% das partículas seguirão o mouse diretamente
        const followMouse = Math.random() < 0.4

        particles.push({
          x,
          y,
          size,
          color,
          vx: 0,
          vy: 0,
          originalX: x,
          originalY: y,
          followMouse,
        })
      }

      particlesRef.current = particles

      return () => {
        window.removeEventListener("resize", updateCanvasSize)
      }
    }

    initParticles()
  }, [])

  // Manipula o movimento do mouse
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY })
    }

    // Inicializa a posição do mouse no centro da tela
    if (typeof window !== "undefined") {
      setMousePosition({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Anima as partículas
  useEffect(() => {
    if (!canvasRef.current || !mousePosition) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle) => {
        if (mousePosition) {
          const dx = mousePosition.x - particle.x
          const dy = mousePosition.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (particle.followMouse) {
            // Partículas que seguem o mouse diretamente
            if (distance > 5) {
              // Evita tremulação quando muito próximo
              const speed = Math.min(distance * 0.05, 5)
              particle.vx = (dx / distance) * speed
              particle.vy = (dy / distance) * speed

              // Atualiza a posição
              particle.x += particle.vx
              particle.y += particle.vy
            } else {
              // Quando muito próximo, orbita ao redor do cursor
              const angle = Math.atan2(dy, dx) + 0.02
              const orbitRadius = particle.size * 2
              particle.x = mousePosition.x + Math.cos(angle) * orbitRadius
              particle.y = mousePosition.y + Math.sin(angle) * orbitRadius
            }
          } else {
            // Partículas que reagem à proximidade do mouse
            const mouseRadius = 150

            if (distance < mouseRadius) {
              // Quanto mais próximo do mouse, mais forte a atração
              const force = (mouseRadius - distance) / mouseRadius
              particle.vx += (dx / distance) * force * 0.3
              particle.vy += (dy / distance) * force * 0.3
            } else {
              // Força de retorno à posição original
              const returnForce = 0.05
              particle.vx += (particle.originalX - particle.x) * returnForce
              particle.vy += (particle.originalY - particle.y) * returnForce
            }

            // Atrito para desacelerar gradualmente
            const friction = 0.95
            particle.vx *= friction
            particle.vy *= friction

            // Atualiza a posição
            particle.x += particle.vx
            particle.y += particle.vy
          }
        }

        // Desenha a partícula
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Desenha conexões entre partículas próximas
        particlesRef.current.forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 80) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(124, 58, 237, ${0.2 - distance / 400})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [mousePosition])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none" />
}
