import { NextResponse } from "next/server"

// Dados de exemplo de alunos para a API fake do Moodle
const students = [
  {
    id: "1001",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    program: "Ciência da Computação",
    attendance: 65,
    assignmentCompletion: 58,
    averageGrade: 72,
    riskLevel: "high",
    lastLogin: "3 dias atrás",
  },
  {
    id: "1002",
    name: "Samantha Lee",
    email: "samantha.lee@example.com",
    program: "Ciência da Computação",
    attendance: 78,
    assignmentCompletion: 82,
    averageGrade: 76,
    riskLevel: "medium",
    lastLogin: "Ontem",
  },
  {
    id: "1003",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    program: "Engenharia da Computação",
    attendance: 92,
    assignmentCompletion: 95,
    averageGrade: 88,
    riskLevel: "low",
    lastLogin: "Hoje",
  },
  {
    id: "1004",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@example.com",
    program: "Ciência de Dados",
    attendance: 88,
    assignmentCompletion: 75,
    averageGrade: 82,
    riskLevel: "low",
    lastLogin: "Ontem",
  },
  {
    id: "1005",
    name: "David Kim",
    email: "david.kim@example.com",
    program: "Ciência da Computação",
    attendance: 70,
    assignmentCompletion: 68,
    averageGrade: 74,
    riskLevel: "medium",
    lastLogin: "4 dias atrás",
  },
  // Novos alunos adicionados
  {
    id: "1006",
    name: "Ana Silva",
    email: "ana.silva@example.com",
    program: "Engenharia de Software",
    attendance: 62,
    assignmentCompletion: 55,
    averageGrade: 68,
    riskLevel: "high",
    lastLogin: "5 dias atrás",
  },
  {
    id: "1007",
    name: "Pedro Oliveira",
    email: "pedro.oliveira@example.com",
    program: "Sistemas de Informação",
    attendance: 85,
    assignmentCompletion: 80,
    averageGrade: 78,
    riskLevel: "medium",
    lastLogin: "2 dias atrás",
  },
  {
    id: "1008",
    name: "Juliana Santos",
    email: "juliana.santos@example.com",
    program: "Ciência de Dados",
    attendance: 95,
    assignmentCompletion: 98,
    averageGrade: 92,
    riskLevel: "low",
    lastLogin: "Hoje",
  },
  {
    id: "1009",
    name: "Lucas Ferreira",
    email: "lucas.ferreira@example.com",
    program: "Engenharia da Computação",
    attendance: 60,
    assignmentCompletion: 65,
    averageGrade: 71,
    riskLevel: "high",
    lastLogin: "6 dias atrás",
  },
  {
    id: "1010",
    name: "Mariana Costa",
    email: "mariana.costa@example.com",
    program: "Sistemas de Informação",
    attendance: 75,
    assignmentCompletion: 72,
    averageGrade: 76,
    riskLevel: "medium",
    lastLogin: "3 dias atrás",
  },
  {
    id: "1011",
    name: "Rafael Almeida",
    email: "rafael.almeida@example.com",
    program: "Ciência da Computação",
    attendance: 90,
    assignmentCompletion: 85,
    averageGrade: 84,
    riskLevel: "low",
    lastLogin: "Ontem",
  },
  {
    id: "1012",
    name: "Camila Rodrigues",
    email: "camila.rodrigues@example.com",
    program: "Engenharia de Software",
    attendance: 94,
    assignmentCompletion: 96,
    averageGrade: 90,
    riskLevel: "low",
    lastLogin: "Hoje",
  },
  {
    id: "1013",
    name: "Bruno Oliveira",
    email: "bruno.oliveira@example.com",
    program: "Ciência de Dados",
    attendance: 68,
    assignmentCompletion: 60,
    averageGrade: 70,
    riskLevel: "high",
    lastLogin: "5 dias atrás",
  },
  {
    id: "1014",
    name: "Fernanda Lima",
    email: "fernanda.lima@example.com",
    program: "Sistemas de Informação",
    attendance: 82,
    assignmentCompletion: 78,
    averageGrade: 80,
    riskLevel: "medium",
    lastLogin: "2 dias atrás",
  },
  {
    id: "1015",
    name: "Gustavo Santos",
    email: "gustavo.santos@example.com",
    program: "Engenharia da Computação",
    attendance: 88,
    assignmentCompletion: 84,
    averageGrade: 83,
    riskLevel: "low",
    lastLogin: "Ontem",
  },
]

export async function GET(request: Request) {
  // Obtém parâmetros da URL
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  const program = searchParams.get("program")
  const riskLevel = searchParams.get("riskLevel")

  // Filtra alunos com base nos parâmetros
  let filteredStudents = [...students]

  if (id) {
    filteredStudents = filteredStudents.filter((student) => student.id === id)
  }

  if (program) {
    filteredStudents = filteredStudents.filter((student) =>
      student.program.toLowerCase().includes(program.toLowerCase()),
    )
  }

  if (riskLevel) {
    filteredStudents = filteredStudents.filter((student) => student.riskLevel === riskLevel)
  }

  // Simula atraso da API
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json(filteredStudents)
}
