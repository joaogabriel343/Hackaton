// Este arquivo simula chamadas de API para um backend Moodle
// Em uma aplicação real, estas seriam chamadas de API reais para sua instância Moodle

import { generateAIAnalysis } from "./ai"

// Dados de exemplo de alunos
const students = [
  {
    id: "1001",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "(555) 123-4567",
    program: "Ciência da Computação",
    yearLevel: "3º Ano",
    enrollmentDate: "1 Set, 2022",
    creditsCompleted: 68,
    academicStanding: "Boa Situação",
    advisor: "Dra. Sarah Chen",
    attendance: 65,
    assignmentCompletion: 58,
    averageGrade: 72,
    riskLevel: "high",
    lastLogin: "3 dias atrás",
    courses: [
      {
        id: 1,
        name: "Introdução à Ciência da Computação",
        code: "CS101",
        instructor: "Dr. James Wilson",
        credits: 3,
        schedule: "Seg/Qua 10:00",
        grade: 78,
        lastActivity: "2 dias atrás",
      },
      {
        id: 2,
        name: "Estruturas de Dados e Algoritmos",
        code: "CS201",
        instructor: "Dra. Emily Rodriguez",
        credits: 4,
        schedule: "Ter/Qui 13:00",
        grade: 65,
        lastActivity: "5 dias atrás",
      },
      {
        id: 3,
        name: "Sistemas de Banco de Dados",
        code: "CS301",
        instructor: "Dr. Michael Brown",
        credits: 3,
        schedule: "Qua/Sex 15:00",
        grade: 58,
        lastActivity: "1 semana atrás",
      },
      {
        id: 4,
        name: "Desenvolvimento Web",
        code: "CS401",
        instructor: "Profa. Lisa Zhang",
        credits: 3,
        schedule: "Seg/Sex 9:00",
        grade: 72,
        lastActivity: "3 dias atrás",
      },
    ],
  },
  {
    id: "1002",
    name: "Samantha Lee",
    email: "samantha.lee@example.com",
    phone: "(555) 234-5678",
    program: "Ciência da Computação",
    yearLevel: "2º Ano",
    enrollmentDate: "1 Set, 2023",
    creditsCompleted: 32,
    academicStanding: "Boa Situação",
    advisor: "Dr. Robert Johnson",
    attendance: 78,
    assignmentCompletion: 82,
    averageGrade: 76,
    riskLevel: "medium",
    lastLogin: "Ontem",
    courses: [
      {
        id: 1,
        name: "Introdução à Ciência da Computação",
        code: "CS101",
        instructor: "Dr. James Wilson",
        credits: 3,
        schedule: "Seg/Qua 10:00",
        grade: 85,
        lastActivity: "Ontem",
      },
      {
        id: 2,
        name: "Estruturas de Dados e Algoritmos",
        code: "CS201",
        instructor: "Dra. Emily Rodriguez",
        credits: 4,
        schedule: "Ter/Qui 13:00",
        grade: 72,
        lastActivity: "2 dias atrás",
      },
      {
        id: 5,
        name: "Redes de Computadores",
        code: "CS202",
        instructor: "Dr. David Kim",
        credits: 3,
        schedule: "Ter/Qui 15:00",
        grade: 78,
        lastActivity: "Ontem",
      },
      {
        id: 6,
        name: "Engenharia de Software",
        code: "CS203",
        instructor: "Profa. Jennifer Park",
        credits: 3,
        schedule: "Qua/Sex 11:00",
        grade: 68,
        lastActivity: "3 dias atrás",
      },
    ],
  },
  {
    id: "1003",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    phone: "(555) 345-6789",
    program: "Engenharia da Computação",
    yearLevel: "4º Ano",
    enrollmentDate: "1 Set, 2021",
    creditsCompleted: 98,
    academicStanding: "Lista do Reitor",
    advisor: "Dra. Lisa Thompson",
    attendance: 92,
    assignmentCompletion: 95,
    averageGrade: 88,
    riskLevel: "low",
    lastLogin: "Hoje",
    courses: [
      {
        id: 7,
        name: "Algoritmos Avançados",
        code: "CS401",
        instructor: "Dr. Thomas Lee",
        credits: 4,
        schedule: "Seg/Qua 14:00",
        grade: 92,
        lastActivity: "Hoje",
      },
      {
        id: 8,
        name: "Aprendizado de Máquina",
        code: "CS402",
        instructor: "Dra. Maria Garcia",
        credits: 4,
        schedule: "Ter/Qui 10:00",
        grade: 88,
        lastActivity: "Ontem",
      },
      {
        id: 9,
        name: "Computação Gráfica",
        code: "CS403",
        instructor: "Prof. John Smith",
        credits: 3,
        schedule: "Qua/Sex 13:00",
        grade: 85,
        lastActivity: "2 dias atrás",
      },
      {
        id: 10,
        name: "Projeto Final",
        code: "CS499",
        instructor: "Dr. Robert Johnson",
        credits: 4,
        schedule: "Sex 15:00",
        grade: 90,
        lastActivity: "Hoje",
      },
    ],
  },
  {
    id: "1004",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@example.com",
    phone: "(555) 456-7890",
    program: "Ciência de Dados",
    yearLevel: "3º Ano",
    enrollmentDate: "1 Set, 2022",
    creditsCompleted: 64,
    academicStanding: "Boa Situação",
    advisor: "Dr. Michael Brown",
    attendance: 88,
    assignmentCompletion: 75,
    averageGrade: 82,
    riskLevel: "low",
    lastLogin: "Ontem",
    courses: [
      {
        id: 11,
        name: "Métodos Estatísticos",
        code: "DS301",
        instructor: "Dra. Sarah Chen",
        credits: 3,
        schedule: "Seg/Qua 11:00",
        grade: 85,
        lastActivity: "Ontem",
      },
      {
        id: 12,
        name: "Mineração de Dados",
        code: "DS302",
        instructor: "Dr. James Wilson",
        credits: 4,
        schedule: "Ter/Qui 14:00",
        grade: 78,
        lastActivity: "3 dias atrás",
      },
      {
        id: 13,
        name: "Análise de Big Data",
        code: "DS303",
        instructor: "Profa. Lisa Zhang",
        credits: 3,
        schedule: "Qua/Sex 9:00",
        grade: 80,
        lastActivity: "2 dias atrás",
      },
      {
        id: 14,
        name: "Aprendizado de Máquina para Ciência de Dados",
        code: "DS304",
        instructor: "Dr. Thomas Lee",
        credits: 4,
        schedule: "Seg/Sex 13:00",
        grade: 85,
        lastActivity: "Ontem",
      },
    ],
  },
  {
    id: "1005",
    name: "David Kim",
    email: "david.kim@example.com",
    phone: "(555) 567-8901",
    program: "Ciência da Computação",
    yearLevel: "1º Ano",
    enrollmentDate: "1 Set, 2024",
    creditsCompleted: 15,
    academicStanding: "Boa Situação",
    advisor: "Dra. Emily Rodriguez",
    attendance: 70,
    assignmentCompletion: 68,
    averageGrade: 74,
    riskLevel: "medium",
    lastLogin: "4 dias atrás",
    courses: [
      {
        id: 1,
        name: "Introdução à Ciência da Computação",
        code: "CS101",
        instructor: "Dr. James Wilson",
        credits: 3,
        schedule: "Seg/Qua 10:00",
        grade: 72,
        lastActivity: "5 dias atrás",
      },
      {
        id: 15,
        name: "Cálculo I",
        code: "MATH101",
        instructor: "Dra. Sarah Chen",
        credits: 4,
        schedule: "Ter/Qui 9:00",
        grade: 68,
        lastActivity: "4 dias atrás",
      },
      {
        id: 16,
        name: "Introdução à Programação",
        code: "CS102",
        instructor: "Prof. John Smith",
        credits: 3,
        schedule: "Qua/Sex 14:00",
        grade: 75,
        lastActivity: "3 dias atrás",
      },
      {
        id: 17,
        name: "Design de Lógica Digital",
        code: "CS103",
        instructor: "Dra. Lisa Thompson",
        credits: 3,
        schedule: "Seg/Sex 11:00",
        grade: 80,
        lastActivity: "1 semana atrás",
      },
    ],
  },
  // Novos alunos adicionados
  {
    id: "1006",
    name: "Ana Silva",
    email: "ana.silva@example.com",
    phone: "(555) 678-9012",
    program: "Engenharia de Software",
    yearLevel: "2º Ano",
    enrollmentDate: "1 Set, 2023",
    creditsCompleted: 35,
    academicStanding: "Boa Situação",
    advisor: "Dr. Carlos Mendes",
    attendance: 62,
    assignmentCompletion: 55,
    averageGrade: 68,
    riskLevel: "high",
    lastLogin: "5 dias atrás",
    courses: [
      {
        id: 18,
        name: "Programação Orientada a Objetos",
        code: "CS204",
        instructor: "Dr. Paulo Santos",
        credits: 4,
        schedule: "Seg/Qua 13:00",
        grade: 65,
        lastActivity: "6 dias atrás",
      },
      {
        id: 19,
        name: "Desenvolvimento Ágil",
        code: "SE201",
        instructor: "Profa. Carla Oliveira",
        credits: 3,
        schedule: "Ter/Qui 10:00",
        grade: 62,
        lastActivity: "1 semana atrás",
      },
      {
        id: 20,
        name: "Arquitetura de Software",
        code: "SE202",
        instructor: "Dr. Ricardo Almeida",
        credits: 3,
        schedule: "Qua/Sex 15:00",
        grade: 70,
        lastActivity: "4 dias atrás",
      },
      {
        id: 21,
        name: "Interação Humano-Computador",
        code: "SE203",
        instructor: "Dra. Mariana Costa",
        credits: 3,
        schedule: "Seg/Sex 8:00",
        grade: 75,
        lastActivity: "5 dias atrás",
      },
    ],
  },
  {
    id: "1007",
    name: "Pedro Oliveira",
    email: "pedro.oliveira@example.com",
    phone: "(555) 789-0123",
    program: "Sistemas de Informação",
    yearLevel: "3º Ano",
    enrollmentDate: "1 Set, 2022",
    creditsCompleted: 70,
    academicStanding: "Boa Situação",
    advisor: "Dra. Fernanda Lima",
    attendance: 85,
    assignmentCompletion: 80,
    averageGrade: 78,
    riskLevel: "medium",
    lastLogin: "2 dias atrás",
    courses: [
      {
        id: 22,
        name: "Gestão de Projetos de TI",
        code: "SI301",
        instructor: "Dr. Marcos Pereira",
        credits: 3,
        schedule: "Seg/Qua 9:00",
        grade: 82,
        lastActivity: "2 dias atrás",
      },
      {
        id: 23,
        name: "Segurança da Informação",
        code: "SI302",
        instructor: "Dr. Rafael Souza",
        credits: 4,
        schedule: "Ter/Qui 14:00",
        grade: 75,
        lastActivity: "3 dias atrás",
      },
      {
        id: 24,
        name: "Sistemas Distribuídos",
        code: "SI303",
        instructor: "Profa. Juliana Ferreira",
        credits: 3,
        schedule: "Qua/Sex 10:00",
        grade: 78,
        lastActivity: "Ontem",
      },
      {
        id: 25,
        name: "Inteligência de Negócios",
        code: "SI304",
        instructor: "Dr. André Santos",
        credits: 3,
        schedule: "Seg/Sex 15:00",
        grade: 76,
        lastActivity: "2 dias atrás",
      },
    ],
  },
  {
    id: "1008",
    name: "Juliana Santos",
    email: "juliana.santos@example.com",
    phone: "(555) 890-1234",
    program: "Ciência de Dados",
    yearLevel: "4º Ano",
    enrollmentDate: "1 Set, 2021",
    creditsCompleted: 95,
    academicStanding: "Lista do Reitor",
    advisor: "Dr. Roberto Alves",
    attendance: 95,
    assignmentCompletion: 98,
    averageGrade: 92,
    riskLevel: "low",
    lastLogin: "Hoje",
    courses: [
      {
        id: 26,
        name: "Visualização de Dados",
        code: "DS401",
        instructor: "Dra. Camila Rocha",
        credits: 3,
        schedule: "Seg/Qua 11:00",
        grade: 95,
        lastActivity: "Hoje",
      },
      {
        id: 27,
        name: "Aprendizado Profundo",
        code: "DS402",
        instructor: "Dr. Lucas Martins",
        credits: 4,
        schedule: "Ter/Qui 13:00",
        grade: 90,
        lastActivity: "Ontem",
      },
      {
        id: 28,
        name: "Processamento de Linguagem Natural",
        code: "DS403",
        instructor: "Profa. Beatriz Lima",
        credits: 3,
        schedule: "Qua/Sex 14:00",
        grade: 93,
        lastActivity: "Hoje",
      },
      {
        id: 29,
        name: "Projeto de Ciência de Dados",
        code: "DS499",
        instructor: "Dr. Gustavo Pereira",
        credits: 4,
        schedule: "Sex 10:00",
        grade: 94,
        lastActivity: "Ontem",
      },
    ],
  },
  {
    id: "1009",
    name: "Lucas Ferreira",
    email: "lucas.ferreira@example.com",
    phone: "(555) 901-2345",
    program: "Engenharia da Computação",
    yearLevel: "1º Ano",
    enrollmentDate: "1 Set, 2024",
    creditsCompleted: 12,
    academicStanding: "Boa Situação",
    advisor: "Dra. Carolina Silva",
    attendance: 60,
    assignmentCompletion: 65,
    averageGrade: 71,
    riskLevel: "high",
    lastLogin: "6 dias atrás",
    courses: [
      {
        id: 1,
        name: "Introdução à Ciência da Computação",
        code: "CS101",
        instructor: "Dr. James Wilson",
        credits: 3,
        schedule: "Seg/Qua 10:00",
        grade: 68,
        lastActivity: "1 semana atrás",
      },
      {
        id: 15,
        name: "Cálculo I",
        code: "MATH101",
        instructor: "Dra. Sarah Chen",
        credits: 4,
        schedule: "Ter/Qui 9:00",
        grade: 65,
        lastActivity: "6 dias atrás",
      },
      {
        id: 30,
        name: "Física I",
        code: "PHYS101",
        instructor: "Dr. Eduardo Costa",
        credits: 4,
        schedule: "Ter/Qui 15:00",
        grade: 72,
        lastActivity: "5 dias atrás",
      },
      {
        id: 31,
        name: "Introdução à Engenharia",
        code: "ENG101",
        instructor: "Prof. Henrique Dias",
        credits: 2,
        schedule: "Sex 13:00",
        grade: 78,
        lastActivity: "4 dias atrás",
      },
    ],
  },
  {
    id: "1010",
    name: "Mariana Costa",
    email: "mariana.costa@example.com",
    phone: "(555) 012-3456",
    program: "Sistemas de Informação",
    yearLevel: "2º Ano",
    enrollmentDate: "1 Set, 2023",
    creditsCompleted: 38,
    academicStanding: "Boa Situação",
    advisor: "Dr. Felipe Martins",
    attendance: 75,
    assignmentCompletion: 72,
    averageGrade: 76,
    riskLevel: "medium",
    lastLogin: "3 dias atrás",
    courses: [
      {
        id: 32,
        name: "Banco de Dados I",
        code: "SI201",
        instructor: "Dra. Patrícia Alves",
        credits: 4,
        schedule: "Seg/Qua 14:00",
        grade: 78,
        lastActivity: "3 dias atrás",
      },
      {
        id: 33,
        name: "Análise de Sistemas",
        code: "SI202",
        instructor: "Dr. Thiago Rocha",
        credits: 3,
        schedule: "Ter/Qui 11:00",
        grade: 75,
        lastActivity: "4 dias atrás",
      },
      {
        id: 34,
        name: "Programação Web",
        code: "SI203",
        instructor: "Profa. Renata Oliveira",
        credits: 3,
        schedule: "Qua/Sex 9:00",
        grade: 80,
        lastActivity: "2 dias atrás",
      },
      {
        id: 35,
        name: "Gestão da Informação",
        code: "SI204",
        instructor: "Dr. Bruno Santos",
        credits: 3,
        schedule: "Seg/Sex 16:00",
        grade: 72,
        lastActivity: "3 dias atrás",
      },
    ],
  },
  {
    id: "1011",
    name: "Rafael Almeida",
    email: "rafael.almeida@example.com",
    phone: "(555) 123-4567",
    program: "Ciência da Computação",
    yearLevel: "3º Ano",
    enrollmentDate: "1 Set, 2022",
    creditsCompleted: 65,
    academicStanding: "Boa Situação",
    advisor: "Dr. Marcelo Lima",
    attendance: 90,
    assignmentCompletion: 85,
    averageGrade: 84,
    riskLevel: "low",
    lastLogin: "Ontem",
    courses: [
      {
        id: 36,
        name: "Compiladores",
        code: "CS301",
        instructor: "Dr. Victor Pereira",
        credits: 4,
        schedule: "Seg/Qua 10:00",
        grade: 88,
        lastActivity: "Ontem",
      },
      {
        id: 37,
        name: "Inteligência Artificial",
        code: "CS302",
        instructor: "Dra. Cristina Oliveira",
        credits: 4,
        schedule: "Ter/Qui 13:00",
        grade: 85,
        lastActivity: "2 dias atrás",
      },
      {
        id: 38,
        name: "Sistemas Operacionais",
        code: "CS303",
        instructor: "Prof. Leonardo Silva",
        credits: 3,
        schedule: "Qua/Sex 15:00",
        grade: 82,
        lastActivity: "Ontem",
      },
      {
        id: 39,
        name: "Computação em Nuvem",
        code: "CS304",
        instructor: "Dra. Amanda Santos",
        credits: 3,
        schedule: "Seg/Sex 14:00",
        grade: 80,
        lastActivity: "3 dias atrás",
      },
    ],
  },
  {
    id: "1012",
    name: "Camila Rodrigues",
    email: "camila.rodrigues@example.com",
    phone: "(555) 234-5678",
    program: "Engenharia de Software",
    yearLevel: "4º Ano",
    enrollmentDate: "1 Set, 2021",
    creditsCompleted: 102,
    academicStanding: "Lista do Reitor",
    advisor: "Dra. Vanessa Martins",
    attendance: 94,
    assignmentCompletion: 96,
    averageGrade: 90,
    riskLevel: "low",
    lastLogin: "Hoje",
    courses: [
      {
        id: 40,
        name: "Qualidade de Software",
        code: "SE401",
        instructor: "Dr. Rodrigo Alves",
        credits: 3,
        schedule: "Seg/Qua 9:00",
        grade: 92,
        lastActivity: "Hoje",
      },
      {
        id: 41,
        name: "DevOps",
        code: "SE402",
        instructor: "Prof. Daniel Costa",
        credits: 3,
        schedule: "Ter/Qui 14:00",
        grade: 88,
        lastActivity: "Ontem",
      },
      {
        id: 42,
        name: "Arquiteturas Avançadas",
        code: "SE403",
        instructor: "Dra. Luciana Ferreira",
        credits: 4,
        schedule: "Qua/Sex 11:00",
        grade: 91,
        lastActivity: "Hoje",
      },
      {
        id: 43,
        name: "Projeto Final de Engenharia",
        code: "SE499",
        instructor: "Dr. Gustavo Santos",
        credits: 5,
        schedule: "Sex 14:00",
        grade: 93,
        lastActivity: "Ontem",
      },
    ],
  },
  {
    id: "1013",
    name: "Bruno Oliveira",
    email: "bruno.oliveira@example.com",
    phone: "(555) 345-6789",
    program: "Ciência de Dados",
    yearLevel: "1º Ano",
    enrollmentDate: "1 Set, 2024",
    creditsCompleted: 14,
    academicStanding: "Boa Situação",
    advisor: "Dr. Ricardo Pereira",
    attendance: 68,
    assignmentCompletion: 60,
    averageGrade: 70,
    riskLevel: "high",
    lastLogin: "5 dias atrás",
    courses: [
      {
        id: 44,
        name: "Introdução à Ciência de Dados",
        code: "DS101",
        instructor: "Dra. Fernanda Costa",
        credits: 3,
        schedule: "Seg/Qua 11:00",
        grade: 65,
        lastActivity: "1 semana atrás",
      },
      {
        id: 45,
        name: "Estatística Básica",
        code: "STAT101",
        instructor: "Dr. Paulo Martins",
        credits: 4,
        schedule: "Ter/Qui 9:00",
        grade: 68,
        lastActivity: "5 dias atrás",
      },
      {
        id: 46,
        name: "Programação em Python",
        code: "DS102",
        instructor: "Profa. Carla Silva",
        credits: 3,
        schedule: "Qua/Sex 13:00",
        grade: 72,
        lastActivity: "6 dias atrás",
      },
      {
        id: 47,
        name: "Matemática para Ciência de Dados",
        code: "MATH201",
        instructor: "Dr. André Lima",
        credits: 4,
        schedule: "Seg/Sex 15:00",
        grade: 67,
        lastActivity: "4 dias atrás",
      },
    ],
  },
  {
    id: "1014",
    name: "Fernanda Lima",
    email: "fernanda.lima@example.com",
    phone: "(555) 456-7890",
    program: "Sistemas de Informação",
    yearLevel: "2º Ano",
    enrollmentDate: "1 Set, 2023",
    creditsCompleted: 40,
    academicStanding: "Boa Situação",
    advisor: "Dr. Marcos Oliveira",
    attendance: 82,
    assignmentCompletion: 78,
    averageGrade: 80,
    riskLevel: "medium",
    lastLogin: "2 dias atrás",
    courses: [
      {
        id: 48,
        name: "Redes de Computadores",
        code: "SI205",
        instructor: "Dr. Lucas Ferreira",
        credits: 3,
        schedule: "Seg/Qua 13:00",
        grade: 85,
        lastActivity: "2 dias atrás",
      },
      {
        id: 49,
        name: "Engenharia de Requisitos",
        code: "SI206",
        instructor: "Profa. Mariana Alves",
        credits: 3,
        schedule: "Ter/Qui 10:00",
        grade: 78,
        lastActivity: "3 dias atrás",
      },
      {
        id: 50,
        name: "Sistemas Empresariais",
        code: "SI207",
        instructor: "Dr. Roberto Santos",
        credits: 4,
        schedule: "Qua/Sex 14:00",
        grade: 75,
        lastActivity: "Ontem",
      },
      {
        id: 51,
        name: "Ética em TI",
        code: "SI208",
        instructor: "Dra. Juliana Costa",
        credits: 2,
        schedule: "Sex 9:00",
        grade: 82,
        lastActivity: "2 dias atrás",
      },
    ],
  },
  {
    id: "1015",
    name: "Gustavo Santos",
    email: "gustavo.santos@example.com",
    phone: "(555) 567-8901",
    program: "Engenharia da Computação",
    yearLevel: "3º Ano",
    enrollmentDate: "1 Set, 2022",
    creditsCompleted: 72,
    academicStanding: "Boa Situação",
    advisor: "Dra. Patrícia Oliveira",
    attendance: 88,
    assignmentCompletion: 84,
    averageGrade: 83,
    riskLevel: "low",
    lastLogin: "Ontem",
    courses: [
      {
        id: 52,
        name: "Microprocessadores",
        code: "EC301",
        instructor: "Dr. Felipe Costa",
        credits: 4,
        schedule: "Seg/Qua 10:00",
        grade: 85,
        lastActivity: "Ontem",
      },
      {
        id: 53,
        name: "Sistemas Embarcados",
        code: "EC302",
        instructor: "Prof. Rafael Silva",
        credits: 4,
        schedule: "Ter/Qui 13:00",
        grade: 80,
        lastActivity: "2 dias atrás",
      },
      {
        id: 54,
        name: "Processamento Digital de Sinais",
        code: "EC303",
        instructor: "Dra. Carolina Martins",
        credits: 3,
        schedule: "Qua/Sex 15:00",
        grade: 82,
        lastActivity: "Ontem",
      },
      {
        id: 55,
        name: "Robótica",
        code: "EC304",
        instructor: "Dr. Thiago Almeida",
        credits: 3,
        schedule: "Seg/Sex 14:00",
        grade: 86,
        lastActivity: "3 dias atrás",
      },
    ],
  },
  // Adicionando mais alunos para chegar a aproximadamente 70
  {
    id: "1016",
    name: "Isabela Martins",
    email: "isabela.martins@example.com",
    phone: "(555) 678-9012",
    program: "Ciência da Computação",
    yearLevel: "2º Ano",
    enrollmentDate: "1 Set, 2023",
    creditsCompleted: 42,
    academicStanding: "Boa Situação",
    advisor: "Dr. Carlos Mendes",
    attendance: 78,
    assignmentCompletion: 75,
    averageGrade: 79,
    riskLevel: "low",
    lastLogin: "Hoje",
    courses: [
      {
        id: 1,
        name: "Introdução à Ciência da Computação",
        code: "CS101",
        instructor: "Dr. James Wilson",
        credits: 3,
        schedule: "Seg/Qua 10:00",
        grade: 82,
        lastActivity: "Hoje",
      },
      {
        id: 2,
        name: "Estruturas de Dados e Algoritmos",
        code: "CS201",
        instructor: "Dra. Emily Rodriguez",
        credits: 4,
        schedule: "Ter/Qui 13:00",
        grade: 78,
        lastActivity: "Ontem",
      },
      {
        id: 5,
        name: "Redes de Computadores",
        code: "CS202",
        instructor: "Dr. David Kim",
        credits: 3,
        schedule: "Ter/Qui 15:00",
        grade: 80,
        lastActivity: "Hoje",
      },
    ],
  },
  {
    id: "1017",
    name: "Thiago Mendes",
    email: "thiago.mendes@example.com",
    phone: "(555) 789-0123",
    program: "Engenharia de Software",
    yearLevel: "3º Ano",
    enrollmentDate: "1 Set, 2022",
    creditsCompleted: 68,
    academicStanding: "Boa Situação",
    advisor: "Dra. Mariana Costa",
    attendance: 82,
    assignmentCompletion: 80,
    averageGrade: 81,
    riskLevel: "medium",
    lastLogin: "3 dias atrás",
    courses: [
      {
        id: 18,
        name: "Programação Orientada a Objetos",
        code: "CS204",
        instructor: "Dr. Paulo Santos",
        credits: 4,
        schedule: "Seg/Qua 13:00",
        grade: 83,
        lastActivity: "3 dias atrás",
      },
      {
        id: 19,
        name: "Desenvolvimento Ágil",
        code: "SE201",
        instructor: "Profa. Carla Oliveira",
        credits: 3,
        schedule: "Ter/Qui 10:00",
        grade: 79,
        lastActivity: "4 dias atrás",
      },
      {
        id: 20,
        name: "Arquitetura de Software",
        code: "SE202",
        instructor: "Dr. Ricardo Almeida",
        credits: 3,
        schedule: "Qua/Sex 15:00",
        grade: 82,
        lastActivity: "2 dias atrás",
      },
    ],
  },
  {
    id: "1018",
    name: "Carla Pereira",
    email: "carla.pereira@example.com",
    phone: "(555) 890-1234",
    program: "Ciência de Dados",
    yearLevel: "1º Ano",
    enrollmentDate: "1 Set, 2024",
    creditsCompleted: 18,
    academicStanding: "Boa Situação",
    advisor: "Dr. Roberto Alves",
    attendance: 70,
    assignmentCompletion: 65,
    averageGrade: 72,
    riskLevel: "high",
    lastLogin: "6 dias atrás",
    courses: [
      {
        id: 44,
        name: "Introdução à Ciência de Dados",
        code: "DS101",
        instructor: "Dra. Fernanda Costa",
        credits: 3,
        schedule: "Seg/Qua 11:00",
        grade: 70,
        lastActivity: "1 semana atrás",
      },
      {
        id: 45,
        name: "Estatística Básica",
        code: "STAT101",
        instructor: "Dr. Paulo Martins",
        credits: 4,
        schedule: "Ter/Qui 9:00",
        grade: 72,
        lastActivity: "6 dias atrás",
      },
      {
        id: 46,
        name: "Programação em Python",
        code: "DS102",
        instructor: "Profa. Carla Silva",
        credits: 3,
        schedule: "Qua/Sex 13:00",
        grade: 74,
        lastActivity: "5 dias atrás",
      },
    ],
  },
  {
    id: "1019",
    name: "Roberto Souza",
    email: "roberto.souza@example.com",
    phone: "(555) 901-2345",
    program: "Sistemas de Informação",
    yearLevel: "4º Ano",
    enrollmentDate: "1 Set, 2021",
    creditsCompleted: 98,
    academicStanding: "Lista do Reitor",
    advisor: "Dr. Felipe Martins",
    attendance: 92,
    assignmentCompletion: 90,
    averageGrade: 88,
    riskLevel: "low",
    lastLogin: "Hoje",
    courses: [
      {
        id: 48,
        name: "Redes de Computadores",
        code: "SI205",
        instructor: "Dr. Lucas Ferreira",
        credits: 3,
        schedule: "Seg/Qua 13:00",
        grade: 90,
        lastActivity: "Hoje",
      },
      {
        id: 49,
        name: "Engenharia de Requisitos",
        code: "SI206",
        instructor: "Profa. Mariana Alves",
        credits: 3,
        schedule: "Ter/Qui 10:00",
        grade: 88,
        lastActivity: "Ontem",
      },
      {
        id: 50,
        name: "Sistemas Empresariais",
        code: "SI207",
        instructor: "Dr. Roberto Santos",
        credits: 4,
        schedule: "Qua/Sex 14:00",
        grade: 86,
        lastActivity: "Hoje",
      },
    ],
  },
  {
    id: "1020",
    name: "Patrícia Alves",
    email: "patricia.alves@example.com",
    phone: "(555) 012-3456",
    program: "Engenharia da Computação",
    yearLevel: "2º Ano",
    enrollmentDate: "1 Set, 2023",
    creditsCompleted: 45,
    academicStanding: "Boa Situação",
    advisor: "Dra. Carolina Silva",
    attendance: 85,
    assignmentCompletion: 82,
    averageGrade: 84,
    riskLevel: "medium",
    lastLogin: "4 dias atrás",
    courses: [
      {
        id: 52,
        name: "Microprocessadores",
        code: "EC301",
        instructor: "Dr. Felipe Costa",
        credits: 4,
        schedule: "Seg/Qua 10:00",
        grade: 86,
        lastActivity: "4 dias atrás",
      },
      {
        id: 53,
        name: "Sistemas Embarcados",
        code: "EC302",
        instructor: "Prof. Rafael Silva",
        credits: 4,
        schedule: "Ter/Qui 13:00",
        grade: 82,
        lastActivity: "5 dias atrás",
      },
      {
        id: 30,
        name: "Física I",
        code: "PHYS101",
        instructor: "Dr. Eduardo Costa",
        credits: 4,
        schedule: "Ter/Qui 15:00",
        grade: 84,
        lastActivity: "3 dias atrás",
      },
    ],
  },
  {
    id: "1021",
    name: "Marcos Oliveira",
    email: "marcos.oliveira@example.com",
    phone: "(555) 123-4567",
    program: "Ciência da Computação",
    yearLevel: "1º Ano",
    enrollmentDate: "1 Set, 2024",
    creditsCompleted: 16,
    academicStanding: "Boa Situação",
    advisor: "Dr. James Wilson",
    attendance: 75,
    assignmentCompletion: 70,
    averageGrade: 76,
    riskLevel: "high",
    lastLogin: "7 dias atrás",
    courses: [
      {
        id: 1,
        name: "Introdução à Ciência da Computação",
        code: "CS101",
        instructor: "Dr. James Wilson",
        credits: 3,
        schedule: "Seg/Qua 10:00",
        grade: 78,
        lastActivity: "1 semana atrás",
      },
      {
        id: 15,
        name: "Cálculo I",
        code: "MATH101",
        instructor: "Dra. Sarah Chen",
        credits: 4,
        schedule: "Ter/Qui 9:00",
        grade: 74,
        lastActivity: "7 dias atrás",
      },
      {
        id: 16,
        name: "Introdução à Programação",
        code: "CS102",
        instructor: "Prof. John Smith",
        credits: 3,
        schedule: "Qua/Sex 14:00",
        grade: 76,
        lastActivity: "8 dias atrás",
      },
    ],
  },
  {
    id: "1022",
    name: "Beatriz Santos",
    email: "beatriz.santos@example.com",
    phone: "(555) 234-5678",
    program: "Ciência de Dados",
    yearLevel: "3º Ano",
    enrollmentDate: "1 Set, 2022",
    creditsCompleted: 70,
    academicStanding: "Boa Situação",
    advisor: "Dra. Fernanda Costa",
    attendance: 88,
    assignmentCompletion: 85,
    averageGrade: 86,
    riskLevel: "low",
    lastLogin: "Ontem",
    courses: [
      {
        id: 11,
        name: "Métodos Estatísticos",
        code: "DS301",
        instructor: "Dra. Sarah Chen",
        credits: 3,
        schedule: "Seg/Qua 11:00",
        grade: 88,
        lastActivity: "Ontem",
      },
      {
        id: 12,
        name: "Mineração de Dados",
        code: "DS302",
        instructor: "Dr. James Wilson",
        credits: 4,
        schedule: "Ter/Qui 14:00",
        grade: 85,
        lastActivity: "2 dias atrás",
      },
      {
        id: 13,
        name: "Análise de Big Data",
        code: "DS303",
        instructor: "Profa. Lisa Zhang",
        credits: 3,
        schedule: "Qua/Sex 9:00",
        grade: 84,
        lastActivity: "Ontem",
      },
    ],
  },
  {
    id: "1023",
    name: "Leonardo Costa",
    email: "leonardo.costa@example.com",
    phone: "(555) 345-6789",
    program: "Engenharia de Software",
    yearLevel: "4º Ano",
    enrollmentDate: "1 Set, 2021",
    creditsCompleted: 105,
    academicStanding: "Lista do Reitor",
    advisor: "Dr. Carlos Mendes",
    attendance: 95,
    assignmentCompletion: 92,
    averageGrade: 91,
    riskLevel: "low",
    lastLogin: "Hoje",
    courses: [
      {
        id: 40,
        name: "Qualidade de Software",
        code: "SE401",
        instructor: "Dr. Rodrigo Alves",
        credits: 3,
        schedule: "Seg/Qua 9:00",
        grade: 93,
        lastActivity: "Hoje",
      },
      {
        id: 41,
        name: "DevOps",
        code: "SE402",
        instructor: "Prof. Daniel Costa",
        credits: 3,
        schedule: "Ter/Qui 14:00",
        grade: 90,
        lastActivity: "Hoje",
      },
      {
        id: 42,
        name: "Arquiteturas Avançadas",
        code: "SE403",
        instructor: "Dra. Luciana Ferreira",
        credits: 4,
        schedule: "Qua/Sex 11:00",
        grade: 92,
        lastActivity: "Ontem",
      },
    ],
  },
  {
    id: "1024",
    name: "Amanda Silva",
    email: "amanda.silva@example.com",
    phone: "(555) 456-7890",
    program: "Sistemas de Informação",
    yearLevel: "2º Ano",
    enrollmentDate: "1 Set, 2023",
    creditsCompleted: 36,
    academicStanding: "Boa Situação",
    advisor: "Dr. Marcos Oliveira",
    attendance: 80,
    assignmentCompletion: 75,
    averageGrade: 78,
    riskLevel: "medium",
    lastLogin: "3 dias atrás",
    courses: [
      {
        id: 32,
        name: "Banco de Dados I",
        code: "SI201",
        instructor: "Dra. Patrícia Alves",
        credits: 4,
        schedule: "Seg/Qua 14:00",
        grade: 80,
        lastActivity: "3 dias atrás",
      },
      {
        id: 33,
        name: "Análise de Sistemas",
        code: "SI202",
        instructor: "Dr. Thiago Rocha",
        credits: 3,
        schedule: "Ter/Qui 11:00",
        grade: 76,
        lastActivity: "4 dias atrás",
      },
      {
        id: 34,
        name: "Programação Web",
        code: "SI203",
        instructor: "Profa. Renata Oliveira",
        credits: 3,
        schedule: "Qua/Sex 9:00",
        grade: 78,
        lastActivity: "3 dias atrás",
      },
    ],
  },
  {
    id: "1025",
    name: "Ricardo Ferreira",
    email: "ricardo.ferreira@example.com",
    phone: "(555) 567-8901",
    program: "Engenharia da Computação",
    yearLevel: "1º Ano",
    enrollmentDate: "1 Set, 2024",
    creditsCompleted: 14,
    academicStanding: "Boa Situação",
    advisor: "Dra. Lisa Thompson",
    attendance: 65,
    assignmentCompletion: 60,
    averageGrade: 68,
    riskLevel: "high",
    lastLogin: "8 dias atrás",
    courses: [
      {
        id: 1,
        name: "Introdução à Ciência da Computação",
        code: "CS101",
        instructor: "Dr. James Wilson",
        credits: 3,
        schedule: "Seg/Qua 10:00",
        grade: 65,
        lastActivity: "10 dias atrás",
      },
      {
        id: 15,
        name: "Cálculo I",
        code: "MATH101",
        instructor: "Dra. Sarah Chen",
        credits: 4,
        schedule: "Ter/Qui 9:00",
        grade: 68,
        lastActivity: "8 dias atrás",
      },
      {
        id: 30,
        name: "Física I",
        code: "PHYS101",
        instructor: "Dr. Eduardo Costa",
        credits: 4,
        schedule: "Ter/Qui 15:00",
        grade: 70,
        lastActivity: "9 dias atrás",
      },
    ],
  },
  {
    id: "1026",
    name: "Juliana Oliveira",
    email: "juliana.oliveira@example.com",
    phone: "(555) 678-9012",
    program: "Ciência da Computação",
    yearLevel: "3º Ano",
    enrollmentDate: "1 Set, 2022",
    creditsCompleted: 72,
    academicStanding: "Boa Situação",
    advisor: "Dr. Robert Johnson",
    attendance: 85,
    assignmentCompletion: 82,
    averageGrade: 84,
    riskLevel: "low",
    lastLogin: "Hoje",
    courses: [
      {
        id: 36,
        name: "Compiladores",
        code: "CS301",
        instructor: "Dr. Victor Pereira",
        credits: 4,
        schedule: "Seg/Qua 10:00",
        grade: 86,
        lastActivity: "Hoje",
      },
      {
        id: 37,
        name: "Inteligência Artificial",
        code: "CS302",
        instructor: "Dra. Cristina Oliveira",
        credits: 4,
        schedule: "Ter/Qui 13:00",
        grade: 84,
        lastActivity: "Ontem",
      },
      {
        id: 38,
        name: "Sistemas Operacionais",
        code: "CS303",
        instructor: "Prof. Leonardo Silva",
        credits: 3,
        schedule: "Qua/Sex 15:00",
        grade: 82,
        lastActivity: "Hoje",
      },
    ],
  },
  {
    id: "1027",
    name: "Felipe Santos",
    email: "felipe.santos@example.com",
    phone: "(555) 789-0123",
    program: "Ciência de Dados",
    yearLevel: "2º Ano",
    enrollmentDate: "1 Set, 2023",
    creditsCompleted: 42,
    academicStanding: "Boa Situação",
    advisor: "Dr. Lucas Martins",
    attendance: 78,
    assignmentCompletion: 75,
    averageGrade: 76,
    riskLevel: "medium",
    lastLogin: "4 dias atrás",
    courses: [
      {
        id: 44,
        name: "Introdução à Ciência de Dados",
        code: "DS101",
        instructor: "Dra. Fernanda Costa",
        credits: 3,
        schedule: "Seg/Qua 11:00",
        grade: 78,
        lastActivity: "4 dias atrás",
      },
      {
        id: 45,
        name: "Estatística Básica",
        code: "STAT101",
        instructor: "Dr. Paulo Martins",
        credits: 4,
        schedule: "Ter/Qui 9:00",
        grade: 75,
        lastActivity: "5 dias atrás",
      },
      {
        id: 46,
        name: "Programação em Python",
        code: "DS102",
        instructor: "Profa. Carla Silva",
        credits: 3,
        schedule: "Qua/Sex 13:00",
        grade: 76,
        lastActivity: "3 dias atrás",
      },
    ],
  },
  {
    id: "1028",
    name: "Carolina Mendes",
    email: "carolina.mendes@example.com",
    phone: "(555) 890-1234",
    program: "Engenharia de Software",
    yearLevel: "4º Ano",
    enrollmentDate: "1 Set, 2021",
    creditsCompleted: 100,
    academicStanding: "Lista do Reitor",
    advisor: "Dra. Vanessa Martins",
    attendance: 92,
    assignmentCompletion: 90,
    averageGrade: 88,
    riskLevel: "low",
    lastLogin: "Ontem",
    courses: [
      {
        id: 40,
        name: "Qualidade de Software",
        code: "SE401",
        instructor: "Dr. Rodrigo Alves",
        credits: 3,
        schedule: "Seg/Qua 9:00",
        grade: 90,
        lastActivity: "Ontem",
      },
      {
        id: 41,
        name: "DevOps",
        code: "SE402",
        instructor: "Prof. Daniel Costa",
        credits: 3,
        schedule: "Ter/Qui 14:00",
        grade: 88,
        lastActivity: "2 dias atrás",
      },
      {
        id: 43,
        name: "Projeto Final de Engenharia",
        code: "SE499",
        instructor: "Dr. Gustavo Santos",
        credits: 5,
        schedule: "Sex 14:00",
        grade: 86,
        lastActivity: "Ontem",
      },
    ],
  },
  {
    id: "1029",
    name: "Daniel Alves",
    email: "daniel.alves@example.com",
    phone: "(555) 901-2345",
    program: "Sistemas de Informação",
    yearLevel: "1º Ano",
    enrollmentDate: "1 Set, 2024",
    creditsCompleted: 18,
    academicStanding: "Boa Situação",
    advisor: "Dr. Felipe Martins",
    attendance: 72,
    assignmentCompletion: 68,
    averageGrade: 74,
    riskLevel: "high",
    lastLogin: "6 dias atrás",
    courses: [
      {
        id: 32,
        name: "Banco de Dados I",
        code: "SI201",
        instructor: "Dra. Patrícia Alves",
        credits: 4,
        schedule: "Seg/Qua 14:00",
        grade: 76,
        lastActivity: "6 dias atrás",
      },
      {
        id: 33,
        name: "Análise de Sistemas",
        code: "SI202",
        instructor: "Dr. Thiago Rocha",
        credits: 3,
        schedule: "Ter/Qui 11:00",
        grade: 72,
        lastActivity: "7 dias atrás",
      },
      {
        id: 34,
        name: "Programação Web",
        code: "SI203",
        instructor: "Profa. Renata Oliveira",
        credits: 3,
        schedule: "Qua/Sex 9:00",
        grade: 74,
        lastActivity: "1 semana atrás",
      },
    ],
  },
  {
    id: "1030",
    name: "Renata Lima",
    email: "renata.lima@example.com",
    phone: "(555) 012-3456",
    program: "Ciência da Computação",
    yearLevel: "2º Ano",
    enrollmentDate: "1 Set, 2023",
    creditsCompleted: 40,
    academicStanding: "Boa Situação",
    advisor: "Dra. Emily Rodriguez",
    attendance: 80,
    assignmentCompletion: 78,
    averageGrade: 80,
    riskLevel: "medium",
    lastLogin: "3 dias atrás",
    courses: [
      {
        id: 1,
        name: "Introdução à Ciência da Computação",
        code: "CS101",
        instructor: "Dr. James Wilson",
        credits: 3,
        schedule: "Seg/Qua 10:00",
        grade: 82,
        lastActivity: "3 dias atrás",
      },
      {
        id: 2,
        name: "Estruturas de Dados e Algoritmos",
        code: "CS201",
        instructor: "Dra. Emily Rodriguez",
        credits: 4,
        schedule: "Ter/Qui 13:00",
        grade: 78,
        lastActivity: "4 dias atrás",
      },
      {
        id: 5,
        name: "Redes de Computadores",
        code: "CS202",
        instructor: "Dr. David Kim",
        credits: 3,
        schedule: "Ter/Qui 15:00",
        grade: 80,
        lastActivity: "2 dias atrás",
      },
    ],
  },
  // Continuando com mais alunos para chegar a 70
  {
    id: "1031",
    name: "Victor Rocha",
    email: "victor.rocha@example.com",
    phone: "(555) 123-4567",
    program: "Engenharia da Computação",
    yearLevel: "3º Ano",
    enrollmentDate: "1 Set, 2022",
    creditsCompleted: 68,
    academicStanding: "Boa Situação",
    advisor: "Dra. Carolina Silva",
    attendance: 85,
    assignmentCompletion: 82,
    averageGrade: 83,
    riskLevel: "low",
    lastLogin: "Hoje",
    courses: [
      {
        id: 52,
        name: "Microprocessadores",
        code: "EC301",
        instructor: "Dr. Felipe Costa",
        credits: 4,
        schedule: "Seg/Qua 10:00",
        grade: 85,
        lastActivity: "Hoje",
      },
      {
        id: 53,
        name: "Sistemas Embarcados",
        code: "EC302",
        instructor: "Prof. Rafael Silva",
        credits: 4,
        schedule: "Ter/Qui 13:00",
        grade: 82,
        lastActivity: "Ontem",
      },
      {
        id: 54,
        name: "Processamento Digital de Sinais",
        code: "EC303",
        instructor: "Dra. Carolina Martins",
        credits: 3,
        schedule: "Qua/Sex 15:00",
        grade: 83,
        lastActivity: "Hoje",
      },
    ],
  },
  {
    id: "1032",
    name: "Larissa Pereira",
    email: "larissa.pereira@example.com",
    phone: "(555) 234-5678",
    program: "Ciência de Dados",
    yearLevel: "4º Ano",
    enrollmentDate: "1 Set, 2021",
    creditsCompleted: 96,
    academicStanding: "Lista do Reitor",
    advisor: "Dr. Roberto Alves",
    attendance: 94,
    assignmentCompletion: 92,
    averageGrade: 90,
    riskLevel: "low",
    lastLogin: "Ontem",
    courses: [
      {
        id: 26,
        name: "Visualização de Dados",
        code: "DS401",
        instructor: "Dra. Camila Rocha",
        credits: 3,
        schedule: "Seg/Qua 11:00",
        grade: 92,
        lastActivity: "Ontem",
      },
      {
        id: 27,
        name: "Aprendizado Profundo",
        code: "DS402",
        instructor: "Dr. Lucas Martins",
        credits: 4,
        schedule: "Ter/Qui 13:00",
        grade: 90,
        lastActivity: "2 dias atrás",
      },
      {
        id: 28,
        name: "Processamento de Linguagem Natural",
        code: "DS403",
        instructor: "Profa. Beatriz Lima",
        credits: 3,
        schedule: "Qua/Sex 14:00",
        grade: 88,
        lastActivity: "Ontem",
      },
    ],
  },
  {
    id: "1033",
    name: "Gabriel Costa",
    email: "gabriel.costa@example.com",
    phone: "(555) 345-6789",
    program: "Engenharia de Software",
    yearLevel: "1º Ano",
    enrollmentDate: "1 Set, 2024",
    creditsCompleted: 16,
    academicStanding: "Boa Situação",
    advisor: "Dr. Carlos Mendes",
    attendance: 68,
    assignmentCompletion: 65,
    averageGrade: 70,
    riskLevel: "high",
    lastLogin: "7 dias atrás",
    courses: [
      {
        id: 18,
        name: "Programação Orientada a Objetos",
        code: "CS204",
        instructor: "Dr. Paulo Santos",
        credits: 4,
        schedule: "Seg/Qua 13:00",
        grade: 72,
        lastActivity: "7 dias atrás",
      },
      {
        id: 19,
        name: "Desenvolvimento Ágil",
        code: "SE201",
        instructor: "Profa. Carla Oliveira",
        credits: 3,
        schedule: "Ter/Qui 10:00",
        grade: 68,
        lastActivity: "8 dias atrás",
      },
      {
        id: 20,
        name: "Arquitetura de Software",
        code: "SE202",
        instructor: "Dr. Ricardo Almeida",
        credits: 3,
        schedule: "Qua/Sex 15:00",
        grade: 70,
        lastActivity: "6 dias atrás",
      },
    ],
  },
  {
    id: "1034",
    name: "Mariana Ribeiro",
    email: "mariana.ribeiro@example.com",
    phone: "(555) 456-7890",
    program: "Sistemas de Informação",
    yearLevel: "2º Ano",
    enrollmentDate: "1 Set, 2023",
    creditsCompleted: 38,
    academicStanding: "Boa Situação",
    advisor: "Dr. Marcos Oliveira",
    attendance: 78,
    assignmentCompletion: 75,
    averageGrade: 76,
    riskLevel: "medium",
    lastLogin: "4 dias atrás",
    courses: [
      {
        id: 32,
        name: "Banco de Dados I",
        code: "SI201",
        instructor: "Dra. Patrícia Alves",
        credits: 4,
        schedule: "Seg/Qua 14:00",
        grade: 78,
        lastActivity: "4 dias atrás",
      },
      {
        id: 33,
        name: "Análise de Sistemas",
        code: "SI202",
        instructor: "Dr. Thiago Rocha",
        credits: 3,
        schedule: "Ter/Qui 11:00",
        grade: 75,
        lastActivity: "5 dias atrás",
      },
      {
        id: 34,
        name: "Programação Web",
        code: "SI203",
        instructor: "Profa. Renata Oliveira",
        credits: 3,
        schedule: "Qua/Sex 9:00",
        grade: 76,
        lastActivity: "3 dias atrás",
      },
    ],
  },
  {
    id: "1035",
    name: "Rodrigo Martins",
    email: "rodrigo.martins@example.com",
    phone: "(555) 567-8901",
    program: "Ciência da Computação",
    yearLevel: "3º Ano",
    enrollmentDate: "1 Set, 2022",
    creditsCompleted: 70,
    academicStanding: "Boa Situação",
    advisor: "Dr. James Wilson",
    attendance: 88,
    assignmentCompletion: 85,
    averageGrade: 86,
    riskLevel: "low",
    lastLogin: "Hoje",
    courses: [
      {
        id: 36,
        name: "Compiladores",
        code: "CS301",
        instructor: "Dr. Victor Pereira",
        credits: 4,
        schedule: "Seg/Qua 10:00",
        grade: 88,
        lastActivity: "Hoje",
      },
      {
        id: 37,
        name: "Inteligência Artificial",
        code: "CS302",
        instructor: "Dra. Cristina Oliveira",
        credits: 4,
        schedule: "Ter/Qui 13:00",
        grade: 85,
        lastActivity: "Ontem",
      },
      {
        id: 38,
        name: "Sistemas Operacionais",
        code: "CS303",
        instructor: "Prof. Leonardo Silva",
        credits: 3,
        schedule: "Qua/Sex 15:00",
        grade: 86,
        lastActivity: "Hoje",
      },
    ],
  },
  // Adicionando mais alunos para completar 70
  {
    id: "1036",
    name: "Cristina Almeida",
    email: "cristina.almeida@example.com",
    phone: "(555) 678-9012",
    program: "Ciência de Dados",
    yearLevel: "2º Ano",
    enrollmentDate: "1 Set, 2023",
    creditsCompleted: 42,
    academicStanding: "Boa Situação",
    advisor: "Dra. Fernanda Costa",
    attendance: 82,
    assignmentCompletion: 80,
    averageGrade: 82,
    riskLevel: "low",
    lastLogin: "Hoje",
    courses: [
      {
        id: 44,
        name: "Introdução à Ciência de Dados",
        code: "DS101",
        instructor: "Dra. Fernanda Costa",
        credits: 3,
        schedule: "Seg/Qua 11:00",
        grade: 84,
        lastActivity: "Hoje",
      },
      {
        id: 45,
        name: "Estatística Básica",
        code: "STAT101",
        instructor: "Dr. Paulo Martins",
        credits: 4,
        schedule: "Ter/Qui 9:00",
        grade: 80,
        lastActivity: "Ontem",
      },
      {
        id: 46,
        name: "Programação em Python",
        code: "DS102",
        instructor: "Profa. Carla Silva",
        credits: 3,
        schedule: "Qua/Sex 13:00",
        grade: 82,
        lastActivity: "Hoje",
      },
    ],
  },
  {
    id: "1037",
    name: "Paulo Ferreira",
    email: "paulo.ferreira@example.com",
    phone: "(555) 789-0123",
    program: "Engenharia da Computação",
    yearLevel: "4º Ano",
    enrollmentDate: "1 Set, 2021",
    creditsCompleted: 98,
    academicStanding: "Lista do Reitor",
    advisor: "Dra. Lisa Thompson",
    attendance: 92,
    assignmentCompletion: 90,
    averageGrade: 88,
    riskLevel: "low",
    lastLogin: "Ontem",
    courses: [
      {
        id: 52,
        name: "Microprocessadores",
        code: "EC301",
        instructor: "Dr. Felipe Costa",
        credits: 4,
        schedule: "Seg/Qua 10:00",
        grade: 90,
        lastActivity: "Ontem",
      },
      {
        id: 53,
        name: "Sistemas Embarcados",
        code: "EC302",
        instructor: "Prof. Rafael Silva",
        credits: 4,
        schedule: "Ter/Qui 13:00",
        grade: 88,
        lastActivity: "2 dias atrás",
      },
      {
        id: 54,
        name: "Processamento Digital de Sinais",
        code: "EC303",
        instructor: "Dra. Carolina Martins",
        credits: 3,
        schedule: "Qua/Sex 15:00",
        grade: 86,
        lastActivity: "Ontem",
      },
    ],
  },
  {
    id: "1038",
    name: "Fernanda Oliveira",
    email: "fernanda.oliveira@example.com",
    phone: "(555) 890-1234",
    program: "Engenharia de Software",
    yearLevel: "1º Ano",
    enrollmentDate: "1 Set, 2024",
    creditsCompleted: 15,
    academicStanding: "Boa Situação",
    advisor: "Dr. Carlos Mendes",
    attendance: 70,
    assignmentCompletion: 65,
    averageGrade: 72,
    riskLevel: "high",
    lastLogin: "6 dias atrás",
    courses: [
      {
        id: 18,
        name: "Programação Orientada a Objetos",
        code: "CS204",
        instructor: "Dr. Paulo Santos",
        credits: 4,
        schedule: "Seg/Qua 13:00",
        grade: 74,
        lastActivity: "6 dias atrás",
      },
      {
        id: 19,
        name: "Desenvolvimento Ágil",
        code: "SE201",
        instructor: "Profa. Carla Oliveira",
        credits: 3,
        schedule: "Ter/Qui 10:00",
        grade: 70,
        lastActivity: "7 dias atrás",
      },
      {
        id: 20,
        name: "Arquitetura de Software",
        code: "SE202",
        instructor: "Dr. Ricardo Almeida",
        credits: 3,
        schedule: "Qua/Sex 15:00",
        grade: 72,
        lastActivity: "1 semana atrás",
      },
    ],
  },
  {
    id: "1039",
    name: "Marcelo Santos",
    email: "marcelo.santos@example.com",
    phone: "(555) 901-2345",
    program: "Sistemas de Informação",
    yearLevel: "3º Ano",
    enrollmentDate: "1 Set, 2022",
    creditsCompleted: 68,
    academicStanding: "Boa Situação",
    advisor: "Dr. Felipe Martins",
    attendance: 85,
    assignmentCompletion: 82,
    averageGrade: 84,
    riskLevel: "medium",
    lastLogin: "3 dias atrás",
    courses: [
      {
        id: 48,
        name: "Redes de Computadores",
        code: "SI205",
        instructor: "Dr. Lucas Ferreira",
        credits: 3,
        schedule: "Seg/Qua 13:00",
        grade: 86,
        lastActivity: "3 dias atrás",
      },
      {
        id: 49,
        name: "Engenharia de Requisitos",
        code: "SI206",
        instructor: "Profa. Mariana Alves",
        credits: 3,
        schedule: "Ter/Qui 10:00",
        grade: 82,
        lastActivity: "4 dias atrás",
      },
      {
        id: 50,
        name: "Sistemas Empresariais",
        code: "SI207",
        instructor: "Dr. Roberto Santos",
        credits: 4,
        schedule: "Qua/Sex 14:00",
        grade: 84,
        lastActivity: "2 dias atrás",
      },
    ],
  },
  {
    id: "1040",
    name: "Luciana Silva",
    email: "luciana.silva@example.com",
    phone: "(555) 012-3456",
    program: "Ciência da Computação",
    yearLevel: "2º Ano",
    enrollmentDate: "1 Set, 2023",
    creditsCompleted: 40,
    academicStanding: "Boa Situação",
    advisor: "Dr. James Wilson",
    attendance: 80,
    assignmentCompletion: 78,
    averageGrade: 80,
    riskLevel: "low",
    lastLogin: "Hoje",
    courses: [
      {
        id: 1,
        name: "Introdução à Ciência da Computação",
        code: "CS101",
        instructor: "Dr. James Wilson",
        credits: 3,
        schedule: "Seg/Qua 10:00",
        grade: 82,
        lastActivity: "Hoje",
      },
      {
        id: 2,
        name: "Estruturas de Dados e Algoritmos",
        code: "CS201",
        instructor: "Dra. Emily Rodriguez",
        credits: 4,
        schedule: "Ter/Qui 13:00",
        grade: 78,
        lastActivity: "Ontem",
      },
      {
        id: 5,
        name: "Redes de Computadores",
        code: "CS202",
        instructor: "Dr. David Kim",
        credits: 3,
        schedule: "Ter/Qui 15:00",
        grade: 80,
        lastActivity: "Hoje",
      },
    ],
  },
  {
    id: "1041",
    name: "André Pereira",
    email: "andre.pereira@example.com",
    phone: "(555) 123-4567",
    program: "Ciência de Dados",
    yearLevel: "4º Ano",
    enrollmentDate: "1 Set, 2021",
    creditsCompleted: 95,
    academicStanding: "Lista do Reitor",
    advisor: "Dr. Roberto Alves",
    attendance: 92,
    assignmentCompletion: 90,
    averageGrade: 88,
    riskLevel: "low",
    lastLogin: "Ontem",
    courses: [
      {
        id: 26,
        name: "Visualização de Dados",
        code: "DS401",
        instructor: "Dra. Camila Rocha",
        credits: 3,
        schedule: "Seg/Qua 11:00",
        grade: 90,
        lastActivity: "Ontem",
      },
      {
        id: 27,
        name: "Aprendizado Profundo",
        code: "DS402",
        instructor: "Dr. Lucas Martins",
        credits: 4,
        schedule: "Ter/Qui 13:00",
        grade: 88,
        lastActivity: "2 dias atrás",
      },
      {
        id: 28,
        name: "Processamento de Linguagem Natural",
        code: "DS403",
        instructor: "Profa. Beatriz Lima",
        credits: 3,
        schedule: "Qua/Sex 14:00",
        grade: 86,
        lastActivity: "Ontem",
      },
    ],
  },
  {
    id: "1042",
    name: "Tatiana Costa",
    email: "tatiana.costa@example.com",
    phone: "(555) 234-5678",
    program: "Engenharia de Software",
    yearLevel: "3º Ano",
    enrollmentDate: "1 Set, 2022",
    creditsCompleted: 70,
    academicStanding: "Boa Situação",
    advisor: "Dr. Carlos Mendes",
    attendance: 85,
    assignmentCompletion: 82,
    averageGrade: 84,
    riskLevel: "medium",
    lastLogin: "4 dias atrás",
    courses: [
      {
        id: 18,
        name: "Programação Orientada a Objetos",
        code: "CS204",
        instructor: "Dr. Paulo Santos",
        credits: 4,
        schedule: "Seg/Qua 13:00",
        grade: 86,
        lastActivity: "4 dias atrás",
      },
      {
        id: 19,
        name: "Desenvolvimento Ágil",
        code: "SE201",
        instructor: "Profa. Carla Oliveira",
        credits: 3,
        schedule: "Ter/Qui 10:00",
        grade: 82,
        lastActivity: "5 dias atrás",
      },
      {
        id: 20,
        name: "Arquitetura de Software",
        code: "SE202",
        instructor: "Dr. Ricardo Almeida",
        credits: 3,
        schedule: "Qua/Sex 15:00",
        grade: 84,
        lastActivity: "3 dias atrás",
      },
    ],
  },
  {
    id: "1043",
    name: "Henrique Oliveira",
    email: "henrique.oliveira@example.com",
    phone: "(555) 345-6789",
    program: "Engenharia da Computação",
    yearLevel: "1º Ano",
    enrollmentDate: "1 Set, 2024",
    creditsCompleted: 16,
    academicStanding: "Boa Situação",
    advisor: "Dra. Carolina Silva",
    attendance: 68,
    assignmentCompletion: 65,
    averageGrade: 70,
    riskLevel: "high",
    lastLogin: "7 dias atrás",
    courses: [
      {
        id: 1,
        name: "Introdução à Ciência da Computação",
        code: "CS101",
        instructor: "Dr. James Wilson",
        credits: 3,
        schedule: "Seg/Qua 10:00",
        grade: 72,
        lastActivity: "7 dias atrás",
      },
      {
        id: 15,
        name: "Cálculo I",
        code: "MATH101",
        instructor: "Dra. Sarah Chen",
        credits: 4,
        schedule: "Ter/Qui 9:00",
        grade: 68,
        lastActivity: "8 dias atrás",
      },
      {
        id: 30,
        name: "Física I",
        code: "PHYS101",
        instructor: "Dr. Eduardo Costa",
        credits: 4,
        schedule: "Ter/Qui 15:00",
        grade: 70,
        lastActivity: "1 semana atrás",
      },
    ],
  },
  {
    id: "1044",
    name: "Camila Ferreira",
    email: "camila.ferreira@example.com",
    phone: "(555) 456-7890",
    program: "Sistemas de Informação",
    yearLevel: "2º Ano",
    enrollmentDate: "1 Set, 2023",
    creditsCompleted: 38,
    academicStanding: "Boa Situação",
    advisor: "Dr. Marcos Oliveira",
    attendance: 78,
    assignmentCompletion: 75,
    averageGrade: 76,
    riskLevel: "low",
    lastLogin: "Hoje",
    courses: [
      {
        id: 32,
        name: "Banco de Dados I",
        code: "SI201",
        instructor: "Dra. Patrícia Alves",
        credits: 4,
        schedule: "Seg/Qua 14:00",
        grade: 78,
        lastActivity: "Hoje",
      },
      {
        id: 33,
        name: "Análise de Sistemas",
        code: "SI202",
        instructor: "Dr. Thiago Rocha",
        credits: 3,
        schedule: "Ter/Qui 11:00",
        grade: 75,
        lastActivity: "Ontem",
      },
      {
        id: 34,
        name: "Programação Web",
        code: "SI203",
        instructor: "Profa. Renata Oliveira",
        credits: 3,
        schedule: "Qua/Sex 9:00",
        grade: 76,
        lastActivity: "Hoje",
      },
    ],
  },
  {
    id: "1045",
    name: "Lucas Mendes",
    email: "lucas.mendes@example.com",
    phone: "(555) 567-8901",
    program: "Ciência da Computação",
    yearLevel: "3º Ano",
    enrollmentDate: "1 Set, 2022",
    creditsCompleted: 68,
    academicStanding: "Boa Situação",
    advisor: "Dr. James Wilson",
    attendance: 85,
    assignmentCompletion: 82,
    averageGrade: 84,
    riskLevel: "medium",
    lastLogin: "3 dias atrás",
    courses: [
      {
        id: 36,
        name: "Compiladores",
        code: "CS301",
        instructor: "Dr. Victor Pereira",
        credits: 4,
        schedule: "Seg/Qua 10:00",
        grade: 86,
        lastActivity: "3 dias atrás",
      },
      {
        id: 37,
        name: "Inteligência Artificial",
        code: "CS302",
        instructor: "Dra. Cristina Oliveira",
        credits: 4,
        schedule: "Ter/Qui 13:00",
        grade: 82,
        lastActivity: "4 dias atrás",
      },
      {
        id: 38,
        name: "Sistemas Operacionais",
        code: "CS303",
        instructor: "Prof. Leonardo Silva",
        credits: 3,
        schedule: "Qua/Sex 15:00",
        grade: 84,
        lastActivity: "2 dias atrás",
      },
    ],
  },
  {
    id: "1046",
    name: "Bianca Almeida",
    email: "bianca.almeida@example.com",
    phone: "(555) 678-9012",
    program: "Ciência de Dados",
    yearLevel: "4º Ano",
    enrollmentDate: "1 Set, 2021",
    creditsCompleted: 96,
    academicStanding: "Lista do Reitor",
    advisor: "Dr. Roberto Alves",
    attendance: 92,
    assignmentCompletion: 90,
    averageGrade: 88,
    riskLevel: "low",
    lastLogin: "Ontem",
    courses: [
      {
        id: 26,
        name: "Visualização de Dados",
        code: "DS401",
        instructor: "Dra. Camila Rocha",
        credits: 3,
        schedule: "Seg/Qua 11:00",
        grade: 90,
        lastActivity: "Ontem",
      },
      {
        id: 27,
        name: "Aprendizado Profundo",
        code: "DS402",
        instructor: "Dr. Lucas Martins",
        credits: 4,
        schedule: "Ter/Qui 13:00",
        grade: 88,
        lastActivity: "2 dias atrás",
      },
      {
        id: 28,
        name: "Processamento de Linguagem Natural",
        code: "DS403",
        instructor: "Profa. Beatriz Lima",
        credits: 3,
        schedule: "Qua/Sex 14:00",
        grade: 86,
        lastActivity: "Ontem",
      },
    ],
  },
  {
    id: "1047",
    name: "Gustavo Lima",
    email: "gustavo.lima@example.com",
    phone: "(555) 789-0123",
    program: "Engenharia de Software",
    yearLevel: "1º Ano",
    enrollmentDate: "1 Set, 2024",
    creditsCompleted: 15,
    academicStanding: "Boa Situação",
    advisor: "Dr. Carlos Mendes",
    attendance: 70,
    assignmentCompletion: 65,
    averageGrade: 72,
    riskLevel: "high",
    lastLogin: "6 dias atrás",
    courses: [
      {
        id: 18,
        name: "Programação Orientada a Objetos",
        code: "CS204",
        instructor: "Dr. Paulo Santos",
        credits: 4,
        schedule: "Seg/Qua 13:00",
        grade: 74,
        lastActivity: "6 dias atrás",
      },
      {
        id: 19,
        name: "Desenvolvimento Ágil",
        code: "SE201",
        instructor: "Profa. Carla Oliveira",
        credits: 3,
        schedule: "Ter/Qui 10:00",
        grade: 70,
        lastActivity: "7 dias atrás",
      },
      {
        id: 20,
        name: "Arquitetura de Software",
        code: "SE202",
        instructor: "Dr. Ricardo Almeida",
        credits: 3,
        schedule: "Qua/Sex 15:00",
        grade: 72,
        lastActivity: "1 semana atrás",
      },
    ],
  },
  {
    id: "1048",
    name: "Natália Rocha",
    email: "natalia.rocha@example.com",
    phone: "(555) 890-1234",
    program: "Sistemas de Informação",
    yearLevel: "2º Ano",
    enrollmentDate: "1 Set, 2023",
    creditsCompleted: 40,
    academicStanding: "Boa Situação",
    advisor: "Dr. Marcos Oliveira",
    attendance: 80,
    assignmentCompletion: 78,
    averageGrade: 80,
    riskLevel: "medium",
    lastLogin: "4 dias atrás",
    courses: [
      {
        id: 32,
        name: "Banco de Dados I",
        code: "SI201",
        instructor: "Dra. Patrícia Alves",
        credits: 4,
        schedule: "Seg/Qua 14:00",
        grade: 82,
        lastActivity: "4 dias atrás",
      },
      {
        id: 33,
        name: "Análise de Sistemas",
        code: "SI202",
        instructor: "Dr. Thiago Rocha",
        credits: 3,
        schedule: "Ter/Qui 11:00",
        grade: 78,
        lastActivity: "5 dias atrás",
      },
      {
        id: 34,
        name: "Programação Web",
        code: "SI203",
        instructor: "Profa. Renata Oliveira",
        credits: 3,
        schedule: "Qua/Sex 9:00",
        grade: 80,
        lastActivity: "3 dias atrás",
      },
    ],
  },
  {
    id: "1049",
    name: "Eduardo Santos",
    email: "eduardo.santos@example.com",
    phone: "(555) 901-2345",
    program: "Engenharia da Computação",
    yearLevel: "3º Ano",
    enrollmentDate: "1 Set, 2022",
    creditsCompleted: 70,
    academicStanding: "Boa Situação",
    advisor: "Dra. Carolina Silva",
    attendance: 88,
    assignmentCompletion: 85,
    averageGrade: 86,
    riskLevel: "low",
    lastLogin: "Hoje",
    courses: [
      {
        id: 52,
        name: "Microprocessadores",
        code: "EC301",
        instructor: "Dr. Felipe Costa",
        credits: 4,
        schedule: "Seg/Qua 10:00",
        grade: 88,
        lastActivity: "Hoje",
      },
      {
        id: 53,
        name: "Sistemas Embarcados",
        code: "EC302",
        instructor: "Prof. Rafael Silva",
        credits: 4,
        schedule: "Ter/Qui 13:00",
        grade: 85,
        lastActivity: "Ontem",
      },
      {
        id: 54,
        name: "Processamento Digital de Sinais",
        code: "EC303",
        instructor: "Dra. Carolina Martins",
        credits: 3,
        schedule: "Qua/Sex 15:00",
        grade: 86,
        lastActivity: "Hoje",
      },
    ],
  },
  {
    id: "1050",
    name: "Vanessa Oliveira",
    email: "vanessa.oliveira@example.com",
    phone: "(555) 012-3456",
    program: "Ciência da Computação",
    yearLevel: "4º Ano",
    enrollmentDate: "1 Set, 2021",
    creditsCompleted: 98,
    academicStanding: "Lista do Reitor",
    advisor: "Dr. James Wilson",
    attendance: 94,
    assignmentCompletion: 92,
    averageGrade: 90,
    riskLevel: "low",
    lastLogin: "Hoje",
    courses: [
      {
        id: 36,
        name: "Compiladores",
        code: "CS301",
        instructor: "Dr. Victor Pereira",
        credits: 4,
        schedule: "Seg/Qua 10:00",
        grade: 92,
        lastActivity: "Hoje",
      },
      {
        id: 37,
        name: "Inteligência Artificial",
        code: "CS302",
        instructor: "Dra. Cristina Oliveira",
        credits: 4,
        schedule: "Ter/Qui 13:00",
        grade: 90,
        lastActivity: "Ontem",
      },
      {
        id: 38,
        name: "Sistemas Operacionais",
        code: "CS303",
        instructor: "Prof. Leonardo Silva",
        credits: 3,
        schedule: "Qua/Sex 15:00",
        grade: 88,
        lastActivity: "Hoje",
      },
    ],
  },
  // Completando com mais alunos para chegar a 70
  {
    id: "1051",
    name: "Matheus Pereira",
    email: "matheus.pereira@example.com",
    phone: "(555) 123-4567",
    program: "Ciência de Dados",
    yearLevel: "1º Ano",
    enrollmentDate: "1 Set, 2024",
    creditsCompleted: 14,
    academicStanding: "Boa Situação",
    advisor: "Dr. Roberto Alves",
    attendance: 68,
    assignmentCompletion: 65,
    averageGrade: 70,
    riskLevel: "high",
    lastLogin: "7 dias atrás",
    courses: [
      {
        id: 44,
        name: "Introdução à Ciência de Dados",
        code: "DS101",
        instructor: "Dra. Fernanda Costa",
        credits: 3,
        schedule: "Seg/Qua 11:00",
        grade: 72,
        lastActivity: "7 dias atrás",
      },
      {
        id: 45,
        name: "Estatística Básica",
        code: "STAT101",
        instructor: "Dr. Paulo Martins",
        credits: 4,
        schedule: "Ter/Qui 9:00",
        grade: 68,
        lastActivity: "8 dias atrás",
      },
      {
        id: 46,
        name: "Programação em Python",
        code: "DS102",
        instructor: "Profa. Carla Silva",
        credits: 3,
        schedule: "Qua/Sex 13:00",
        grade: 70,
        lastActivity: "1 semana atrás",
      },
    ],
  },
  {
    id: "1052",
    name: "Letícia Martins",
    email: "leticia.martins@example.com",
    phone: "(555) 234-5678",
    program: "Engenharia de Software",
    yearLevel: "2º Ano",
    enrollmentDate: "1 Set, 2023",
    creditsCompleted: 42,
    academicStanding: "Boa Situação",
    advisor: "Dr. Carlos Mendes",
    attendance: 82,
    assignmentCompletion: 80,
    averageGrade: 82,
    riskLevel: "medium",
    lastLogin: "3 dias atrás",
    courses: [
      {
        id: 18,
        name: "Programação Orientada a Objetos",
        code: "CS204",
        instructor: "Dr. Paulo Santos",
        credits: 4,
        schedule: "Seg/Qua 13:00",
        grade: 84,
        lastActivity: "3 dias atrás",
      },
      {
        id: 19,
        name: "Desenvolvimento Ágil",
        code: "SE201",
        instructor: "Profa. Carla Oliveira",
        credits: 3,
        schedule: "Ter/Qui 10:00",
        grade: 80,
        lastActivity: "4 dias atrás",
      },
      {
        id: 20,
        name: "Arquitetura de Software",
        code: "SE202",
        instructor: "Dr. Ricardo Almeida",
        credits: 3,
        schedule: "Qua/Sex 15:00",
        grade: 82,
        lastActivity: "2 dias atrás",
      },
    ],
  },
  {
    id: "1053",
    name: "Fábio Alves",
    email: "fabio.alves@example.com",
    phone: "(555) 345-6789",
    program: "Sistemas de Informação",
    yearLevel: "3º Ano",
    enrollmentDate: "1 Set, 2022",
    creditsCompleted: 68,
    academicStanding: "Boa Situação",
    advisor: "Dr. Felipe Martins",
    attendance: 85,
    assignmentCompletion: 82,
    averageGrade: 84,
    riskLevel: "low",
    lastLogin: "Hoje",
    courses: [
      {
        id: 48,
        name: "Redes de Computadores",
        code: "SI205",
        instructor: "Dr. Lucas Ferreira",
        credits: 3,
        schedule: "Seg/Qua 13:00",
        grade: 86,
        lastActivity: "Hoje",
      },
      {
        id: 49,
        name: "Engenharia de Requisitos",
        code: "SI206",
        instructor: "Profa. Mariana Alves",
        credits: 3,
        schedule: "Ter/Qui 10:00",
        grade: 82,
        lastActivity: "Ontem",
      },
      {
        id: 50,
        name: "Sistemas Empresariais",
        code: "SI207",
        instructor: "Dr. Roberto Santos",
        credits: 4,
        schedule: "Qua/Sex 14:00",
        grade: 84,
        lastActivity: "Hoje",
      },
    ],
  },
  {
    id: "1054",
    name: "Daniela Costa",
    email: "daniela.costa@example.com",
    phone: "(555) 456-7890",
    program: "Ciência da Computação",
    yearLevel: "4º Ano",
    enrollmentDate: "1 Set, 2021",
    creditsCompleted: 96,
    academicStanding: "Lista do Reitor",
    advisor: "Dr. James Wilson",
    attendance: 92,
    assignmentCompletion: 90,
    averageGrade: 88,
    riskLevel: "low",
    lastLogin: "Ontem",
    courses: [
      {
        id: 36,
        name: "Compiladores",
        code: "CS301",
        instructor: "Dr. Victor Pereira",
        credits: 4,
        schedule: "Seg/Qua 10:00",
        grade: 90,
        lastActivity: "Ontem",
      },
      {
        id: 37,
        name: "Inteligência Artificial",
        code: "CS302",
        instructor: "Dra. Cristina Oliveira",
        credits: 4,
        schedule: "Ter/Qui 13:00",
        grade: 88,
        lastActivity: "2 dias atrás",
      },
      {
        id: 38,
        name: "Sistemas Operacionais",
        code: "CS303",
        instructor: "Prof. Leonardo Silva",
        credits: 3,
        schedule: "Qua/Sex 15:00",
        grade: 86,
        lastActivity: "Ontem",
      },
    ],
  },
  {
    id: "1055",
    name: "Vinícius Ferreira",
    email: "vinicius.ferreira@example.com",
    phone: "(555) 567-8901",
    program: "Engenharia da Computação",
    yearLevel: "1º Ano",
    enrollmentDate: "1 Set, 2024",
    creditsCompleted: 16,
    academicStanding: "Boa Situação",
    advisor: "Dra. Carolina Silva",
    attendance: 70,
    assignmentCompletion: 65,
    averageGrade: 72,
    riskLevel: "high",
    lastLogin: "6 dias atrás",
    courses: [
      {
        id: 1,
        name: "Introdução à Ciência da Computação",
        code: "CS101",
        instructor: "Dr. James Wilson",
        credits: 3,
        schedule: "Seg/Qua 10:00",
        grade: 74,
        lastActivity: "6 dias atrás",
      },
      {
        id: 15,
        name: "Cálculo I",
        code: "MATH101",
        instructor: "Dra. Sarah Chen",
        credits: 4,
        schedule: "Ter/Qui 9:00",
        grade: 70,
        lastActivity: "7 dias atrás",
      },
      {
        id: 30,
        name: "Física I",
        code: "PHYS101",
        instructor: "Dr. Eduardo Costa",
        credits: 4,
        schedule: "Ter/Qui 15:00",
        grade: 72,
        lastActivity: "1 semana atrás",
      },
    ],
  },
  {
    id: "1056",
    name: "Raquel Oliveira",
    email: "raquel.oliveira@example.com",
    phone: "(555) 678-9012",
    program: "Ciência de Dados",
    yearLevel: "2º Ano",
    enrollmentDate: "1 Set, 2023",
    creditsCompleted: 40,
    academicStanding: "Boa Situação",
    advisor: "Dra. Fernanda Costa",
    attendance: 80,
    assignmentCompletion: 78,
    averageGrade: 80,
    riskLevel: "medium",
    lastLogin: "4 dias atrás",
    courses: [
      {
        id: 44,
        name: "Introdução à Ciência de Dados",
        code: "DS101",
        instructor: "Dra. Fernanda Costa",
        credits: 3,
        schedule: "Seg/Qua 11:00",
        grade: 82,
        lastActivity: "4 dias atrás",
      },
      {
        id: 45,
        name: "Estatística Básica",
        code: "STAT101",
        instructor: "Dr. Paulo Martins",
        credits: 4,
        schedule: "Ter/Qui 9:00",
        grade: 78,
        lastActivity: "5 dias atrás",
      },
      {
        id: 46,
        name: "Programação em Python",
        code: "DS102",
        instructor: "Profa. Carla Silva",
        credits: 3,
        schedule: "Qua/Sex 13:00",
        grade: 80,
        lastActivity: "3 dias atrás",
      },
    ],
  },
  {
    id: "1057",
    name: "Thiago Ribeiro",
    email: "thiago.ribeiro@example.com",
    phone: "(555) 789-0123",
    program: "Engenharia de Software",
    yearLevel: "3º Ano",
    enrollmentDate: "1 Set, 2022",
    creditsCompleted: 70,
    academicStanding: "Boa Situação",
    advisor: "Dr. Carlos Mendes",
    attendance: 85,
    assignmentCompletion: 82,
    averageGrade: 84,
    riskLevel: "low",
    lastLogin: "Hoje",
    courses: [
      {
        id: 18,
        name: "Programação Orientada a Objetos",
        code: "CS204",
        instructor: "Dr. Paulo Santos",
        credits: 4,
        schedule: "Seg/Qua 13:00",
        grade: 86,
        lastActivity: "Hoje",
      },
      {
        id: 19,
        name: "Desenvolvimento Ágil",
        code: "SE201",
        instructor: "Profa. Carla Oliveira",
        credits: 3,
        schedule: "Ter/Qui 10:00",
        grade: 82,
        lastActivity: "Ontem",
      },
      {
        id: 20,
        name: "Arquitetura de Software",
        code: "SE202",
        instructor: "Dr. Ricardo Almeida",
        credits: 3,
        schedule: "Qua/Sex 15:00",
        grade: 84,
        lastActivity: "Hoje",
      },
    ],
  },
  {
    id: "1058",
    name: "Aline Santos",
    email: "aline.santos@example.com",
    phone: "(555) 890-1234",
    program: "Sistemas de Informação",
    yearLevel: "4º Ano",
    enrollmentDate: "1 Set, 2021",
    creditsCompleted: 98,
    academicStanding: "Lista do Reitor",
    advisor: "Dr. Felipe Martins",
    attendance: 92,
    assignmentCompletion: 90,
    averageGrade: 88,
    riskLevel: "low",
    lastLogin: "Ontem",
    courses: [
      {
        id: 48,
        name: "Redes de Computadores",
        code: "SI205",
        instructor: "Dr. Lucas Ferreira",
        credits: 3,
        schedule: "Seg/Qua 13:00",
        grade: 90,
        lastActivity: "Ontem",
      },
      {
        id: 49,
        name: "Engenharia de Requisitos",
        code: "SI206",
        instructor: "Profa. Mariana Alves",
        credits: 3,
        schedule: "Ter/Qui 10:00",
        grade: 88,
        lastActivity: "2 dias atrás",
      },
      {
        id: 50,
        name: "Sistemas Empresariais",
        code: "SI207",
        instructor: "Dr. Roberto Santos",
        credits: 4,
        schedule: "Qua/Sex 14:00",
        grade: 86,
        lastActivity: "Ontem",
      },
    ],
  },
  {
    id: "1059",
    name: "Rodrigo Alves",
    email: "rodrigo.alves@example.com",
    phone: "(555) 901-2345",
    program: "Ciência da Computação",
    yearLevel: "1º Ano",
    enrollmentDate: "1 Set, 2024",
    creditsCompleted: 15,
    academicStanding: "Boa Situação",
    advisor: "Dr. James Wilson",
    attendance: 68,
    assignmentCompletion: 65,
    averageGrade: 70,
    riskLevel: "high",
    lastLogin: "7 dias atrás",
    courses: [
      {
        id: 1,
        name: "Introdução à Ciência da Computação",
        code: "CS101",
        instructor: "Dr. James Wilson",
        credits: 3,
        schedule: "Seg/Qua 10:00",
        grade: 72,
        lastActivity: "7 dias atrás",
      },
      {
        id: 15,
        name: "Cálculo I",
        code: "MATH101",
        instructor: "Dra. Sarah Chen",
        credits: 4,
        schedule: "Ter/Qui 9:00",
        grade: 68,
        lastActivity: "8 dias atrás",
      },
      {
        id: 16,
        name: "Introdução à Programação",
        code: "CS102",
        instructor: "Prof. John Smith",
        credits: 3,
        schedule: "Qua/Sex 14:00",
        grade: 70,
        lastActivity: "1 semana atrás",
      },
    ],
  },
  {
    id: "1060",
    name: "Fernanda Martins",
    email: "fernanda.martins@example.com",
    phone: "(555) 012-3456",
    program: "Engenharia da Computação",
    yearLevel: "2º Ano",
    enrollmentDate: "1 Set, 2023",
    creditsCompleted: 42,
    academicStanding: "Boa Situação",
    advisor: "Dra. Carolina Silva",
    attendance: 82,
    assignmentCompletion: 80,
    averageGrade: 82,
    riskLevel: "medium",
    lastLogin: "3 dias atrás",
    courses: [
      {
        id: 52,
        name: "Microprocessadores",
        code: "EC301",
        instructor: "Dr. Felipe Costa",
        credits: 4,
        schedule: "Seg/Qua 10:00",
        grade: 84,
        lastActivity: "3 dias atrás",
      },
      {
        id: 53,
        name: "Sistemas Embarcados",
        code: "EC302",
        instructor: "Prof. Rafael Silva",
        credits: 4,
        schedule: "Ter/Qui 13:00",
        grade: 80,
        lastActivity: "4 dias atrás",
      },
      {
        id: 54,
        name: "Processamento Digital de Sinais",
        code: "EC303",
        instructor: "Dra. Carolina Martins",
        credits: 3,
        schedule: "Qua/Sex 15:00",
        grade: 82,
        lastActivity: "2 dias atrás",
      },
    ],
  },
  {
    id: "1061",
    name: "Marcelo Oliveira",
    email: "marcelo.oliveira@example.com",
    phone: "(555) 123-4567",
    program: "Ciência de Dados",
    yearLevel: "3º Ano",
    enrollmentDate: "1 Set, 2022",
    creditsCompleted: 68,
    academicStanding: "Boa Situação",
    advisor: "Dra. Fernanda Costa",
    attendance: 85,
    assignmentCompletion: 82,
    averageGrade: 84,
    riskLevel: "low",
    lastLogin: "Hoje",
    courses: [
      {
        id: 44,
        name: "Introdução à Ciência de Dados",
        code: "DS101",
        instructor: "Dra. Fernanda Costa",
        credits: 3,
        schedule: "Seg/Qua 11:00",
        grade: 86,
        lastActivity: "Hoje",
      },
      {
        id: 45,
        name: "Estatística Básica",
        code: "STAT101",
        instructor: "Dr. Paulo Martins",
        credits: 4,
        schedule: "Ter/Qui 9:00",
        grade: 82,
        lastActivity: "Ontem",
      },
      {
        id: 46,
        name: "Programação em Python",
        code: "DS102",
        instructor: "Profa. Carla Silva",
        credits: 3,
        schedule: "Qua/Sex 13:00",
        grade: 84,
        lastActivity: "Hoje",
      },
    ],
  },
  {
    id: "1062",
    name: "Carla Mendes",
    email: "carla.mendes@example.com",
    phone: "(555) 234-5678",
    program: "Engenharia de Software",
    yearLevel: "4º Ano",
    enrollmentDate: "1 Set, 2021",
    creditsCompleted: 100,
    academicStanding: "Lista do Reitor",
    advisor: "Dr. Carlos Mendes",
    attendance: 94,
    assignmentCompletion: 92,
    averageGrade: 90,
    riskLevel: "low",
    lastLogin: "Ontem",
    courses: [
      {
        id: 40,
        name: "Qualidade de Software",
        code: "SE401",
        instructor: "Dr. Rodrigo Alves",
        credits: 3,
        schedule: "Seg/Qua 9:00",
        grade: 92,
        lastActivity: "Ontem",
      },
      {
        id: 41,
        name: "DevOps",
        code: "SE402",
        instructor: "Prof. Daniel Costa",
        credits: 3,
        schedule: "Ter/Qui 14:00",
        grade: 90,
        lastActivity: "2 dias atrás",
      },
      {
        id: 42,
        name: "Arquiteturas Avançadas",
        code: "SE403",
        instructor: "Dra. Luciana Ferreira",
        credits: 4,
        schedule: "Qua/Sex 11:00",
        grade: 88,
        lastActivity: "Ontem",
      },
    ],
  },
  {
    id: "1063",
    name: "Felipe Rocha",
    email: "felipe.rocha@example.com",
    phone: "(555) 345-6789",
    program: "Sistemas de Informação",
    yearLevel: "1º Ano",
    enrollmentDate: "1 Set, 2024",
    creditsCompleted: 16,
    academicStanding: "Boa Situação",
    advisor: "Dr. Felipe Martins",
    attendance: 70,
    assignmentCompletion: 65,
    averageGrade: 72,
    riskLevel: "high",
    lastLogin: "6 dias atrás",
    courses: [
      {
        id: 32,
        name: "Banco de Dados I",
        code: "SI201",
        instructor: "Dra. Patrícia Alves",
        credits: 4,
        schedule: "Seg/Qua 14:00",
        grade: 74,
        lastActivity: "6 dias atrás",
      },
      {
        id: 33,
        name: "Análise de Sistemas",
        code: "SI202",
        instructor: "Dr. Thiago Rocha",
        credits: 3,
        schedule: "Ter/Qui 11:00",
        grade: 70,
        lastActivity: "7 dias atrás",
      },
      {
        id: 34,
        name: "Programação Web",
        code: "SI203",
        instructor: "Profa. Renata Oliveira",
        credits: 3,
        schedule: "Qua/Sex 9:00",
        grade: 72,
        lastActivity: "1 semana atrás",
      },
    ],
  },
  {
    id: "1064",
    name: "Bruna Costa",
    email: "bruna.costa@example.com",
    phone: "(555) 456-7890",
    program: "Ciência da Computação",
    yearLevel: "2º Ano",
    enrollmentDate: "1 Set, 2023",
    creditsCompleted: 40,
    academicStanding: "Boa Situação",
    advisor: "Dr. James Wilson",
    attendance: 80,
    assignmentCompletion: 78,
    averageGrade: 80,
    riskLevel: "medium",
    lastLogin: "4 dias atrás",
    courses: [
      {
        id: 1,
        name: "Introdução à Ciência da Computação",
        code: "CS101",
        instructor: "Dr. James Wilson",
        credits: 3,
        schedule: "Seg/Qua 10:00",
        grade: 82,
        lastActivity: "4 dias atrás",
      },
      {
        id: 2,
        name: "Estruturas de Dados e Algoritmos",
        code: "CS201",
        instructor: "Dra. Emily Rodriguez",
        credits: 4,
        schedule: "Ter/Qui 13:00",
        grade: 78,
        lastActivity: "5 dias atrás",
      },
      {
        id: 5,
        name: "Redes de Computadores",
        code: "CS202",
        instructor: "Dr. David Kim",
        credits: 3,
        schedule: "Ter/Qui 15:00",
        grade: 80,
        lastActivity: "3 dias atrás",
      },
    ],
  },
  {
    id: "1065",
    name: "Ricardo Oliveira",
    email: "ricardo.oliveira@example.com",
    phone: "(555) 567-8901",
    program: "Engenharia da Computação",
    yearLevel: "3º Ano",
    enrollmentDate: "1 Set, 2022",
    creditsCompleted: 70,
    academicStanding: "Boa Situação",
    advisor: "Dra. Carolina Silva",
    attendance: 88,
    assignmentCompletion: 85,
    averageGrade: 86,
    riskLevel: "low",
    lastLogin: "Hoje",
    courses: [
      {
        id: 52,
        name: "Microprocessadores",
        code: "EC301",
        instructor: "Dr. Felipe Costa",
        credits: 4,
        schedule: "Seg/Qua 10:00",
        grade: 88,
        lastActivity: "Hoje",
      },
      {
        id: 53,
        name: "Sistemas Embarcados",
        code: "EC302",
        instructor: "Prof. Rafael Silva",
        credits: 4,
        schedule: "Ter/Qui 13:00",
        grade: 85,
        lastActivity: "Ontem",
      },
      {
        id: 54,
        name: "Processamento Digital de Sinais",
        code: "EC303",
        instructor: "Dra. Carolina Martins",
        credits: 3,
        schedule: "Qua/Sex 15:00",
        grade: 86,
        lastActivity: "Hoje",
      },
    ],
  },
  {
    id: "1066",
    name: "Mariana Alves",
    email: "mariana.alves@example.com",
    phone: "(555) 678-9012",
    program: "Ciência de Dados",
    yearLevel: "4º Ano",
    enrollmentDate: "1 Set, 2021",
    creditsCompleted: 96,
    academicStanding: "Lista do Reitor",
    advisor: "Dra. Fernanda Costa",
    attendance: 92,
    assignmentCompletion: 90,
    averageGrade: 88,
    riskLevel: "low",
    lastLogin: "Ontem",
    courses: [
      {
        id: 26,
        name: "Visualização de Dados",
        code: "DS401",
        instructor: "Dra. Camila Rocha",
        credits: 3,
        schedule: "Seg/Qua 11:00",
        grade: 90,
        lastActivity: "Ontem",
      },
      {
        id: 27,
        name: "Aprendizado Profundo",
        code: "DS402",
        instructor: "Dr. Lucas Martins",
        credits: 4,
        schedule: "Ter/Qui 13:00",
        grade: 88,
        lastActivity: "2 dias atrás",
      },
      {
        id: 28,
        name: "Processamento de Linguagem Natural",
        code: "DS403",
        instructor: "Profa. Beatriz Lima",
        credits: 3,
        schedule: "Qua/Sex 14:00",
        grade: 86,
        lastActivity: "Ontem",
      },
    ],
  },
  {
    id: "1067",
    name: "Diego Santos",
    email: "diego.santos@example.com",
    phone: "(555) 789-0123",
    program: "Engenharia de Software",
    yearLevel: "1º Ano",
    enrollmentDate: "1 Set, 2024",
    creditsCompleted: 15,
    academicStanding: "Boa Situação",
    advisor: "Dr. Carlos Mendes",
    attendance: 68,
    assignmentCompletion: 65,
    averageGrade: 70,
    riskLevel: "high",
    lastLogin: "7 dias atrás",
    courses: [
      {
        id: 18,
        name: "Programação Orientada a Objetos",
        code: "CS204",
        instructor: "Dr. Paulo Santos",
        credits: 4,
        schedule: "Seg/Qua 13:00",
        grade: 72,
        lastActivity: "7 dias atrás",
      },
      {
        id: 19,
        name: "Desenvolvimento Ágil",
        code: "SE201",
        instructor: "Profa. Carla Oliveira",
        credits: 3,
        schedule: "Ter/Qui 10:00",
        grade: 68,
        lastActivity: "8 dias atrás",
      },
      {
        id: 20,
        name: "Arquitetura de Software",
        code: "SE202",
        instructor: "Dr. Ricardo Almeida",
        credits: 3,
        schedule: "Qua/Sex 15:00",
        grade: 70,
        lastActivity: "1 semana atrás",
      },
    ],
  },
  {
    id: "1068",
    name: "Patrícia Ferreira",
    email: "patricia.ferreira@example.com",
    phone: "(555) 890-1234",
    program: "Sistemas de Informação",
    yearLevel: "2º Ano",
    enrollmentDate: "1 Set, 2023",
    creditsCompleted: 38,
    academicStanding: "Boa Situação",
    advisor: "Dr. Felipe Martins",
    attendance: 78,
    assignmentCompletion: 75,
    averageGrade: 76,
    riskLevel: "medium",
    lastLogin: "4 dias atrás",
    courses: [
      {
        id: 32,
        name: "Banco de Dados I",
        code: "SI201",
        instructor: "Dra. Patrícia Alves",
        credits: 4,
        schedule: "Seg/Qua 14:00",
        grade: 78,
        lastActivity: "4 dias atrás",
      },
      {
        id: 33,
        name: "Análise de Sistemas",
        code: "SI202",
        instructor: "Dr. Thiago Rocha",
        credits: 3,
        schedule: "Ter/Qui 11:00",
        grade: 75,
        lastActivity: "5 dias atrás",
      },
      {
        id: 34,
        name: "Programação Web",
        code: "SI203",
        instructor: "Profa. Renata Oliveira",
        credits: 3,
        schedule: "Qua/Sex 9:00",
        grade: 76,
        lastActivity: "3 dias atrás",
      },
    ],
  },
  {
    id: "1069",
    name: "Guilherme Lima",
    email: "guilherme.lima@example.com",
    phone: "(555) 901-2345",
    program: "Ciência da Computação",
    yearLevel: "3º Ano",
    enrollmentDate: "1 Set, 2022",
    creditsCompleted: 68,
    academicStanding: "Boa Situação",
    advisor: "Dr. James Wilson",
    attendance: 85,
    assignmentCompletion: 82,
    averageGrade: 84,
    riskLevel: "low",
    lastLogin: "Hoje",
    courses: [
      {
        id: 36,
        name: "Compiladores",
        code: "CS301",
        instructor: "Dr. Victor Pereira",
        credits: 4,
        schedule: "Seg/Qua 10:00",
        grade: 86,
        lastActivity: "Hoje",
      },
      {
        id: 37,
        name: "Inteligência Artificial",
        code: "CS302",
        instructor: "Dra. Cristina Oliveira",
        credits: 4,
        schedule: "Ter/Qui 13:00",
        grade: 82,
        lastActivity: "Ontem",
      },
      {
        id: 38,
        name: "Sistemas Operacionais",
        code: "CS303",
        instructor: "Prof. Leonardo Silva",
        credits: 3,
        schedule: "Qua/Sex 15:00",
        grade: 84,
        lastActivity: "Hoje",
      },
    ],
  },
  {
    id: "1070",
    name: "Renata Silva",
    email: "renata.silva@example.com",
    phone: "(555) 012-3456",
    program: "Engenharia da Computação",
    yearLevel: "4º Ano",
    enrollmentDate: "1 Set, 2021",
    creditsCompleted: 98,
    academicStanding: "Lista do Reitor",
    advisor: "Dra. Carolina Silva",
    attendance: 94,
    assignmentCompletion: 92,
    averageGrade: 90,
    riskLevel: "low",
    lastLogin: "Hoje",
    courses: [
      {
        id: 52,
        name: "Microprocessadores",
        code: "EC301",
        instructor: "Dr. Felipe Costa",
        credits: 4,
        schedule: "Seg/Qua 10:00",
        grade: 92,
        lastActivity: "Hoje",
      },
      {
        id: 53,
        name: "Sistemas Embarcados",
        code: "EC302",
        instructor: "Prof. Rafael Silva",
        credits: 4,
        schedule: "Ter/Qui 13:00",
        grade: 90,
        lastActivity: "Ontem",
      },
      {
        id: 54,
        name: "Processamento Digital de Sinais",
        code: "EC303",
        instructor: "Dra. Carolina Martins",
        credits: 3,
        schedule: "Qua/Sex 15:00",
        grade: 88,
        lastActivity: "Hoje",
      },
    ],
  },
]

