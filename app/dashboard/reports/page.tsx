"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Search, Loader2, FileText, AlertTriangle } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

export default function ReportsPage() {
  const [reports, setReports] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isGenerating, setIsGenerating] = useState<{ [key: string]: boolean }>({})
  const [isDownloading, setIsDownloading] = useState<{ [key: string]: boolean }>({})
  const [isRateLimit, setIsRateLimit] = useState<{ [key: string]: boolean }>({})
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const filteredReports = reports.filter(
    (report: any) =>
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getReportsByType = (type: string) => {
    if (type === "all") return filteredReports
    return filteredReports.filter((report) => report.type === type)
  }

  const handleGenerateReport = async (reportType: string) => {
    if (isGenerating[reportType]) return

    setIsGenerating({ ...isGenerating, [reportType]: true })
    try {
      const response = await fetch("/api/ai/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reportType }),
      })

      if (!response.ok) {
        if (response.status === 429) {
          setIsRateLimit({ ...isRateLimit, [reportType]: true })
          throw new Error("Limite de taxa da API atingido")
        }
        throw new Error(`Erro na API: ${response.status}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setReports((prevReports) => {
        const filteredReports = prevReports.filter((report) => report.type !== reportType)
        return [...filteredReports, data.report]
      })

      setIsRateLimit({ ...isRateLimit, [reportType]: false })

      toast({
        title: "Relatório gerado com sucesso",
        description: `O relatório "${data.report.title}" foi gerado com sucesso.`,
      })

      setActiveTab(reportType)
    } catch (error) {
      console.error("Erro ao gerar relatório:", error)
      toast({
        variant: "destructive",
        title: "Erro ao gerar relatório",
        description: "Não foi possível gerar o relatório. Tente novamente mais tarde.",
        action: <ToastAction altText="Tentar novamente">Tentar novamente</ToastAction>,
      })
    } finally {
      setIsGenerating({ ...isGenerating, [reportType]: false })
    }
  }

  const handleDownloadReport = async (report: any) => {
    try {
      setIsDownloading({ ...isDownloading, [report.id]: true })

      const textContent = `
    RELATÓRIO: ${report.title}
    Data: ${report.date}
    Autor: ${report.author}
    
    RESUMO
    ${report.summary}
    
    ${
      report.metrics
        ? `
    MÉTRICAS
    Frequência Média: ${report.metrics.avgAttendance}%
    Conclusão de Tarefas: ${report.metrics.avgAssignmentCompletion}%
    Nota Média: ${report.metrics.avgGrade}%
    `
        : ""
    }
    `

      const blob = new Blob([textContent], { type: "text/plain" })
      const url = URL.createObjectURL(blob)

      const a = document.createElement("a")
      a.href = url
      a.download = `Relatório_${report.id}_${new Date().toISOString().split("T")[0]}.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)

      URL.revokeObjectURL(url)

      toast({
        title: "Relatório baixado com sucesso",
        description: `O relatório "${report.title}" foi baixado como arquivo de texto.`,
      })
    } catch (error) {
      console.error("Erro ao baixar relatório:", error)
      toast({
        variant: "destructive",
        title: "Erro ao baixar relatório",
        description: "Não foi possível baixar o relatório. Tente novamente mais tarde.",
        action: <ToastAction altText="Tentar novamente">Tentar novamente</ToastAction>,
      })
    } finally {
      setIsDownloading({ ...isDownloading, [report.id]: false })
    }
  }

  return (
    <main className="flex-1 overflow-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Relatórios</h1>
        <p className="text-muted-foreground">Acesse e gere relatórios detalhados sobre o desempenho dos alunos</p>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <p>Carregando relatórios...</p>
        </div>
      ) : (
        <>
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar relatórios..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="all" className="mb-6" value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="summary">Resumo</TabsTrigger>
              <TabsTrigger value="engagement">Engajamento</TabsTrigger>
              <TabsTrigger value="performance">Desempenho</TabsTrigger>
              <TabsTrigger value="interventions">Intervenções</TabsTrigger>
              <TabsTrigger value="comparative">Comparativo</TabsTrigger>
            </TabsList>

            {["all", "summary", "engagement", "performance", "interventions", "comparative"].map((type) => (
              <TabsContent key={type} value={type} className="mt-6">
                <div className="grid gap-4 md:grid-cols-2">
                  {getReportsByType(type).length === 0 ? (
                    <div className="col-span-2 flex h-64 flex-col items-center justify-center gap-4 rounded-lg border p-6">
                      <FileText className="h-12 w-12 text-muted-foreground" />
                      <div className="text-center">
                        <h3 className="text-lg font-medium">Nenhum relatório encontrado</h3>
                        <p className="mt-1 text-sm text-muted-foreground">Gere um novo relatório usando o Gemini AI</p>
                      </div>
                      <Button
                        onClick={() => handleGenerateReport(type === "all" ? "summary" : type)}
                        disabled={isGenerating[type === "all" ? "summary" : type]}
                      >
                        {isGenerating[type === "all" ? "summary" : type] ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Gerando...
                          </>
                        ) : (
                          <>Gerar Relatório</>
                        )}
                      </Button>
                    </div>
                  ) : (
                    getReportsByType(type).map((report: any) => (
                      <Card key={report.id} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <CardTitle>{report.title}</CardTitle>
                          <CardDescription>
                            {report.date} • {report.author}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="max-h-64 overflow-y-auto mb-4">
                            <p className="whitespace-pre-line text-sm text-muted-foreground">{report.summary}</p>
                          </div>
                          {report.metrics && (
                            <div className="mb-4 grid grid-cols-3 gap-2 rounded-lg border p-2">
                              <div className="text-center">
                                <p className="text-xs text-muted-foreground">Frequência</p>
                                <p className="text-lg font-medium">{report.metrics.avgAttendance}%</p>
                              </div>
                              <div className="text-center">
                                <p className="text-xs text-muted-foreground">Conclusão</p>
                                <p className="text-lg font-medium">{report.metrics.avgAssignmentCompletion}%</p>
                              </div>
                              <div className="text-center">
                                <p className="text-xs text-muted-foreground">Nota Média</p>
                                <p className="text-lg font-medium">{report.metrics.avgGrade}%</p>
                              </div>
                            </div>
                          )}
                          {isRateLimit[report.type] && (
                            <div className="mb-4 flex items-center gap-2 rounded-md bg-amber-50 p-3 text-amber-800">
                              <AlertTriangle className="h-5 w-5 text-amber-600" />
                              <p className="text-sm">
                                Este relatório foi gerado com dados de fallback devido a limitações temporárias da API
                                do Gemini.
                              </p>
                            </div>
                          )}
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              onClick={() => handleDownloadReport(report)}
                              disabled={isDownloading[report.id]}
                            >
                              {isDownloading[report.id] ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Baixando...
                                </>
                              ) : (
                                <>
                                  <Download className="mr-2 h-4 w-4" />
                                  Baixar Relatório
                                </>
                              )}
                            </Button>
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => handleGenerateReport(report.type)}
                              disabled={isGenerating[report.type]}
                            >
                              {isGenerating[report.type] ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <FileText className="h-4 w-4" />
                              )}
                              <span className="sr-only">Atualizar</span>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle>Gerar Novo Relatório</CardTitle>
              <CardDescription>Selecione o tipo de relatório que deseja gerar com Gemini AI</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Button
                  variant="outline"
                  className="h-auto flex-col items-center justify-center gap-2 p-4"
                  onClick={() => handleGenerateReport("summary")}
                  disabled={isGenerating["summary"]}
                >
                  {isGenerating["summary"] ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    <FileText className="h-6 w-6" />
                  )}
                  <div className="text-center">
                    <p className="font-medium">Relatório de Resumo</p>
                    <p className="text-xs text-muted-foreground">Visão geral da situação de evasão</p>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="h-auto flex-col items-center justify-center gap-2 p-4"
                  onClick={() => handleGenerateReport("engagement")}
                  disabled={isGenerating["engagement"]}
                >
                  {isGenerating["engagement"] ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    <FileText className="h-6 w-6" />
                  )}
                  <div className="text-center">
                    <p className="font-medium">Relatório de Engajamento</p>
                    <p className="text-xs text-muted-foreground">Análise de engajamento por curso</p>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="h-auto flex-col items-center justify-center gap-2 p-4"
                  onClick={() => handleGenerateReport("performance")}
                  disabled={isGenerating["performance"]}
                >
                  {isGenerating["performance"] ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    <FileText className="h-6 w-6" />
                  )}
                  <div className="text-center">
                    <p className="font-medium">Relatório de Desempenho</p>
                    <p className="text-xs text-muted-foreground">Tendências de desempenho dos alunos</p>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="h-auto flex-col items-center justify-center gap-2 p-4"
                  onClick={() => handleGenerateReport("interventions")}
                  disabled={isGenerating["interventions"]}
                >
                  {isGenerating["interventions"] ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    <FileText className="h-6 w-6" />
                  )}
                  <div className="text-center">
                    <p className="font-medium">Relatório de Intervenções</p>
                    <p className="text-xs text-muted-foreground">Recomendações para alunos em risco</p>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="h-auto flex-col items-center justify-center gap-2 p-4"
                  onClick={() => handleGenerateReport("comparative")}
                  disabled={isGenerating["comparative"]}
                >
                  {isGenerating["comparative"] ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    <FileText className="h-6 w-6" />
                  )}
                  <div className="text-center">
                    <p className="font-medium">Relatório Comparativo</p>
                    <p className="text-xs text-muted-foreground">Comparação entre programas acadêmicos</p>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="h-auto flex-col items-center justify-center gap-2 p-4"
                  onClick={() => handleGenerateReport("all")}
                  disabled={isGenerating["all"]}
                >
                  {isGenerating["all"] ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    <FileText className="h-6 w-6" />
                  )}
                  <div className="text-center">
                    <p className="font-medium">Relatório Completo</p>
                    <p className="text-xs text-muted-foreground">Análise abrangente de todos os aspectos</p>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </main>
  )
}
