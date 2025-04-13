"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Loader2, RefreshCw, AlertTriangle } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { EngagementTrendChart } from "@/components/engagement-trend-chart"
import { RiskByProgramChart } from "@/components/risk-by-program-chart"
import { RiskCorrelationChart } from "@/components/risk-correlation-chart"
import { InterventionEffectivenessChart } from "@/components/intervention-effectiveness-chart"

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState<{ [key: string]: boolean }>({})
  const [isRateLimit, setIsRateLimit] = useState<{ [key: string]: boolean }>({})
  const [activeTab, setActiveTab] = useState("engagement")

  useEffect(() => {
    loadAllAnalyticsData()
  }, [])

  const loadAllAnalyticsData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/ai/analytics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ analysisType: "all" }),
      })

      if (!response.ok) {
        if (response.status === 429) {
          setIsRateLimit({ all: true })
          throw new Error("Limite de taxa da API atingido")
        }
        throw new Error(`Erro na API: ${response.status}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setAnalyticsData(data)
      setIsRateLimit({ all: false })
    } catch (error) {
      console.error("Erro ao carregar dados de análise:", error)
      toast({
        variant: "destructive",
        title: "Erro ao carregar análises",
        description: "Não foi possível carregar os dados de análise. Tente novamente mais tarde.",
      })

      setAnalyticsData({
        engagementTrend: {
          labels: ["Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro"],
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
        },
        riskByProgram: [
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
        ],
        riskCorrelation: [
          { metric: "Frequência", correlation: 0.85 },
          { metric: "Conclusão de Tarefas", correlation: 0.78 },
          { metric: "Notas", correlation: 0.72 },
          { metric: "Participação em Fóruns", correlation: 0.65 },
          { metric: "Acesso a Recursos", correlation: 0.6 },
          { metric: "Tempo de Resposta", correlation: 0.55 },
        ],
        interventionEffectiveness: [
          { intervention: "Mentoria Individual", effectiveness: 85 },
          { intervention: "Sessões de Estudo em Grupo", effectiveness: 75 },
          { intervention: "Recursos Adicionais", effectiveness: 65 },
          { intervention: "Ajustes de Prazos", effectiveness: 60 },
          { intervention: "Workshops de Habilidades", effectiveness: 70 },
        ],
        insights: {
          mainInsights: [
            "Não foi possível gerar insights específicos.",
            "Tente novamente mais tarde ou contate o suporte técnico.",
            "Os dados mostrados são exemplos genéricos.",
            "Recomendamos tentar novamente quando a API estiver disponível.",
          ],
          recommendations: [
            "Não foi possível gerar recomendações específicas.",
            "Tente novamente mais tarde ou contate o suporte técnico.",
            "Considere verificar sua conexão com a API do Gemini.",
            "Entre em contato com o suporte se o problema persistir.",
          ],
        },
      })

      setIsRateLimit({ all: true })
    } finally {
      setIsLoading(false)
    }
  }

  const refreshAnalyticsData = async (type: string) => {
    if (isRefreshing[type]) return

    setIsRefreshing({ ...isRefreshing, [type]: true })
    try {
      const response = await fetch("/api/ai/analytics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ analysisType: type }),
      })

      if (!response.ok) {
        if (response.status === 429) {
          setIsRateLimit({ ...isRateLimit, [type]: true })
          throw new Error("Limite de taxa da API atingido")
        }
        throw new Error(`Erro na API: ${response.status}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setAnalyticsData((prevData: any) => {
        if (!prevData) return { [type]: data }

        switch (type) {
          case "engagement":
            return { ...prevData, engagementTrend: data }
          case "riskByProgram":
            return { ...prevData, riskByProgram: data }
          case "correlation":
            return { ...prevData, riskCorrelation: data }
          case "interventions":
            return { ...prevData, interventionEffectiveness: data }
          case "insights":
            return { ...prevData, insights: data }
          default:
            return data
        }
      })

      setIsRateLimit({ ...isRateLimit, [type]: false })

      toast({
        title: "Dados atualizados",
        description: "Os dados de análise foram atualizados com sucesso.",
      })
    } catch (error) {
      console.error(`Erro ao atualizar dados de ${type}:`, error)
      toast({
        variant: "destructive",
        title: "Erro ao atualizar dados",
        description: "Não foi possível atualizar os dados. Tente novamente mais tarde.",
      })

      setIsRateLimit({ ...isRateLimit, [type]: true })
    } finally {
      setIsRefreshing({ ...isRefreshing, [type]: false })
    }
  }

  return (
    <main className="flex-1 overflow-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Análises Avançadas</h1>
          <p className="text-muted-foreground">
            Visualize tendências e insights detalhados sobre o desempenho dos alunos
          </p>
        </div>
        <Button variant="outline" onClick={loadAllAnalyticsData} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Carregando...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Atualizar Tudo
            </>
          )}
        </Button>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p>Gerando análises com IA...</p>
          </div>
        </div>
      ) : (
        <>
          <Tabs defaultValue="engagement" className="mb-6" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="engagement">Engajamento</TabsTrigger>
              <TabsTrigger value="risk">Risco por Programa</TabsTrigger>
              <TabsTrigger value="correlation">Correlações</TabsTrigger>
              <TabsTrigger value="interventions">Intervenções</TabsTrigger>
            </TabsList>

            <TabsContent value="engagement" className="mt-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Tendência de Engajamento ao Longo do Tempo</CardTitle>
                    <CardDescription>Análise de métricas de engajamento nos últimos 6 meses</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => refreshAnalyticsData("engagement")}
                    disabled={isRefreshing["engagement"]}
                  >
                    {isRefreshing["engagement"] ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCw className="h-4 w-4" />
                    )}
                    <span className="sr-only">Atualizar</span>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="h-96">
                    <EngagementTrendChart data={analyticsData?.engagementTrend} />
                  </div>
                  {isRateLimit["engagement"] && (
                    <div className="mt-4 flex items-center gap-2 rounded-md bg-amber-50 p-3 text-amber-800">
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                      <p className="text-sm">
                        Estes dados são exemplos genéricos devido a limitações temporárias da API do Gemini.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="risk" className="mt-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Distribuição de Risco por Programa Acadêmico</CardTitle>
                    <CardDescription>Análise de níveis de risco em diferentes programas</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => refreshAnalyticsData("riskByProgram")}
                    disabled={isRefreshing["riskByProgram"]}
                  >
                    {isRefreshing["riskByProgram"] ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCw className="h-4 w-4" />
                    )}
                    <span className="sr-only">Atualizar</span>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="h-96">
                    <RiskByProgramChart data={analyticsData?.riskByProgram} />
                  </div>
                  {isRateLimit["riskByProgram"] && (
                    <div className="mt-4 flex items-center gap-2 rounded-md bg-amber-50 p-3 text-amber-800">
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                      <p className="text-sm">
                        Estes dados são exemplos genéricos devido a limitações temporárias da API do Gemini.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="correlation" className="mt-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Correlação entre Métricas e Risco de Evasão</CardTitle>
                    <CardDescription>Análise de fatores que mais influenciam o risco de evasão</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => refreshAnalyticsData("correlation")}
                    disabled={isRefreshing["correlation"]}
                  >
                    {isRefreshing["correlation"] ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCw className="h-4 w-4" />
                    )}
                    <span className="sr-only">Atualizar</span>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="h-96">
                    <RiskCorrelationChart data={analyticsData?.riskCorrelation} />
                  </div>
                  {isRateLimit["correlation"] && (
                    <div className="mt-4 flex items-center gap-2 rounded-md bg-amber-50 p-3 text-amber-800">
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                      <p className="text-sm">
                        Estes dados são exemplos genéricos devido a limitações temporárias da API do Gemini.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="interventions" className="mt-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Eficácia das Intervenções</CardTitle>
                    <CardDescription>Análise do impacto de diferentes estratégias de intervenção</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => refreshAnalyticsData("interventions")}
                    disabled={isRefreshing["interventions"]}
                  >
                    {isRefreshing["interventions"] ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCw className="h-4 w-4" />
                    )}
                    <span className="sr-only">Atualizar</span>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="h-96">
                    <InterventionEffectivenessChart data={analyticsData?.interventionEffectiveness} />
                  </div>
                  {isRateLimit["interventions"] && (
                    <div className="mt-4 flex items-center gap-2 rounded-md bg-amber-50 p-3 text-amber-800">
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                      <p className="text-sm">
                        Estes dados são exemplos genéricos devido a limitações temporárias da API do Gemini.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Insights Principais</CardTitle>
                  <CardDescription>Conclusões baseadas na análise de dados</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => refreshAnalyticsData("insights")}
                  disabled={isRefreshing["insights"]}
                >
                  {isRefreshing["insights"] ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                  <span className="sr-only">Atualizar</span>
                </Button>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analyticsData?.insights?.mainInsights.map((insight: string, index: number) => (
                    <li key={`insight-${index}`} className="flex items-start gap-2">
                      <span
                        className={`mt-1 flex h-2 w-2 rounded-full ${
                          index === 0
                            ? "bg-red-500"
                            : index === 1
                              ? "bg-amber-500"
                              : index === 2
                                ? "bg-green-500"
                                : "bg-blue-500"
                        }`}
                      ></span>
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
                {isRateLimit["insights"] && (
                  <div className="mt-4 flex items-center gap-2 rounded-md bg-amber-50 p-3 text-amber-800">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                    <p className="text-sm">
                      Estes insights são exemplos genéricos devido a limitações temporárias da API do Gemini.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recomendações Baseadas em Dados</CardTitle>
                  <CardDescription>Ações sugeridas com base nas análises</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analyticsData?.insights?.recommendations.map((recommendation: string, index: number) => (
                    <li key={`recommendation-${index}`} className="flex items-start gap-2">
                      <span
                        className={`mt-1 flex h-2 w-2 rounded-full ${
                          index === 0
                            ? "bg-red-500"
                            : index === 1
                              ? "bg-amber-500"
                              : index === 2
                                ? "bg-green-500"
                                : "bg-blue-500"
                        }`}
                      ></span>
                      <span>{recommendation}</span>
                    </li>
                  ))}
                </ul>
                {isRateLimit["insights"] && (
                  <div className="mt-4 flex items-center gap-2 rounded-md bg-amber-50 p-3 text-amber-800">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                    <p className="text-sm">
                      Estas recomendações são exemplos genéricos devido a limitações temporárias da API do Gemini.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </main>
  )
}