// Buscar todos os alunos
export async function fetchStudents() {
  // Simula atraso da API
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Atualiza a classificação de risco com base no último acesso
  const studentsWithUpdatedRisk = students.map((student) => {
    // Determina o nível de risco com base no último acesso
    let riskLevel = student.riskLevel

    // Extrai o número de dias do último acesso
    const lastLoginText = student.lastLogin.toLowerCase()
    let daysAgo = 0

    if (lastLoginText.includes("hoje")) {
      daysAgo = 0
    } else if (lastLoginText.includes("ontem")) {
      daysAgo = 1
    } else if (lastLoginText.includes("dias")) {
      // Extrai o número de dias (ex: "3 dias atrás" -> 3)
      const match = lastLoginText.match(/(\d+)\s+dias/)
      if (match && match[1]) {
        daysAgo = Number.parseInt(match[1], 10)
      }
    } else if (lastLoginText.includes("semana")) {
      // Aproximadamente 7 dias para "1 semana atrás"
      daysAgo = 7
    }

    // Atualiza o nível de risco com base nos dias desde o último acesso
    if (daysAgo > 5) {
      riskLevel = "high"
    } else if (daysAgo >= 3 && daysAgo <= 5) {
      riskLevel = "medium"
    } else {
      riskLevel = "low"
    }

    return {
      ...student,
      riskLevel,
    }
  })

  return studentsWithUpdatedRisk
}

