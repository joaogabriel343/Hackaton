import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const GEMINI_API_KEY = "AIzaSyCkECxpY7nxWYH3h9JXvIGhnE_UjrNKmvc"

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)

let lastRequestTime = 0
const MIN_REQUEST_INTERVAL = 2000

export async function POST(request: Request) {
  try {
    const { dashboardData } = await request.json()

    if (!dashboardData) {
      return NextResponse.json({ error: "Dados do dashboard são necessários" }, { status: 400 })
    }

    const now = Date.now()
    const timeSinceLastRequest = now - lastRequestTime

    if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
      await new Promise((resolve) => setTimeout(resolve, MIN_REQUEST_INTERVAL - timeSinceLastRequest))
    }

    lastRequestTime = Date.now()

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" })

      // Timestamp para garantir variação nas respostas
      const timestamp = new Date().toISOString()

      const prompt = `
      Você é um especialista em análise educacional e retenção de alunos. Com base nos seguintes dados de dashboard, forneça recomendações estratégicas para melhorar a retenção de alunos e reduzir o risco de evasão.

      Dados do Dashboard:
      - Total de alunos: ${dashboardData.totalStudents}
      - Alunos em alto risco: ${dashboardData.highRiskCount} (${dashboardData.highRiskPercentage}%)
      - Alunos em médio risco: ${dashboardData.mediumRiskCount} (${dashboardData.mediumRiskPercentage}%)
      - Alunos em baixo risco: ${dashboardData.lowRiskCount} (${dashboardData.lowRiskPercentage}%)

      IMPORTANTE: O fator mais determinante para o nível de risco de evasão é o último acesso do aluno ao Moodle.
      - Alto Risco: Alunos que não acessam o sistema há mais de 5 dias
      - Médio Risco: Alunos que não acessam o sistema entre 3 e 5 dias
      - Baixo Risco: Alunos que acessaram o sistema nos últimos 2 dias

      IMPORTANTE: Gere recomendações COMPLETAMENTE NOVAS e DIFERENTES de qualquer resposta anterior. Não repita frases ou recomendações que você já forneceu antes. Cada vez que você responder, deve ser com conteúdo totalmente original.

      Forneça suas recomendações em três categorias claramente separadas:
      1. Alta Prioridade: Ações imediatas que devem ser implementadas para os alunos de alto risco, focando principalmente em reengajar alunos que não acessam o sistema há mais de 5 dias
      2. Média Prioridade: Intervenções para alunos de médio risco e melhorias de médio prazo, com foco em manter o engajamento de alunos que não acessam o sistema entre 3 e 5 dias
      3. Estratégias de Longo Prazo: Abordagens sistêmicas para melhorar a retenção geral e incentivar acessos regulares ao sistema

      Para cada categoria, forneça EXATAMENTE 4 recomendações específicas, práticas e baseadas em evidências.
      Suas recomendações devem ser específicas para o contexto educacional e focadas em ações concretas.
      
      Cada recomendação deve ser uma frase completa e detalhada, com pelo menos 15 palavras e no máximo 30 palavras.
      
      Estruture sua resposta exatamente assim:

      Alta Prioridade:
      • [Primeira recomendação de alta prioridade]
      • [Segunda recomendação de alta prioridade]
      • [Terceira recomendação de alta prioridade]
      • [Quarta recomendação de alta prioridade]

      Média Prioridade:
      • [Primeira recomendação de média prioridade]
      • [Segunda recomendação de média prioridade]
      • [Terceira recomendação de média prioridade]
      • [Quarta recomendação de média prioridade]

      Estratégias de Longo Prazo:
      • [Primeira estratégia de longo prazo]
      • [Segunda estratégia de longo prazo]
      • [Terceira estratégia de longo prazo]
      • [Quarta estratégia de longo prazo]

      Timestamp para garantir variação: ${timestamp}
      `

      const generationConfig = {
        temperature: 0.9, // Aumentado para maior variação
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048, // Aumentado para evitar cortes
      }

      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig,
      })

      const response = await result.response
      const recommendationsText = response.text()

      if (!recommendationsText || recommendationsText.trim() === "") {
        throw new Error("A API do Gemini retornou uma resposta vazia")
      }

      // Processar o texto para extrair as recomendações em formato estruturado
      const recommendations = processRecommendations(recommendationsText)

      return NextResponse.json({ recommendations, isGemini: true })
    } catch (geminiError) {
      console.error("Erro específico da API do Gemini:", geminiError)

      const errorMessage = geminiError instanceof Error ? geminiError.message : "Erro desconhecido"
      const isRateLimit =
        errorMessage.includes("429") || errorMessage.includes("quota") || errorMessage.includes("rate limit")

      // Fornecer uma mensagem de erro genérica em vez de recomendações pré-escritas
      return NextResponse.json(
        {
          error: isRateLimit
            ? "Limite de taxa da API atingido. Por favor, tente novamente em alguns minutos."
            : "Não foi possível gerar recomendações. Por favor, tente novamente mais tarde.",
          isRateLimit: isRateLimit,
        },
        { status: isRateLimit ? 429 : 500 },
      )
    }
  } catch (error) {
    console.error("Erro ao gerar recomendações:", error)
    return NextResponse.json(
      {
        error: "Falha ao gerar recomendações",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}

// Função para processar o texto da resposta e extrair recomendações estruturadas
function processRecommendations(text: string) {
  // Estrutura padrão para as recomendações
  const recommendations = {
    highPriority: [] as string[],
    mediumPriority: [] as string[],
    longTerm: [] as string[],
  }

  // Tentar extrair recomendações de alta prioridade
  const highPriorityMatch = text.match(/Alta Prioridade[:\s]*([\s\S]*?)(?=Média Prioridade|Média|$)/i)
  if (highPriorityMatch && highPriorityMatch[1]) {
    recommendations.highPriority = extractBulletPoints(highPriorityMatch[1])
  }

  // Tentar extrair recomendações de média prioridade
  const mediumPriorityMatch = text.match(/Média Prioridade[:\s]*([\s\S]*?)(?=Estratégias|Longo Prazo|$)/i)
  if (mediumPriorityMatch && mediumPriorityMatch[1]) {
    recommendations.mediumPriority = extractBulletPoints(mediumPriorityMatch[1])
  }

  // Tentar extrair estratégias de longo prazo
  const longTermMatch = text.match(/(?:Estratégias|Longo Prazo)[:\s]*([\s\S]*?)(?=$)/i)
  if (longTermMatch && longTermMatch[1]) {
    recommendations.longTerm = extractBulletPoints(longTermMatch[1])
  }

  // Garantir que cada categoria tenha exatamente 4 recomendações
  ensureFourRecommendations(recommendations.highPriority, "alta prioridade")
  ensureFourRecommendations(recommendations.mediumPriority, "média prioridade")
  ensureFourRecommendations(recommendations.longTerm, "longo prazo")

  return recommendations
}

// Função para garantir que cada categoria tenha exatamente 4 recomendações
function ensureFourRecommendations(recommendations: string[], category: string) {
  // Se tiver menos de 4, adicionar genéricas para completar
  while (recommendations.length < 4) {
    recommendations.push(`Recomendação adicional de ${category} não disponível. Tente gerar novamente.`)
  }

  // Se tiver mais de 4, manter apenas as 4 primeiras
  if (recommendations.length > 4) {
    recommendations.splice(4)
  }
}

// Função auxiliar para extrair itens de lista com marcadores
function extractBulletPoints(text: string): string[] {
  const bulletPoints: string[] = []

  // Procurar por itens com marcadores (•, -, *, números)
  const lines = text.split("\n")

  for (const line of lines) {
    const trimmedLine = line.trim()
    if (
      trimmedLine.match(/^[•\-*\d.)]\s+(.+)/) ||
      trimmedLine.match(/^[•\-*]\s*(.+)/) ||
      trimmedLine.match(/^\d+\.\s*(.+)/)
    ) {
      // Remover o marcador e espaços extras
      const content = trimmedLine.replace(/^[•\-*\d.)]\s*/, "").trim()
      if (content && content.length > 5) {
        // Garantir que não seja uma linha vazia ou muito curta
        bulletPoints.push(content)
      }
    }
  }

  return bulletPoints
}
