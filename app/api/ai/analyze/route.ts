import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const GEMINI_API_KEY = "AIzaSyCkECxpY7nxWYH3h9JXvIGhnE_UjrNKmvc"

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)

let lastRequestTime = 0
const MIN_REQUEST_INTERVAL = 2000

export async function POST(request: Request) {
  try {
    const { studentData } = await request.json()

    if (!studentData) {
      return NextResponse.json({ error: "Dados do aluno são necessários" }, { status: 400 })
    }

    const now = Date.now()
    const timeSinceLastRequest = now - lastRequestTime

    if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
      await new Promise((resolve) => setTimeout(resolve, MIN_REQUEST_INTERVAL - timeSinceLastRequest))
    }

    lastRequestTime = Date.now()

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" })

      const prompt = `
      Você é um especialista em análise educacional especializado em identificar riscos de evasão escolar.
      
      Analise os seguintes dados do aluno e forneça insights sobre o risco de evasão e recomendações:
      
      Nome: ${studentData.name}
      ID: ${studentData.id}
      Programa: ${studentData.program}
      Ano/Nível: ${studentData.yearLevel || "Não informado"}
      Frequência: ${studentData.attendance}%
      Conclusão de Tarefas: ${studentData.assignmentCompletion}%
      Nota Média: ${studentData.averageGrade}%
      Último Login: ${studentData.lastLogin || "Não informado"}
      Créditos Concluídos: ${studentData.creditsCompleted || "Não informado"}
      Situação Acadêmica: ${studentData.academicStanding || "Não informado"}
      
      ${
        studentData.courses && studentData.courses.length > 0
          ? `
      Cursos matriculados:
      ${studentData.courses
        .map(
          (course: any, index: number) =>
            `${index + 1}. ${course.name} - Nota: ${course.grade}% - Última atividade: ${course.lastActivity}`,
        )
        .join("\n")}
      `
          : ""
      }
      
      IMPORTANTE: O fator mais determinante para o nível de risco de evasão é o último acesso do aluno ao Moodle.
      - Alto Risco: Alunos que não acessam o sistema há mais de 5 dias
      - Médio Risco: Alunos que não acessam o sistema entre 3 e 5 dias
      - Baixo Risco: Alunos que acessaram o sistema nos últimos 2 dias
      
      Forneça uma análise detalhada incluindo:
      1. Avaliação do nível de risco baseada principalmente no último acesso
      2. Padrões identificados nos dados
      3. Fatores de risco específicos, com ênfase no tempo desde o último acesso
      4. Recomendações de intervenção personalizadas
      5. Próximos passos sugeridos para professores e orientadores
      
      Formato a resposta em parágrafos claros com marcadores para as recomendações.
      Seja específico e baseie suas recomendações nos dados fornecidos.
      `

      const generationConfig = {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }

      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig,
      })

      const response = await result.response
      const analysisText = response.text()

      if (!analysisText || analysisText.trim() === "") {
        throw new Error("A API do Gemini retornou uma resposta vazia")
      }

      return NextResponse.json({ analysis: analysisText })
    } catch (geminiError) {
      console.error("Erro específico da API do Gemini:", geminiError)

      const errorMessage = geminiError instanceof Error ? geminiError.message : "Erro desconhecido"
      const isRateLimit =
        errorMessage.includes("429") || errorMessage.includes("quota") || errorMessage.includes("rate limit")

      if (isRateLimit) {
        return NextResponse.json({
          analysis:
            "Não foi possível gerar a análise devido a limitações temporárias da API. Por favor, tente novamente em alguns minutos.",
          isRateLimit: true,
        })
      }

      return NextResponse.json({
        analysis:
          "Não foi possível gerar a análise. Ocorreu um erro ao processar os dados do aluno. Por favor, tente novamente mais tarde.",
        isRateLimit: false,
      })
    }
  } catch (error) {
    console.error("Erro ao gerar análise de IA:", error)
    return NextResponse.json(
      {
        error: "Falha ao gerar análise de IA",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}