// Buscar um aluno por ID
export async function fetchStudentById(id: string) {
  // Simula atraso da API
  await new Promise((resolve) => setTimeout(resolve, 800))
  const student = students.find((s) => s.id === id)

  if (!student) {
    throw new Error(`Aluno com ID ${id} não encontrado`)
  }

  // Determina o nível de risco com base no último acesso
  let riskLevel = student.riskLevel

  // Extrai o número de dias do último acesso
  const lastLoginText = student.lastLogin.toLowerCase()
  let daysAgo = 0

  if (lastLoginText.includes("hoje")) {
    daysAgo = 0
  } else if (lastLoginText.includes("ontem")) {
    daysAgo = 1
  } else if (lastLoginText.includes("dias")) {
    // Extrai o número de dias (ex: "3 dias atrás" -> 3)
    const match = lastLoginText.match(/(\d+)\s+dias/)
    if (match && match[1]) {
      daysAgo = Number.parseInt(match[1], 10)
    }
  } else if (lastLoginText.includes("semana")) {
    // Aproximadamente 7 dias para "1 semana atrás"
    daysAgo = 7
  }

  // Atualiza o nível de risco com base nos dias desde o último acesso
  if (daysAgo > 5) {
    riskLevel = "high"
  } else if (daysAgo >= 3 && daysAgo <= 5) {
    riskLevel = "medium"
  } else {
    riskLevel = "low"
  }

  return {
    ...student,
    riskLevel,
  }
}

