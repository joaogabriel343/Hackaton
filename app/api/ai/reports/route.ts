import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { fetchStudents, fetchCourses } from "@/lib/api"

const GEMINI_API_KEY = "AIzaSyCkECxpY7nxWYH3h9JXvIGhnE_UjrNKmvc"

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)

let lastRequestTime = 0
const MIN_REQUEST_INTERVAL = 2000

export async function POST(request: Request) {
  try {
    const { reportType } = await request.json()

    if (!reportType) {
      return NextResponse.json({ error: "Tipo de relatório é necessário" }, { status: 400 })
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

      const programGroups: Record<string, any[]> = {}
      students.forEach((student: any) => {
        if (!programGroups[student.program]) {
          programGroups[student.program] = []
        }
        programGroups[student.program].push(student)
      })

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" })

      let prompt = ""
      let reportTitle = ""

      switch (reportType) {
        case "summary":
          reportTitle = "Relatório de Risco de Evasão - Resumo"
          prompt = `
  Você é um especialista em análise educacional. Gere um relatório de resumo sobre o risco de evasão de alunos com base nos seguintes dados:
  
  Dados:
  - Total de alunos: ${totalStudents}
  - Alunos em alto risco: ${highRiskCount} (${Math.round((highRiskCount / totalStudents) * 100)}%)
  - Alunos em médio risco: ${mediumRiskCount} (${Math.round((mediumRiskCount / totalStudents) * 100)}%)
  - Alunos em baixo risco: ${lowRiskCount} (${Math.round((lowRiskCount / totalStudents) * 100)}%)
  - Frequência média: ${Math.round(avgAttendance)}%
  - Taxa média de conclusão de tarefas: ${Math.round(avgAssignmentCompletion)}%
  - Nota média: ${Math.round(avgGrade)}%
  
  IMPORTANTE: O fator mais determinante para o nível de risco de evasão é o último acesso do aluno ao Moodle.
  - Alto Risco: Alunos que não acessam o sistema há mais de 5 dias
  - Médio Risco: Alunos que não acessam o sistema entre 3 e 5 dias
  - Baixo Risco: Alunos que acessaram o sistema nos últimos 2 dias
  
  O relatório deve incluir:
  1. Uma análise da situação atual, enfatizando a importância do monitoramento de acessos
  2. Identificação de padrões e tendências relacionados ao último acesso
  3. Recomendações específicas para reduzir o risco de evasão, focando em estratégias para aumentar a frequência de acesso
  
  Forneça um relatório detalhado e baseado em evidências, com recomendações práticas e acionáveis.
  `
          break

        case "engagement":
          reportTitle = "Análise de Engajamento por Curso"
          prompt = `
          Você é um especialista em análise educacional. Gere um relatório detalhado sobre o engajamento dos alunos por curso com base nos seguintes dados:
          
          Dados:
          - Total de alunos: ${totalStudents}
          - Alunos em alto risco: ${highRiskCount} (${Math.round((highRiskCount / totalStudents) * 100)}%)
          - Alunos em médio risco: ${mediumRiskCount} (${Math.round((mediumRiskCount / totalStudents) * 100)}%)
          - Alunos em baixo risco: ${lowRiskCount} (${Math.round((lowRiskCount / totalStudents) * 100)}%)
          - Frequência média: ${Math.round(avgAttendance)}%
          - Taxa média de conclusão de tarefas: ${Math.round(avgAssignmentCompletion)}%
          - Nota média: ${Math.round(avgGrade)}%
          
          O relatório deve incluir:
          1. Análise detalhada do engajamento dos alunos em diferentes cursos
          2. Identificação de cursos com alto e baixo engajamento
          3. Fatores que contribuem para o engajamento
          4. Recomendações para aumentar o engajamento em cursos com baixo desempenho
          
          Forneça um relatório detalhado e baseado em evidências, com recomendações práticas e acionáveis.
          `
          break

        case "performance":
          reportTitle = "Tendências de Desempenho - Último Trimestre"
          prompt = `
          Você é um especialista em análise educacional. Gere um relatório detalhado sobre as tendências de desempenho dos alunos no último trimestre com base nos seguintes dados:
          
          Dados:
          - Total de alunos: ${totalStudents}
          - Alunos em alto risco: ${highRiskCount} (${Math.round((highRiskCount / totalStudents) * 100)}%)
          - Alunos em médio risco: ${mediumRiskCount} (${Math.round((mediumRiskCount / totalStudents) * 100)}%)
          - Alunos em baixo risco: ${lowRiskCount} (${Math.round((lowRiskCount / totalStudents) * 100)}%)
          - Frequência média: ${Math.round(avgAttendance)}%
          - Taxa média de conclusão de tarefas: ${Math.round(avgAssignmentCompletion)}%
          - Nota média: ${Math.round(avgGrade)}%
          
          O relatório deve incluir:
          1. Análise das tendências de desempenho dos alunos no último trimestre
          2. Identificação de padrões de melhoria ou declínio
          3. Correlação entre desempenho e risco de evasão
          4. Recomendações para melhorar o desempenho dos alunos em risco
          
          Forneça um relatório detalhado e baseado em evidências, com recomendações práticas e acionáveis.
          `
          break

        case "interventions":
          reportTitle = "Relatório de Intervenções Recomendadas"
          prompt = `
          Você é um especialista em análise educacional. Gere um relatório detalhado sobre intervenções recomendadas para alunos em risco de evasão com base nos seguintes dados:
          
          Dados:
          - Total de alunos: ${totalStudents}
          - Alunos em alto risco: ${highRiskCount} (${Math.round((highRiskCount / totalStudents) * 100)}%)
          - Alunos em médio risco: ${mediumRiskCount} (${Math.round((mediumRiskCount / totalStudents) * 100)}%)
          - Alunos em baixo risco: ${lowRiskCount} (${Math.round((lowRiskCount / totalStudents) * 100)}%)
          - Frequência média: ${Math.round(avgAttendance)}%
          - Taxa média de conclusão de tarefas: ${Math.round(avgAssignmentCompletion)}%
          - Nota média: ${Math.round(avgGrade)}%
          
          O relatório deve incluir:
          1. Um plano detalhado de intervenções para alunos de alto, médio e baixo risco
          2. Estratégias específicas para cada nível de risco
          3. Cronograma de implementação
          4. Métricas para avaliar a eficácia das intervenções
          
          Forneça um relatório detalhado e baseado em evidências, com recomendações práticas e acionáveis.
          `
          break

        case "comparative":
          reportTitle = "Análise Comparativa de Programas Acadêmicos"
          prompt = `
          Você é um especialista em análise educacional. Gere um relatório detalhado comparando diferentes programas acadêmicos com base nos seguintes dados:
          
          Dados:
          - Total de alunos: ${totalStudents}
          - Alunos em alto risco: ${highRiskCount} (${Math.round((highRiskCount / totalStudents) * 100)}%)
          - Alunos em médio risco: ${mediumRiskCount} (${Math.round((mediumRiskCount / totalStudents) * 100)}%)
          - Alunos em baixo risco: ${lowRiskCount} (${Math.round((lowRiskCount / totalStudents) * 100)}%)
          - Frequência média: ${Math.round(avgAttendance)}%
          - Taxa média de conclusão de tarefas: ${Math.round(avgAssignmentCompletion)}%
          - Nota média: ${Math.round(avgGrade)}%
          
          Programas acadêmicos:
          ${Object.keys(programGroups)
            .map((program) => {
              const students = programGroups[program]
              const highRisk = students.filter((s) => s.riskLevel === "high").length
              const avgGrade = students.reduce((sum, s) => sum + s.averageGrade, 0) / students.length
              return `- ${program}: ${students.length} alunos, ${highRisk} em alto risco, nota média de ${Math.round(avgGrade)}%`
            })
            .join("\n")}
          
          O relatório deve incluir:
          1. Comparação detalhada entre os diferentes programas acadêmicos
          2. Identificação de programas com alto e baixo risco de evasão
          3. Análise de fatores que contribuem para o sucesso ou fracasso em cada programa
          4. Recomendações específicas para cada programa
          
          Forneça um relatório detalhado e baseado em evidências, com recomendações práticas e acionáveis.
          `
          break

        default:
          reportTitle = "Relatório Completo de Análise Educacional"
          prompt = `
          Você é um especialista em análise educacional. Gere um relatório completo sobre todos os aspectos da retenção de alunos com base nos seguintes dados:
          
          Dados:
          - Total de alunos: ${totalStudents}
          - Alunos em alto risco: ${highRiskCount} (${Math.round((highRiskCount / totalStudents) * 100)}%)
          - Alunos em médio risco: ${mediumRiskCount} (${Math.round((mediumRiskCount / totalStudents) * 100)}%)
          - Alunos em baixo risco: ${lowRiskCount} (${Math.round((lowRiskCount / totalStudents) * 100)}%)
          - Frequência média: ${Math.round(avgAttendance)}%
          - Taxa média de conclusão de tarefas: ${Math.round(avgAssignmentCompletion)}%
          - Nota média: ${Math.round(avgGrade)}%
          
          O relatório deve incluir:
          1. Resumo executivo
          2. Análise de engajamento e desempenho
          3. Comparação entre programas acadêmicos
          4. Plano de intervenções recomendadas
          5. Estratégias de longo prazo
          
          Forneça um relatório detalhado e baseado em evidências, com recomendações práticas e acionáveis.
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
      const reportSummary = response.text()

      if (!reportSummary || reportSummary.trim() === "") {
        throw new Error("A API do Gemini retornou uma resposta vazia")
      }

      const reportDate = new Date().toLocaleDateString("pt-BR", { day: "numeric", month: "short", year: "numeric" })

      const metrics = {
        avgAttendance: Math.round(avgAttendance),
        avgAssignmentCompletion: Math.round(avgAssignmentCompletion),
        avgGrade: Math.round(avgGrade),
      }

      const report = {
        id: `R${Math.floor(Math.random() * 1000)
          .toString()
          .padStart(3, "0")}`,
        title: reportTitle,
        date: reportDate,
        author: "Sistema EduInsight (Gemini AI)",
        summary: reportSummary,
        metrics,
        type: reportType,
        isGemini: true,
      }

      return NextResponse.json({ report })
    } catch (geminiError) {
      console.error("Erro específico da API do Gemini:", geminiError)

      const errorMessage = geminiError instanceof Error ? geminiError.message : "Erro desconhecido"
      const isRateLimit =
        errorMessage.includes("429") || errorMessage.includes("quota") || errorMessage.includes("rate limit")

      return NextResponse.json(
        {
          error: isRateLimit
            ? "Limite de taxa da API atingido. Por favor, tente novamente em alguns minutos."
            : "Não foi possível gerar o relatório. Por favor, tente novamente mais tarde.",
          isRateLimit: isRateLimit,
        },
        { status: isRateLimit ? 429 : 500 },
      )
    }
  } catch (error) {
    console.error("Erro ao gerar relatório:", error)
    return NextResponse.json(
      {
        error: "Falha ao gerar relatório",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}
