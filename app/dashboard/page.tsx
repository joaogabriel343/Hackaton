"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2, RefreshCw, AlertTriangle, Sparkles, TrendingUp, TrendingDown, Users, BookOpen } from "lucide-react"
import { fetchStudents } from "@/lib/api"
import { StudentRiskChart } from "@/components/student-risk-chart"
import { CourseEngagementChart } from "@/components/course-engagement-chart"
import { StudentTable } from "@/components/student-table"
import { toast } from "@/components/ui/use-toast"

export default function Dashboard() {
  const [students, setStudents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [recommendations, setRecommendations] = useState<{
    highPriority: string[]
    mediumPriority: string[]
    longTerm: string[]
  } | null>(null)
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false)
  const [isRateLimit, setIsRateLimit] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchStudents()
        setStudents(data)
      } catch (error) {
        console.error("Falha ao buscar alunos:", error)
        toast({
          variant: "destructive",
          title: "Erro ao carregar dados",
          description: "Não foi possível carregar os dados dos alunos. Tente novamente mais tarde.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const totalStudents = students.length
  const highRiskCount = students.filter((student: any) => student.riskLevel === "high").length
  const mediumRiskCount = students.filter((student: any) => student.riskLevel === "medium").length
  const lowRiskCount = students.filter((student: any) => student.riskLevel === "low").length

  const highRiskPercentage = totalStudents ? Math.round((highRiskCount / totalStudents) * 100) : 0
  const mediumRiskPercentage = totalStudents ? Math.round((mediumRiskCount / totalStudents) * 100) : 0
  const lowRiskPercentage = totalStudents ? Math.round((lowRiskCount / totalStudents) * 100) : 0

  const loadRecommendations = async () => {
    if (isLoadingRecommendations) return

    setIsLoadingRecommendations(true)
    setIsRateLimit(false)
    try {
      const dashboardData = {
        totalStudents,
        highRiskCount,
        mediumRiskCount,
        lowRiskCount,
        highRiskPercentage,
        mediumRiskPercentage,
        lowRiskPercentage,
      }

      const response = await fetch("/api/ai/recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dashboardData }),
      })

      if (!response.ok) {
        if (response.status === 429) {
          setIsRateLimit(true)
          throw new Error("Limite de taxa da API atingido")
        }
        throw new Error(`Erro na API: ${response.status}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      if (
        !data.recommendations ||
        !data.recommendations.highPriority ||
        !data.recommendations.mediumPriority ||
        !data.recommendations.longTerm
      ) {
        throw new Error("Formato de resposta inválido")
      }

      setRecommendations(data.recommendations)

      // Exibir toast de sucesso
      toast({
        title: "Recomendações atualizadas",
        description: "As recomendações foram geradas com sucesso pelo Gemini AI.",
      })
    } catch (error) {
      console.error("Erro ao carregar recomendações:", error)
      toast({
        variant: "destructive",
        title: "Erro ao gerar recomendações",
        description: "Não foi possível gerar recomendações com IA. Tente novamente mais tarde.",
      })

      setRecommendations({
        highPriority: [
          "Não foi possível gerar recomendações específicas de alta prioridade.",
          "Tente novamente mais tarde ou contate o suporte técnico.",
          "O serviço de IA pode estar temporariamente indisponível.",
          "Verifique sua conexão com a internet e tente novamente.",
        ],
        mediumPriority: [
          "Não foi possível gerar recomendações específicas de média prioridade.",
          "Tente novamente mais tarde ou contate o suporte técnico.",
          "O serviço de IA pode estar temporariamente indisponível.",
          "Verifique sua conexão com a internet e tente novamente.",
        ],
        longTerm: [
          "Não foi possível gerar estratégias específicas de longo prazo.",
          "Tente novamente mais tarde ou contate o suporte técnico.",
          "O serviço de IA pode estar temporariamente indisponível.",
          "Verifique sua conexão com a internet e tente novamente.",
        ],
      })
    } finally {
      setIsLoadingRecommendations(false)
    }
  }

  useEffect(() => {
    if (activeTab === "recommendations" && !recommendations && !isLoadingRecommendations && !isLoading) {
      loadRecommendations()
    }
  }, [activeTab, recommendations, isLoadingRecommendations, isLoading])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 gradient-text">Dashboard</h1>
        <p className="text-muted-foreground">Monitore o engajamento dos alunos e o risco de evasão</p>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
            <p className="text-muted-foreground">Carregando dados do dashboard...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-8 grid gap-6 md:grid-cols-4">
            <Card className="card-hover overflow-hidden">
              <CardHeader className="pb-2 relative">
                <div className="absolute top-0 right-0 h-16 w-16 rounded-bl-full bg-primary/10"></div>
                <CardTitle className="text-sm font-medium">Total de Alunos</CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="flex items-center">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">{totalStudents}</div>
                    <p className="text-xs text-muted-foreground">Em todos os cursos</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover overflow-hidden">
              <CardHeader className="pb-2 relative">
                <div className="absolute top-0 right-0 h-16 w-16 rounded-bl-full bg-destructive/10"></div>
                <CardTitle className="text-sm font-medium">Alunos de Alto Risco</CardTitle>
                <CardDescription className="text-xs">Sem acesso há mais de 5 dias</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="flex items-center">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                    <TrendingUp className="h-6 w-6 text-destructive" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-destructive">{highRiskCount}</div>
                    <Progress
                      value={highRiskPercentage}
                      className="mt-2 h-1.5 bg-destructive/20"
                      indicatorClassName="bg-destructive"
                    />
                    <p className="mt-1 text-xs text-muted-foreground">{highRiskPercentage}% do total</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover overflow-hidden">
              <CardHeader className="pb-2 relative">
                <div className="absolute top-0 right-0 h-16 w-16 rounded-bl-full bg-warning/10"></div>
                <CardTitle className="text-sm font-medium">Alunos de Médio Risco</CardTitle>
                <CardDescription className="text-xs">Sem acesso entre 3 e 5 dias</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="flex items-center">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-warning/10">
                    <TrendingDown className="h-6 w-6 text-warning" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-warning">{mediumRiskCount}</div>
                    <Progress
                      value={mediumRiskPercentage}
                      className="mt-2 h-1.5 bg-warning/20"
                      indicatorClassName="bg-warning"
                    />
                    <p className="mt-1 text-xs text-muted-foreground">{mediumRiskPercentage}% do total</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover overflow-hidden">
              <CardHeader className="pb-2 relative">
                <div className="absolute top-0 right-0 h-16 w-16 rounded-bl-full bg-success/10"></div>
                <CardTitle className="text-sm font-medium">Alunos de Baixo Risco</CardTitle>
                <CardDescription className="text-xs">Acesso nos últimos 2 dias</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="flex items-center">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
                    <TrendingDown className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-success">{lowRiskCount}</div>
                    <Progress
                      value={lowRiskPercentage}
                      className="mt-2 h-1.5 bg-success/20"
                      indicatorClassName="bg-success"
                    />
                    <p className="mt-1 text-xs text-muted-foreground">{lowRiskPercentage}% do total</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="mb-6" value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-4 rounded-full h-12">
              <TabsTrigger value="overview" className="rounded-full">
                Visão Geral
              </TabsTrigger>
              <TabsTrigger value="students" className="rounded-full">
                Alunos
              </TabsTrigger>
              <TabsTrigger value="courses" className="rounded-full">
                Cursos
              </TabsTrigger>
              <TabsTrigger value="recommendations" className="rounded-full">
                Recomendações
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-8">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="card-hover">
                  <CardHeader>
                    <CardTitle>Distribuição de Risco dos Alunos</CardTitle>
                    <CardDescription>Divisão de alunos por nível de risco</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <StudentRiskChart data={students} />
                    </div>
                  </CardContent>
                </Card>
                <Card className="card-hover">
                  <CardHeader>
                    <CardTitle>Engajamento nos Cursos</CardTitle>
                    <CardDescription>Métricas médias de engajamento por curso</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <CourseEngagementChart />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="students" className="mt-8">
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle>Análise de Risco dos Alunos</CardTitle>
                  <CardDescription>Visão detalhada de todos os alunos e seus fatores de risco</CardDescription>
                </CardHeader>
                <CardContent>
                  <StudentTable students={students} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="courses" className="mt-8">
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle>Análise de Cursos</CardTitle>
                  <CardDescription>Taxas de engajamento e conclusão por curso</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        id: 1,
                        name: "Introdução à Ciência da Computação",
                        code: "CS101",
                        students: 45,
                        avgEngagement: 78,
                        highRiskCount: 5,
                      },
                      {
                        id: 2,
                        name: "Estruturas de Dados e Algoritmos",
                        code: "CS201",
                        students: 38,
                        avgEngagement: 65,
                        highRiskCount: 8,
                      },
                      {
                        id: 3,
                        name: "Sistemas de Banco de Dados",
                        code: "CS301",
                        students: 32,
                        avgEngagement: 82,
                        highRiskCount: 3,
                      },
                      {
                        id: 4,
                        name: "Desenvolvimento Web",
                        code: "CS401",
                        students: 28,
                        avgEngagement: 75,
                        highRiskCount: 4,
                      },
                    ].map((course) => (
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
                                {course.code} • {course.students} alunos
                              </p>
                            </div>
                          </div>
                          <Badge
                            variant={course.highRiskCount > 5 ? "destructive" : "outline"}
                            className={course.highRiskCount > 5 ? "" : "bg-muted"}
                          >
                            {course.highRiskCount} alto risco
                          </Badge>
                        </div>
                        <div className="mt-4">
                          <div className="mb-1 flex items-center justify-between text-sm">
                            <span>Engajamento</span>
                            <span>{course.avgEngagement}%</span>
                          </div>
                          <Progress
                            value={course.avgEngagement}
                            className="h-2"
                            indicatorClassName={
                              course.avgEngagement < 70
                                ? "bg-destructive"
                                : course.avgEngagement < 80
                                  ? "bg-warning"
                                  : "bg-success"
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations" className="mt-8">
              <Card className="card-hover">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle>Recomendações Geradas por IA</CardTitle>
                      <div className="flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                        <Sparkles className="mr-1 h-3 w-3" />
                        Gemini
                      </div>
                    </div>
                    <CardDescription>Insights acionáveis para melhorar a retenção de alunos</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={loadRecommendations}
                    disabled={isLoadingRecommendations}
                    className="rounded-full"
                  >
                    {isLoadingRecommendations ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Gerando...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Atualizar
                      </>
                    )}
                  </Button>
                </CardHeader>
                <CardContent>
                  {isLoadingRecommendations ? (
                    <div className="flex h-64 flex-col items-center justify-center gap-4">
                      <div className="h-12 w-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
                      <p className="text-center text-muted-foreground">
                        Gerando recomendações personalizadas com IA...
                      </p>
                    </div>
                  ) : recommendations ? (
                    <div className="space-y-6">
                      <div className="rounded-xl border-2 border-destructive/20 bg-destructive/5 p-6">
                        <h3 className="flex items-center gap-2 font-medium text-destructive mb-4">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-destructive/20">
                            <span className="text-xs font-bold text-destructive">1</span>
                          </div>
                          Alta Prioridade
                        </h3>
                        <ul className="space-y-3">
                          {recommendations.highPriority.map((rec, index) => (
                            <li key={`high-${index}`} className="flex items-start gap-2">
                              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-destructive"></span>
                              <span className="text-foreground">{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="rounded-xl border-2 border-warning/20 bg-warning/5 p-6">
                        <h3 className="flex items-center gap-2 font-medium text-warning mb-4">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-warning/20">
                            <span className="text-xs font-bold text-warning">2</span>
                          </div>
                          Média Prioridade
                        </h3>
                        <ul className="space-y-3">
                          {recommendations.mediumPriority.map((rec, index) => (
                            <li key={`medium-${index}`} className="flex items-start gap-2">
                              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-warning"></span>
                              <span className="text-foreground">{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="rounded-xl border-2 border-success/20 bg-success/5 p-6">
                        <h3 className="flex items-center gap-2 font-medium text-success mb-4">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-success/20">
                            <span className="text-xs font-bold text-success">3</span>
                          </div>
                          Estratégias de Longo Prazo
                        </h3>
                        <ul className="space-y-3">
                          {recommendations.longTerm.map((rec, index) => (
                            <li key={`long-${index}`} className="flex items-start gap-2">
                              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-success"></span>
                              <span className="text-foreground">{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {isRateLimit && (
                        <div className="mt-4 flex items-center gap-2 rounded-md bg-amber-50 p-3 text-amber-800 dark:bg-amber-950 dark:text-amber-200">
                          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                          <p className="text-sm">
                            Estas recomendações foram geradas com dados de fallback devido a limitações temporárias da
                            API do Gemini.
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex h-64 flex-col items-center justify-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <Sparkles className="h-8 w-8 text-primary" />
                      </div>
                      <p className="text-center text-muted-foreground">
                        Clique em "Atualizar" para gerar recomendações personalizadas com IA.
                      </p>
                      <Button onClick={loadRecommendations} className="rounded-full">
                        Gerar Recomendações
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
}