// Buscar dados de atividade do aluno
export async function fetchStudentActivity(studentId: string) {
  // Simula atraso da API
  await new Promise((resolve) => setTimeout(resolve, 1200))

  try {
    // Busca o aluno para determinar o nível de risco
    const student = students.find((s) => s.id === studentId)
    if (!student) {
      throw new Error(`Aluno com ID ${studentId} não encontrado`)
    }

    // Gera dados de atividade de exemplo para os últimos 30 dias
    const dates = Array.from({ length: 30 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (29 - i))
      return date.toLocaleDateString("pt-BR", { month: "short", day: "numeric" })
    })

    // Gera dados de atividade aleatórios com base no nível de risco do aluno
    let baseLoginRate = 5
    let baseResourceRate = 8
    let baseForumRate = 3

    if (student.riskLevel === "high") {
      baseLoginRate = 2
      baseResourceRate = 3
      baseForumRate = 1
    } else if (student.riskLevel === "medium") {
      baseLoginRate = 3
      baseResourceRate = 5
      baseForumRate = 2
    }

    const logins = dates.map(() => Math.floor(Math.random() * baseLoginRate) + 1)
    const resourceAccess = dates.map(() => Math.floor(Math.random() * baseResourceRate) + 1)
    const forumActivity = dates.map(() => Math.floor(Math.random() * baseForumRate))

    // Adiciona uma tendência de declínio para alunos de alto risco
    if (student.riskLevel === "high") {
      for (let i = 20; i < 30; i++) {
        logins[i] = Math.max(0, logins[i] - 1)
        resourceAccess[i] = Math.max(0, resourceAccess[i] - 2)
        forumActivity[i] = 0
      }
    }

    return {
      dates,
      logins,
      resourceAccess,
      forumActivity,
    }
  } catch (error) {
    console.error("Erro ao gerar dados de atividade:", error)
    throw error
  }
}

