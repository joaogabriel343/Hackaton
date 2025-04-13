import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { fetchStudents, fetchCourses } from "@/lib/api"

const GEMINI_API_KEY = "AIzaSyCkECxpY7nxWYH3h9JXvIGhnE_UjrNKmvc"

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)

let lastRequestTime = 0
const MIN_REQUEST_INTERVAL = 2000

export async function POST(request: Request) {
  try {
    const { analysisType } = await request.json()

    if (!analysisType) {
      return NextResponse.json({ error: "Tipo de análise é necessário" }, { status: 400 })
    }

    const now = Date.now()
    const timeSinceLastRequest = now - lastRequestTime

    if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
      await new Promise((resolve) => setTimeout(resolve, MIN_REQUEST_INTERVAL - timeSinceLastRequest))
    }

    lastRequestTime = Date.now()

    try {
      const students = await fetchStudents()
      const courses = await fetchCourses()

      const totalStudents = students.length
      const highRiskCount = students.filter((s: any) => s.riskLevel === "high").length
      const mediumRiskCount = students.filter((s: any) => s.riskLevel === "medium").length
      const lowRiskCount = students.filter((s: any) => s.riskLevel === "low").length

      const avgAttendance = students.reduce((sum: number, s: any) => sum + s.attendance, 0) / totalStudents
      const avgAssignmentCompletion =
        students.reduce((sum: number, s: any) => sum + s.assignmentCompletion, 0) / totalStudents
      const avgGrade = students.reduce((sum: number, s: any) => sum + s.averageGrade, 0) / totalStudents

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" })

      let prompt = ""

      switch (analysisType) {
        case "engagement":
          prompt = `
          Você é um especialista em análise educacional. Com base nos seguintes dados, gere uma análise de tendência de engajamento ao longo do tempo para os últimos 6 meses.
          
          Dados:
          - Total de alunos: ${totalStudents}
          - Alunos em alto risco: ${highRiskCount}
          - Alunos em médio risco: ${mediumRiskCount}
          - Alunos em baixo risco: ${lowRiskCount}
          - Frequência média: ${Math.round(avgAttendance)}%
          - Taxa média de conclusão de tarefas: ${Math.round(avgAssignmentCompletion)}%
          - Nota média: ${Math.round(avgGrade)}%
          
          Forneça dados para um gráfico de linha mostrando a tendência de engajamento nos últimos 6 meses (Maio a Outubro).
          O resultado deve ser um objeto JSON com a seguinte estrutura:
          {
            "labels": ["Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro"],
            "datasets": [
              {
                "label": "Frequência Média",
                "data": [valor1, valor2, valor3, valor4, valor5, valor6]
              },
              {
                "label": "Conclusão de Tarefas",
                "data": [valor1, valor2, valor3, valor4, valor5, valor6]
              },
              {
                "label": "Participação em Fóruns",
                "data": [valor1, valor2, valor3, valor4, valor5, valor6]
              }
            ]
          }
          
          Os valores devem ser números entre 0 e 100, representando porcentagens.
          Gere valores realistas baseados nos dados fornecidos, mostrando tendências que fariam sentido para uma instituição educacional.
          Responda APENAS com o objeto JSON, sem texto adicional.
          `
          break

        case "riskByProgram":
          prompt = `
          Você é um especialista em análise educacional. Com base nos seguintes dados, gere uma análise de distribuição de risco por programa acadêmico.
          
          Dados:
          - Total de alunos: ${totalStudents}
          - Alunos em alto risco: ${highRiskCount}
          - Alunos em médio risco: ${mediumRiskCount}
          - Alunos em baixo risco: ${lowRiskCount}
          
          Forneça dados para um gráfico de barras empilhadas mostrando a distribuição de risco por programa acadêmico.
          O resultado deve ser um array JSON com a seguinte estrutura:
          [
            {
              "program": "Nome do Programa 1",
              "highRisk": número de alunos de alto risco,
              "mediumRisk": número de alunos de médio risco,
              "lowRisk": número de alunos de baixo risco
            },
            {
              "program": "Nome do Programa 2",
              "highRisk": número de alunos de alto risco,
              "mediumRisk": número de alunos de médio risco,
              "lowRisk": número de alunos de baixo risco
            },
            ...
          ]
          
          Inclua 5 programas acadêmicos: "Ciência da Computação", "Engenharia de Software", "Ciência de Dados", "Sistemas de Informação" e "Engenharia da Computação".
          Distribua os alunos de forma realista entre os programas, mantendo o total consistente com os dados fornecidos.
          Responda APENAS com o array JSON, sem texto adicional.
          `
          break

        case "correlation":
          prompt = `
          Você é um especialista em análise educacional. Com base nos seguintes dados, gere uma análise de correlação entre diferentes métricas e o risco de evasão.
          
          Dados:
          - Total de alunos: ${totalStudents}
          - Alunos em alto risco: ${highRiskCount}
          - Alunos em médio risco: ${mediumRiskCount}
          - Alunos em baixo risco: ${lowRiskCount}
          - Frequência média: ${Math.round(avgAttendance)}%
          - Taxa média de conclusão de tarefas: ${Math.round(avgAssignmentCompletion)}%
          - Nota média: ${Math.round(avgGrade)}%
          
          IMPORTANTE: O fator mais determinante para o nível de risco de evasão é o último acesso do aluno ao Moodle.
          - Alto Risco: Alunos que não acessam o sistema há mais de 5 dias
          - Médio Risco: Alunos que não acessam o sistema entre 3 e 5 dias
          - Baixo Risco: Alunos que acessaram o sistema nos últimos 2 dias
          
          Forneça dados para um gráfico de barras horizontais mostrando a correlação entre diferentes métricas e o risco de evasão.
          O resultado deve ser um array JSON com a seguinte estrutura:
          [
            { "metric": "Nome da Métrica 1", "correlation": valor entre 0 e 1 },
            { "metric": "Nome da Métrica 2", "correlation": valor entre 0 e 1 },
            ...
          ]
          
          Inclua 6 métricas: "Último Acesso", "Frequência", "Conclusão de Tarefas", "Notas", "Participação em Fóruns", "Acesso a Recursos".
          
          IMPORTANTE: "Último Acesso" deve ter a maior correlação (próxima de 1), pois é o fator mais determinante.
          
          Os valores de correlação devem ser números entre 0 e 1, onde 1 representa correlação perfeita.
          Responda APENAS com o array JSON, sem texto adicional.
          `
          break

        case "interventions":
          prompt = `
          Você é um especialista em análise educacional. Com base nos seguintes dados, gere uma análise da eficácia de diferentes intervenções para reduzir o risco de evasão.
          
          Dados:
          - Total de alunos: ${totalStudents}
          - Alunos em alto risco: ${highRiskCount}
          - Alunos em médio risco: ${mediumRiskCount}
          - Alunos em baixo risco: ${lowRiskCount}
          - Frequência média: ${Math.round(avgAttendance)}%
          - Taxa média de conclusão de tarefas: ${Math.round(avgAssignmentCompletion)}%
          - Nota média: ${Math.round(avgGrade)}%
          
          Forneça dados para um gráfico de rosca mostrando a eficácia de diferentes intervenções.
          O resultado deve ser um array JSON com a seguinte estrutura:
          [
            { "intervention": "Nome da Intervenção 1", "effectiveness": valor entre 0 e 100 },
            { "intervention": "Nome da Intervenção 2", "effectiveness": valor entre 0 e 100 },
            ...
          ]
          
          Inclua 5 intervenções: "Mentoria Individual", "Sessões de Estudo em Grupo", "Recursos Adicionais", "Ajustes de Prazos" e "Workshops de Habilidades".
          Os valores de eficácia devem ser números entre 0 e 100, representando porcentagens.
          Responda APENAS com o array JSON, sem texto adicional.
          `
          break

        case "insights":
          prompt = `
          Você é um especialista em análise educacional. Com base nos seguintes dados, gere insights e recomendações para melhorar a retenção de alunos.
          
          Dados:
          - Total de alunos: ${totalStudents}
          - Alunos em alto risco: ${highRiskCount}
          - Alunos em médio risco: ${mediumRiskCount}
          - Alunos em baixo risco: ${lowRiskCount}
          - Frequência média: ${Math.round(avgAttendance)}%
          - Taxa média de conclusão de tarefas: ${Math.round(avgAssignmentCompletion)}%
          - Nota média: ${Math.round(avgGrade)}%
          
          Forneça insights principais e recomendações baseadas em dados.
          O resultado deve ser um objeto JSON com a seguinte estrutura:
          {
            "mainInsights": [
              "Insight 1",
              "Insight 2",
              "Insight 3",
              "Insight 4"
            ],
            "recommendations": [
              "Recomendação 1",
              "Recomendação 2",
              "Recomendação 3",
              "Recomendação 4"
            ]
          }
          
          Os insights devem ser observações baseadas nos dados fornecidos.
          As recomendações devem ser ações concretas que podem ser implementadas para melhorar a retenção de alunos.
          Responda APENAS com o objeto JSON, sem texto adicional.
          `
          break

        default:
          prompt = `
          Você é um especialista em análise educacional. Com base nos seguintes dados, gere um conjunto completo de análises para um dashboard educacional.
          
          Dados:
          - Total de alunos: ${totalStudents}
          - Alunos em alto risco: ${highRiskCount}
          - Alunos em médio risco: ${mediumRiskCount}
          - Alunos em baixo risco: ${lowRiskCount}
          - Frequência média: ${Math.round(avgAttendance)}%
          - Taxa média de conclusão de tarefas: ${Math.round(avgAssignmentCompletion)}%
          - Nota média: ${Math.round(avgGrade)}%
          
          Forneça dados para um dashboard completo, incluindo:
          1. Tendência de engajamento ao longo do tempo
          2. Distribuição de risco por programa acadêmico
          3. Correlação entre métricas e risco de evasão
          4. Eficácia de diferentes intervenções
          5. Insights e recomendações
          
          O resultado deve ser um objeto JSON com a seguinte estrutura:
          {
            "engagementTrend": {
              "labels": ["Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro"],
              "datasets": [
                {
                  "label": "Frequência Média",
                  "data": [valor1, valor2, valor3, valor4, valor5, valor6]
                },
                {
                  "label": "Conclusão de Tarefas",
                  "data": [valor1, valor2, valor3, valor4, valor5, valor6]
                },
                {
                  "label": "Participação em Fóruns",
                  "data": [valor1, valor2, valor3, valor4, valor5, valor6]
                }
              ]
            },
            "riskByProgram": [
              {
                "program": "Nome do Programa 1",
                "highRisk": número de alunos de alto risco,
                "mediumRisk": número de alunos de médio risco,
                "lowRisk": número de alunos de baixo risco
              },
              ...
            ],
            "riskCorrelation": [
              { "metric": "Nome da Métrica 1", "correlation": valor entre 0 e 1 },
              ...
            ],
            "interventionEffectiveness": [
              { "intervention": "Nome da Intervenção 1", "effectiveness": valor entre 0 e 100 },
              ...
            ],
            "insights": {
              "mainInsights": [
                "Insight 1",
                "Insight 2",
                "Insight 3",
                "Insight 4"
              ],
              "recommendations": [
                "Recomendação 1",
                "Recomendação 2",
                "Recomendação 3",
                "Recomendação 4"
              ]
            }
          }
          
          Gere valores realistas baseados nos dados fornecidos.
          Responda APENAS com o objeto JSON, sem texto adicional.
          `
          break
      }

      const generationConfig = {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
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

      try {
        // Tentar analisar a resposta como JSON
        const jsonResponse = JSON.parse(analysisText.replace(/```json|```/g, "").trim())
        return NextResponse.json(jsonResponse)
      } catch (jsonError) {
        console.error("Erro ao analisar JSON da resposta:", jsonError)
        throw new Error("A resposta da API não está em formato JSON válido")
      }
    } catch (geminiError) {
      console.error("Erro específico da API do Gemini:", geminiError)

      const errorMessage = geminiError instanceof Error ? geminiError.message : "Erro desconhecido"
      const isRateLimit =
        errorMessage.includes("429") || errorMessage.includes("quota") || errorMessage.includes("rate limit")

      return NextResponse.json(
        {
          error: isRateLimit
            ? "Limite de taxa da API atingido. Por favor, tente novamente em alguns minutos."
            : "Não foi possível gerar a análise. Por favor, tente novamente mais tarde.",
          isRateLimit: isRateLimit,
        },
        { status: isRateLimit ? 429 : 500 },
      )
    }
  } catch (error) {
    console.error("Erro ao gerar dados de análise:", error)
    return NextResponse.json(
      {
        error: "Falha ao gerar dados de análise",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}
