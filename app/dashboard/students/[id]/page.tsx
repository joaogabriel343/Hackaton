"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, BookOpen, Calendar, Clock, AlertTriangle, Sparkles, User, Mail, Phone, School } from "lucide-react"
import { fetchStudentById } from "@/lib/api"
import { toast } from "@/components/ui/use-toast"

export default function StudentDetail() {
  const { id } = useParams()
  const [student, setStudent] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null)
  const [isAnalysisLoading, setIsAnalysisLoading] = useState(false)
  const [isRateLimit, setIsRateLimit] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchStudentById(id as string)
        setStudent(data)
      } catch (error) {
        console.error("Falha ao buscar aluno:", error)
        toast({
          variant: "destructive",
          title: "Erro ao carregar dados",
          description: "Não foi possível carregar os dados do aluno. Tente novamente mais tarde.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [id])

  const generateAiAnalysis = async () => {
    if (!student) return

    setIsAnalysisLoading(true)
    setAiAnalysis(null)
    setIsRateLimit(false)

    try {
      const studentDataForAnalysis = {
        id: student.id,
        name: student.name,
        email: student.email,
        program: student.program,
        yearLevel: student.yearLevel,
        attendance: student.attendance,
        assignmentCompletion: student.assignmentCompletion,
        averageGrade: student.averageGrade,
        riskLevel: student.riskLevel,
        lastLogin: student.lastLogin,
        creditsCompleted: student.creditsCompleted,
        academicStanding: student.academicStanding,
        courses: student.courses.map((course: any) => ({
          name: course.name,
          grade: course.grade,
          lastActivity: course.lastActivity,
        })),
      }

      const response = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studentData: studentDataForAnalysis }),
      })

      if (!response.ok) {
        throw new Error(`Falha ao gerar análise: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()

      if (!data.analysis) {
        throw new Error("A resposta da API não contém uma análise")
      }

      setAiAnalysis(data.analysis)
      setIsRateLimit(data.isRateLimit || false)
    } catch (error) {
      console.error("Falha ao gerar análise de IA:", error)
      toast({
        variant: "destructive",
        title: "Erro na análise",
        description: "Não foi possível gerar a análise de IA. Tente novamente mais tarde.",
      })
      setAiAnalysis(
        "Não foi possível gerar a análise de IA neste momento. Erro: " +
          (error instanceof Error ? error.message : "Desconhecido"),
      )
    } finally {
      setIsAnalysisLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
          <p className="text-muted-foreground">Carregando dados do aluno...</p>
        </div>
      </div>
    )
  }

  if (!student) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Aluno não encontrado</p>
      </div>
    )
  }

  const getRiskBadge = (riskLevel: string, lastLogin: string) => {
    const getBadgeStyle = (level: string) => {
      switch (level) {
        case "high":
          return "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md shadow-red-500/20"
        case "medium":
          return "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md shadow-amber-500/20"
        case "low":
          return "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md shadow-green-500/20"
        default:
          return "bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-md shadow-gray-500/20"
      }
    }

    const getRiskIcon = (level: string) => {
      switch (level) {
        case "high":
          return <div className="h-3 w-3 rounded-full bg-white mr-2 animate-pulse"></div>
        case "medium":
          return <div className="h-3 w-3 rounded-full bg-white mr-2"></div>
        case "low":
          return <div className="h-3 w-3 rounded-full bg-white mr-2"></div>
        default:
          return <div className="h-3 w-3 rounded-full bg-white mr-2"></div>
      }
    }

    const getRiskText = (level: string) => {
      switch (level) {
        case "high":
          return "Alto Risco"
        case "medium":
          return "Médio Risco"
        case "low":
          return "Baixo Risco"
        default:
          return "Desconhecido"
      }
    }

    return (
      <div className="flex flex-col items-center">
        <div className={`rounded-full px-4 py-2 flex items-center ${getBadgeStyle(riskLevel)}`}>
          {getRiskIcon(riskLevel)}
          <span className="font-medium">{getRiskText(riskLevel)}</span>
        </div>
        <span className="mt-2 text-xs text-muted-foreground">Último acesso: {lastLogin}</span>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <Link href="/dashboard/students">
          <Button variant="ghost" size="sm" className="rounded-full">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Alunos
          </Button>
        </Link>
      </div>

      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <User className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold gradient-text">{student.name}</h1>
            <p className="text-muted-foreground">
              ID do Aluno: {student.id} • {student.program}
            </p>
          </div>
        </div>
        <div>{getRiskBadge(student.riskLevel, student.lastLogin)}</div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="card-hover overflow-hidden">
          <CardHeader className="pb-2 relative">
            <div className="absolute top-0 right-0 h-16 w-16 rounded-bl-full bg-primary/10"></div>
            <CardTitle className="text-sm font-medium">Taxa de Frequência</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{student.attendance}%</div>
            <Progress
              value={student.attendance}
              className="mt-2 h-2"
              indicatorClassName={
                student.attendance < 70 ? "bg-destructive" : student.attendance < 85 ? "bg-warning" : "bg-success"
              }
            />
            <p className="mt-1 text-xs text-muted-foreground">
              {student.attendance < 70 ? "Abaixo da média" : student.attendance < 85 ? "Na média" : "Acima da média"}
            </p>
          </CardContent>
        </Card>
        <Card className="card-hover overflow-hidden">
          <CardHeader className="pb-2 relative">
            <div className="absolute top-0 right-0 h-16 w-16 rounded-bl-full bg-primary/10"></div>
            <CardTitle className="text-sm font-medium">Conclusão de Tarefas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{student.assignmentCompletion}%</div>
            <Progress
              value={student.assignmentCompletion}
              className="mt-2 h-2"
              indicatorClassName={
                student.assignmentCompletion < 70
                  ? "bg-destructive"
                  : student.assignmentCompletion < 85
                    ? "bg-warning"
                    : "bg-success"
              }
            />
            <p className="mt-1 text-xs text-muted-foreground">
              {student.assignmentCompletion < 70
                ? "Abaixo da média"
                : student.assignmentCompletion < 85
                  ? "Na média"
                  : "Acima da média"}
            </p>
          </CardContent>
        </Card>
        <Card className="card-hover overflow-hidden">
          <CardHeader className="pb-2 relative">
            <div className="absolute top-0 right-0 h-16 w-16 rounded-bl-full bg-primary/10"></div>
            <CardTitle className="text-sm font-medium">Nota Média</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{student.averageGrade}%</div>
            <Progress
              value={student.averageGrade}
              className="mt-2 h-2"
              indicatorClassName={
                student.averageGrade < 60 ? "bg-destructive" : student.averageGrade < 75 ? "bg-warning" : "bg-success"
              }
            />
            <p className="mt-1 text-xs text-muted-foreground">
              {student.averageGrade < 60
                ? "Abaixo da média"
                : student.averageGrade < 75
                  ? "Na média"
                  : "Acima da média"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="mt-8">
        <TabsList className="rounded-full h-12">
          <TabsTrigger value="overview" className="rounded-full">
            Visão Geral
          </TabsTrigger>
          <TabsTrigger value="ai-analysis" className="rounded-full">
            Análise de IA
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Informações do Aluno</CardTitle>
              <CardDescription>Detalhes básicos e informações de matrícula</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{student.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Telefone</p>
                      <p className="font-medium">{student.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Data de Matrícula</p>
                      <p className="font-medium">{student.enrollmentDate}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <School className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Programa</p>
                      <p className="font-medium">{student.program}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Créditos Concluídos</p>
                      <p className="font-medium">{student.creditsCompleted}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Orientador</p>
                      <p className="font-medium">{student.advisor}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Cursos Matriculados</CardTitle>
              <CardDescription>Matrícula em cursos do semestre atual</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {student.courses.map((course: any) => (
                  <div
                    key={course.id}
                    className="rounded-xl border p-4 transition-all hover:shadow-md hover:bg-card/50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{course.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {course.code} • {course.instructor}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={course.grade < 60 ? "destructive" : course.grade < 75 ? "outline" : "default"}
                        className={course.grade < 60 ? "" : course.grade < 75 ? "bg-muted" : ""}
                      >
                        {course.grade}%
                      </Badge>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                      <div className="flex items-center">
                        <BookOpen className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>{course.credits} créditos</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>{course.schedule}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>Última atividade: {course.lastActivity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-analysis" className="mt-6">
          <Card className="card-hover">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CardTitle>Análise de Risco Gerada por IA</CardTitle>
                <div className="flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                  <Sparkles className="mr-1 h-3 w-3" />
                  Gemini
                </div>
              </div>
              <CardDescription>Insights e recomendações baseados nos dados do aluno</CardDescription>
            </CardHeader>
            <CardContent>
              {aiAnalysis ? (
                <div className="whitespace-pre-line rounded-xl border bg-muted/50 p-6 text-foreground">
                  {aiAnalysis}
                  {isRateLimit && (
                    <div className="mt-6 flex items-center gap-2 rounded-md bg-amber-50 p-4 text-amber-800 dark:bg-amber-950 dark:text-amber-200">
                      <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                      <p className="text-sm">
                        Esta análise foi gerada com dados de fallback devido a limitações temporárias da API do Gemini.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-6 py-12">
                  {isAnalysisLoading ? (
                    <>
                      <div className="h-12 w-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
                      <p className="text-muted-foreground">Gerando análise com Gemini...</p>
                    </>
                  ) : (
                    <>
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                        <Sparkles className="h-10 w-10 text-primary" />
                      </div>
                      <div className="text-center">
                        <p className="mb-2">Clique no botão abaixo para gerar uma análise de IA com o Gemini</p>
                        <p className="text-sm text-muted-foreground mb-4">
                          A análise incluirá insights sobre o risco de evasão e recomendações personalizadas
                        </p>
                      </div>
                      <Button onClick={generateAiAnalysis} className="rounded-full">
                        Gerar Análise
                      </Button>
                    </>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