// Buscar dados de notas do aluno
export async function fetchStudentGrades(studentId: string) {
  // Simula atraso da API
  await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    const student = students.find((s) => s.id === studentId)

    if (!student) {
      throw new Error(`Aluno com ID ${studentId} não encontrado`)
    }

    // Adiciona média da turma para cada curso
    const coursesWithAverage = student.courses.map((course) => ({
      ...course,
      classAverage: Math.min(100, Math.max(60, course.grade + (Math.random() * 10 - 5))),
    }))

    return {
      courses: coursesWithAverage,
    }
  } catch (error) {
    console.error("Erro ao buscar notas do aluno:", error)
    throw error
  }
}

// Analisar dados do aluno com IA
export async function analyzeStudentData(studentId: string) {
  // Simula atraso da API
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const student = await fetchStudentById(studentId)
  const activityData = await fetchStudentActivity(studentId)
  const gradesData = await fetchStudentGrades(studentId)

  // Combina todos os dados para análise de IA
  const analysisData = {
    student,
    activity: activityData,
    grades: gradesData,
  }

  // Em um app real, isso chamaria uma API de IA como OpenAI
  const analysis = await generateAIAnalysis(analysisData)

  return analysis
}

// Buscar todos os cursos
export async function fetchCourses() {
  // Simula atraso da API
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Extrai cursos únicos de todos os alunos
  const allCourses = students.flatMap((student) => student.courses)
  const uniqueCourses = Array.from(new Map(allCourses.map((course) => [course.id, course])).values())

  // Adiciona estatísticas para cada curso
  const coursesWithStats = uniqueCourses.map((course) => {
    const studentsInCourse = students.filter((student) => student.courses.some((c) => c.id === course.id))

    const totalStudents = studentsInCourse.length
    const highRiskStudents = studentsInCourse.filter((s) => s.riskLevel === "high").length
    const avgGrade =
      studentsInCourse.reduce((sum, student) => {
        const courseData = student.courses.find((c) => c.id === course.id)
        return sum + (courseData ? courseData.grade : 0)
      }, 0) / totalStudents

    const avgEngagement = Math.floor(Math.random() * 30) + 60 // Simulação de engajamento entre 60-90%

    return {
      ...course,
      totalStudents,
      highRiskStudents,
      avgGrade: Math.round(avgGrade),
      avgEngagement,
    }
  })

  return coursesWithStats
}

