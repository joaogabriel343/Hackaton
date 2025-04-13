import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const GEMINI_API_KEY = "AIzaSyCkECxpY7nxWYH3h9JXvIGhnE_UjrNKmvc"

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)

let lastRequestTime = 0
const MIN_REQUEST_INTERVAL = 2000

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Mensagem é necessária" }, { status: 400 })
    }

    const now = Date.now()
    const timeSinceLastRequest = now - lastRequestTime

    if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
      await new Promise((resolve) => setTimeout(resolve, MIN_REQUEST_INTERVAL - timeSinceLastRequest))
    }

    lastRequestTime = Date.now()

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" })

      const systemPrompt = `
      Você é o assistente EduInsight, especializado em análise educacional e prevenção de evasão escolar.
      
      Seu objetivo é ajudar educadores e administradores a:
      - Interpretar dados de desempenho e engajamento de alunos
      - Identificar fatores de risco para evasão escolar
      - Sugerir estratégias de intervenção baseadas em evidências
      - Fornecer insights sobre melhores práticas educacionais
      
      IMPORTANTE: O fator mais determinante para o nível de risco de evasão é o último acesso do aluno ao Moodle.
      - Alto Risco: Alunos que não acessam o sistema há mais de 5 dias
      - Médio Risco: Alunos que não acessam o sistema entre 3 e 5 dias
      - Baixo Risco: Alunos que acessaram o sistema nos últimos 2 dias
      
      Você tem conhecimento sobre:
      - Indicadores de risco de evasão (frequência, notas, engajamento, com ênfase no último acesso)
      - Estratégias de retenção de alunos
      - Análise de dados educacionais
      - Metodologias pedagógicas
      
      Responda de forma clara, objetiva e baseada em evidências. Quando apropriado, sugira ações práticas que os educadores possam implementar.
      
      Mantenha suas respostas em português do Brasil.
      
      IMPORTANTE: Forneça respostas variadas e não repetitivas. Cada resposta deve ser única e personalizada para a pergunta específica.
      `

      const messages = []

      messages.push({
        role: "user",
        parts: [{ text: systemPrompt }],
      })

      messages.push({
        role: "model",
        parts: [{ text: "Entendido. Estou pronto para ajudar como o assistente EduInsight." }],
      })

      if (history && history.length > 1) {
        for (let i = 1; i < history.length; i++) {
          const role = history[i].role === "user" ? "user" : "model"
          messages.push({
            role: role,
            parts: [{ text: history[i].content }],
          })
        }
      }

      messages.push({
        role: "user",
        parts: [{ text: message }],
      })

      const result = await model.generateContent({
        contents: messages,
        generationConfig: {
          temperature: 0.9,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      })

      const response = await result.response
      const text = response.text()

      if (!text || text.trim() === "") {
        throw new Error("A API do Gemini retornou uma resposta vazia")
      }

      return NextResponse.json({ response: text })
    } catch (geminiError) {
      console.error("Erro específico da API do Gemini:", geminiError)

      const errorMessage = geminiError instanceof Error ? geminiError.message : "Erro desconhecido"
      const isRateLimit =
        errorMessage.includes("429") || errorMessage.includes("quota") || errorMessage.includes("rate limit")

      if (isRateLimit) {
        return NextResponse.json({
          response:
            "Desculpe, estou enfrentando limitações temporárias de acesso à API. Por favor, tente novamente em alguns minutos.",
          isRateLimit: true,
        })
      }

      return NextResponse.json({
        response: "Desculpe, estou enfrentando dificuldades técnicas no momento. Poderia tentar novamente mais tarde?",
        isRateLimit: false,
      })
    }
  } catch (error) {
    console.error("Erro ao processar mensagem:", error)
    return NextResponse.json(
      {
        error: "Falha ao processar mensagem",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}
