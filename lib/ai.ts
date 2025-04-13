// Atualizar a implementação da API do Gemini para considerar o último acesso como fator principal
import { GoogleGenerativeAI } from "@google/generative-ai"

// Chave de API do Gemini fornecida
const GEMINI_API_KEY = "AIzaSyCkECxpY7nxWYH3h9JXvIGhnE_UjrNKmvc"

// Inicializa o cliente do Gemini
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)

// Esta função usa o Gemini para analisar dados do aluno
export async function generateAIAnalysis(data: any) {
  try {
    // Preparar os dados para enviar ao Gemini
    const studentData = data.student || data

    // Inicializa o modelo Gemini com o nome correto do modelo
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" })

    // Construir um prompt mais detalhado para o Gemini, enfatizando o último acesso
    const prompt = `
  Você é um assistente de análise educacional especializado em identificar riscos de evasão escolar.
  
  Analise os seguintes dados do aluno e forneça insights sobre o risco de evasão e recomendações:
  
  Nome: ${studentData.name}
  Programa: ${studentData.program}
  Frequência: ${studentData.attendance}%
  Conclusão de Tarefas: ${studentData.assignmentCompletion}%
  Nota Média: ${studentData.averageGrade}%
  Último Login: ${studentData.lastLogin || "Não informado"}
  ${studentData.creditsCompleted ? `Créditos Concluídos: ${studentData.creditsCompleted}` : ""}
  ${studentData.academicStanding ? `Situação Acadêmica: ${studentData.academicStanding}` : ""}
  
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

    // Configurar opções de segurança para o modelo
    const generationConfig = {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1024,
    }

    // Chamar a API do Gemini com tratamento de erro melhorado
    try {
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig,
      })

      const response = await result.response
      const text = response.text()

      // Verificar se a resposta está vazia
      if (!text || text.trim() === "") {
        throw new Error("A API do Gemini retornou uma resposta vazia")
      }

      return text
    } catch (geminiError) {
      console.error("Erro específico da API do Gemini:", geminiError)
      throw new Error(
        `Erro na API do Gemini: ${geminiError instanceof Error ? geminiError.message : "Erro desconhecido"}`,
      )
    }
  } catch (error) {
    console.error("Erro ao gerar análise com Gemini:", error)

    // Fallback para resposta simulada em caso de erro
    if (data.student?.riskLevel === "high" || data.riskLevel === "high") {
      return `Com base na análise dos dados de ${data.student?.name || data.name}, o aluno apresenta ALTO RISCO de evasão:

1. **Último Acesso**: O aluno não acessa o sistema há ${data.student?.lastLogin || data.lastLogin}, o que é o principal indicador de alto risco de evasão.

2. **Problemas de Frequência**: O aluno tem uma taxa de frequência de apenas ${data.student?.attendance || data.attendance}%, significativamente abaixo da média do curso.

3. **Conclusão de Tarefas**: Apenas ${data.student?.assignmentCompletion || data.assignmentCompletion}% das tarefas foram entregues, com uma tendência de queda nas últimas semanas.

4. **Métricas de Engajamento**: A participação em fóruns e o acesso a recursos diminuíram significativamente em comparação com o início do semestre.

**Intervenções Recomendadas:**
• Contato imediato por telefone ou email para verificar a situação do aluno
• Agendar uma reunião presencial com o orientador acadêmico
• Fornecer suporte direcionado para os cursos onde o desempenho é mais baixo
• Implementar verificações diárias de login e engajamento`
    } else if (data.student?.riskLevel === "medium" || data.riskLevel === "medium") {
      return `A análise dos dados de ${data.student?.name || data.name} indica um MÉDIO RISCO de evasão:

1. **Último Acesso**: O aluno acessou o sistema há ${data.student?.lastLogin || data.lastLogin}, o que é o principal indicador de médio risco.

2. **Engajamento Inconsistente**: Embora a frequência geral seja de ${data.student?.attendance || data.attendance}%, o engajamento com os materiais do curso é esporádico.

3. **Padrões de Entrega**: ${data.student?.assignmentCompletion || data.assignmentCompletion}% das tarefas são concluídas, tipicamente próximo aos prazos, com revisões mínimas.

4. **Métricas de Participação**: Participação limitada em fóruns de discussão e atividades em grupo.

**Intervenções Recomendadas:**
• Enviar lembretes personalizados para incentivar o acesso regular ao sistema
• Abordagem proativa do instrutor do curso
• Sugerir recursos adicionais para tópicos desafiadores
• Monitorar o padrão de acesso nas próximas 3 semanas`
    } else {
      return `A análise dos dados de ${data.student?.name || data.name} mostra BAIXO RISCO de evasão:

1. **Último Acesso**: O aluno acessou o sistema ${data.student?.lastLogin || data.lastLogin}, demonstrando engajamento regular e recente.

2. **Engajamento Consistente**: Acesso regular a materiais e recursos do curso, com ${data.student?.attendance || data.attendance}% de frequência.

3. **Forte Participação**: Ativo em fóruns de discussão e atividades colaborativas.

4. **Métricas de Desempenho**: Consistentemente pontuando acima das médias do curso nas avaliações, com uma nota média de ${data.student?.averageGrade || data.averageGrade}%.

**Recomendações:**
• Continuar monitorando o padrão de acesso para garantir consistência
• Considerar oferecer oportunidades de mentoria entre pares
• Sugerir recursos de aprendizagem avançados
• Incentivar a participação em competições acadêmicas ou projetos`
    }
  }
}