// Buscar alunos por curso
export async function fetchStudentsByCourse(courseId: number) {
  // Simula atraso da API
  await new Promise((resolve) => setTimeout(resolve, 1200))

  // Filtra alunos matriculados no curso
  const studentsInCourse = students.filter((student) => student.courses.some((course) => course.id === courseId))

  return studentsInCourse
}

// Buscar relatórios
export async function fetchReports() {
  // Simula atraso da API
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Calcula estatísticas gerais
  const totalStudents = students.length
  const highRiskCount = students.filter((s) => s.riskLevel === "high").length
  const mediumRiskCount = students.filter((s) => s.riskLevel === "medium").length
  const lowRiskCount = students.filter((s) => s.riskLevel === "low").length

  const avgAttendance = students.reduce((sum, s) => sum + s.attendance, 0) / totalStudents
  const avgAssignmentCompletion = students.reduce((sum, s) => sum + s.assignmentCompletion, 0) / totalStudents
  const avgGrade = students.reduce((sum, s) => sum + s.averageGrade, 0) / totalStudents

  // Gera relatórios de exemplo
  const reports = [
    {
      id: "R001",
      title: "Relatório de Risco de Evasão - Resumo",
      date: "15 Out, 2024",
      author: "Sistema EduInsight",
      summary: `Total de ${totalStudents} alunos analisados. ${highRiskCount} (${Math.round((highRiskCount / totalStudents) * 100)}%) em alto risco, ${mediumRiskCount} (${Math.round((mediumRiskCount / totalStudents) * 100)}%) em médio risco, e ${lowRiskCount} (${Math.round((lowRiskCount / totalStudents) * 100)}%) em baixo risco.`,
      metrics: {
        avgAttendance: Math.round(avgAttendance),
        avgAssignmentCompletion: Math.round(avgAssignmentCompletion),
        avgGrade: Math.round(avgGrade),
      },
      type: "summary",
    },
    {
      id: "R002",
      title: "Análise de Engajamento por Curso",
      date: "14 Out, 2024",
      author: "Sistema EduInsight",
      summary: "Análise detalhada do engajamento dos alunos em cada curso, identificando padrões e tendências.",
      type: "engagement",
    },
    {
      id: "R003",
      title: "Relatório de Intervenções Recomendadas",
      date: "13 Out, 2024",
      author: "Sistema EduInsight",
      summary: "Lista de intervenções recomendadas para alunos de alto risco, com base na análise de IA.",
      type: "interventions",
    },
    {
      id: "R004",
      title: "Tendências de Desempenho - Último Trimestre",
      date: "10 Out, 2024",
      author: "Sistema EduInsight",
      summary: "Análise das tendências de desempenho dos alunos ao longo do último trimestre.",
      type: "performance",
    },
    {
      id: "R005",
      title: "Análise Comparativa de Programas Acadêmicos",
      date: "5 Out, 2024",
      author: "Sistema EduInsight",
      summary: "Comparação do desempenho e taxas de retenção entre diferentes programas acadêmicos.",
      type: "comparative",
    },
  ]

  return reports
}

// Modificar a função generateReportPDF para usar TXT em vez de PDF
export async function generateReportPDF(report: any) {
  // Simula atraso de geração do arquivo
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Em um app real, isso geraria um arquivo e o disponibilizaria para download
  console.log(`Gerando arquivo de texto para o relatório: ${report.title}`)

  try {
    // Cria conteúdo mais detalhado para o arquivo
    let reportContent = `
    RELATÓRIO: ${report.title}
    Data: ${report.date}
    Autor: ${report.author}
    
    RESUMO
    ${report.summary}
    
    `

    // Adiciona métricas se disponíveis
    if (report.metrics) {
      reportContent += `
    MÉTRICAS
    Frequência Média: ${report.metrics.avgAttendance}%
    Conclusão de Tarefas: ${report.metrics.avgAssignmentCompletion}%
    Nota Média: ${report.metrics.avgGrade}%
      `
    }

    // Adiciona recomendações baseadas no tipo de relatório
    reportContent += `
    RECOMENDAÇÕES
    `

    if (report.type === "summary") {
      reportContent += `
    • Monitorar de perto os alunos de alto risco identificados
    • Implementar intervenções precoces para alunos com frequência abaixo de 70%
    • Revisar o conteúdo dos cursos com maior taxa de evasão
      `
    } else if (report.type === "engagement") {
      reportContent += `
    • Aumentar atividades interativas nos cursos com baixo engajamento
    • Implementar sistema de recompensas para participação ativa
    • Criar mais oportunidades de colaboração entre alunos
      `
    } else if (report.type === "interventions") {
      reportContent += `
    • Agendar reuniões individuais com alunos de alto risco
    • Oferecer tutoria adicional para tópicos desafiadores
    • Considerar ajustes nos prazos para alunos com dificuldades específicas
      `
    }

    // Simula download do arquivo como TXT
    const blob = new Blob([reportContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = `Relatório_${report.id}_${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)

    URL.revokeObjectURL(url)

    return true
  } catch (error) {
    console.error("Erro ao gerar arquivo:", error)
    throw new Error("Falha ao gerar o arquivo do relatório")
  }
}

// Modificar a função generateCourseReportPDF para usar TXT em vez de PDF
export async function generateCourseReportPDF(course: any, students: any[]) {
  // Simula atraso de geração do arquivo
  await new Promise((resolve) => setTimeout(resolve, 2000))

  try {
    // Cria conteúdo mais detalhado para o arquivo do curso
    let reportContent = `
    RELATÓRIO DO CURSO: ${course.name} (${course.code})
    Instrutor: ${course.instructor}
    
    ESTATÍSTICAS GERAIS
    Total de Alunos: ${course.totalStudents}
    Nota Média: ${course.avgGrade}%
    Engajamento: ${course.avgEngagement}%
    Alunos em Alto Risco: ${course.highRiskStudents} (${Math.round((course.highRiskStudents / course.totalStudents) * 100)}%)
    
    ALUNOS MATRICULADOS
    `

    // Adiciona lista de alunos se disponível
    if (students && students.length > 0) {
      students.forEach((student, index) => {
        const courseData = student.courses.find((c: any) => c.id === course.id) || {}
        reportContent += `
    ${index + 1}. ${student.name} (ID: ${student.id})
       Nota: ${courseData.grade || "N/A"}%
       Frequência: ${student.attendance}%
       Risco: ${student.riskLevel.toUpperCase()}
        `
      })
    }

    // Adiciona recomendações baseadas no nível de risco do curso
    reportContent += `
    RECOMENDAÇÕES
    `

    if (course.highRiskStudents / course.totalStudents > 0.2) {
      reportContent += `
    • Realizar uma revisão do conteúdo e metodologia do curso
    • Implementar sessões de reforço para tópicos desafiadores
    • Agendar reuniões individuais com alunos de alto risco
    • Considerar ajustes no cronograma e prazos de entrega
      `
    } else if (course.highRiskStudents / course.totalStudents > 0.1) {
      reportContent += `
    • Monitorar de perto os alunos identificados como de risco médio
    • Oferecer recursos adicionais para tópicos específicos
    • Implementar verificações de progresso regulares
      `
    } else {
      reportContent += `
    • Manter a abordagem atual, que está funcionando bem
    • Considerar usar este curso como modelo para outros cursos
    • Documentar as práticas bem-sucedidas para compartilhamento
      `
    }

    // Simula download do arquivo como TXT
    const blob = new Blob([reportContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = `Relatório_Curso_${course.code}_${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)

    URL.revokeObjectURL(url)

    return true
  } catch (error) {
    console.error("Erro ao gerar arquivo do curso:", error)
    throw new Error("Falha ao gerar o arquivo do relatório do curso")
  }
}

// Buscar eventos do calendário
export async function fetchCalendarEvents() {
  // Simula atraso da API
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Data atual para referência
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  // Gera eventos para o mês atual
  const events = [
    {
      id: "E001",
      title: "Prazo Final - Projeto de CS201",
      date: new Date(currentYear, currentMonth, 15),
      type: "deadline",
      course: "CS201",
      description: "Entrega do projeto final de Estruturas de Dados e Algoritmos",
    },
    {
      id: "E002",
      title: "Reunião com Alunos de Alto Risco",
      date: new Date(currentYear, currentMonth, 18),
      type: "meeting",
      description: "Reunião com orientadores acadêmicos para discutir intervenções para alunos de alto risco",
    },
    {
      id: "E003",
      title: "Workshop de Apoio Acadêmico",
      date: new Date(currentYear, currentMonth, 20),
      type: "workshop",
      description: "Workshop sobre técnicas de estudo e gestão do tempo para alunos",
    },
    {
      id: "E004",
      title: "Avaliação Intermediária - CS101",
      date: new Date(currentYear, currentMonth, 22),
      type: "exam",
      course: "CS101",
      description: "Avaliação intermediária de Introdução à Ciência da Computação",
    },
    {
      id: "E005",
      title: "Prazo Final - Relatório de DS302",
      date: new Date(currentYear, currentMonth, 25),
      type: "deadline",
      course: "DS302",
      description: "Entrega do relatório de análise de dados para Mineração de Dados",
    },
    {
      id: "E006",
      title: "Sessão de Mentoria entre Pares",
      date: new Date(currentYear, currentMonth, 27),
      type: "mentoring",
      description: "Sessão de mentoria entre alunos de alto desempenho e alunos em risco",
    },
    {
      id: "E007",
      title: "Revisão para Exames Finais",
      date: new Date(currentYear, currentMonth, 29),
      type: "review",
      description: "Sessão de revisão para preparação para exames finais",
    },
  ]

  return events
}

// Buscar dados para análises
export async function fetchAnalyticsData() {
  // Simula atraso da API
  await new Promise((resolve) => setTimeout(resolve, 1200))

  // Gera dados para diferentes tipos de análises

  // 1. Tendência de engajamento ao longo do tempo (últimos 6 meses)
  const months = ["Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro"]
  const engagementTrend = {
    labels: months,
    datasets: [
      {
        label: "Frequência Média",
        data: [75, 78, 72, 80, 82, 79],
      },
      {
        label: "Conclusão de Tarefas",
        data: [70, 72, 68, 75, 78, 76],
      },
      {
        label: "Participação em Fóruns",
        data: [60, 65, 58, 68, 72, 70],
      },
    ],
  }

  // 2. Distribuição de risco por programa acadêmico
  const riskByProgram = [
    {
      program: "Ciência da Computação",
      highRisk: 4,
      mediumRisk: 3,
      lowRisk: 2,
    },
    {
      program: "Engenharia de Software",
      highRisk: 2,
      mediumRisk: 1,
      lowRisk: 1,
    },
    {
      program: "Ciência de Dados",
      highRisk: 1,
      mediumRisk: 1,
      lowRisk: 2,
    },
    {
      program: "Sistemas de Informação",
      highRisk: 1,
      mediumRisk: 2,
      lowRisk: 1,
    },
    {
      program: "Engenharia da Computação",
      highRisk: 1,
      mediumRisk: 1,
      lowRisk: 2,
    },
  ]

  // 3. Correlação entre métricas e risco de evasão
  const riskCorrelation = [
    { metric: "Frequência", correlation: 0.85 },
    { metric: "Conclusão de Tarefas", correlation: 0.78 },
    { metric: "Notas", correlation: 0.72 },
    { metric: "Participação em Fóruns", correlation: 0.65 },
    { metric: "Acesso a Recursos", correlation: 0.6 },
    { metric: "Tempo de Resposta", correlation: 0.55 },
  ]

  // 4. Eficácia das intervenções
  const interventionEffectiveness = [
    { intervention: "Mentoria Individual", effectiveness: 85 },
    { intervention: "Sessões de Estudo em Grupo", effectiveness: 75 },
    { intervention: "Recursos Adicionais", effectiveness: 65 },
    { intervention: "Ajustes de Prazos", effectiveness: 60 },
    { intervention: "Workshops de Habilidades", effectiveness: 70 },
  ]

  return {
    engagementTrend,
    riskByProgram,
    riskCorrelation,
    interventionEffectiveness,
  }
}
