"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download } from "lucide-react"
import { fetchStudentsByCourse, generateCourseReportPDF } from "@/lib/api"
import { toast } from "@/components/ui/use-toast"
import { CourseStudentsChart } from "@/components/course-students-chart"
import { CoursePerformanceChart } from "@/components/course-performance-chart"

interface CourseDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  course: any
}

export function CourseDetailsModal({ isOpen, onClose, course }: CourseDetailsModalProps) {
  const [students, setStudents] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDownloading, setIsDownloading] = useState(false)

  useEffect(() => {
    const loadStudents = async () => {
      if (!isOpen) return

      setIsLoading(true)
      try {
        // Em um app real, isso buscaria os alunos matriculados no curso
        const data = await fetchStudentsByCourse(course.id)
        setStudents(data)
      } catch (error) {
        console.error("Falha ao buscar alunos do curso:", error)
        toast({
          variant: "destructive",
          title: "Erro ao carregar alunos",
          description: "Não foi possível carregar os alunos matriculados neste curso.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadStudents()
  }, [isOpen, course.id])

  // Atualizar referências a PDF para Texto no modal de detalhes do curso
  const handleDownloadReport = async () => {
    try {
      setIsDownloading(true)

      // Gera o arquivo de texto do relatório do curso
      await generateCourseReportPDF(course, students)

      toast({
        title: "Relatório baixado com sucesso",
        description: `O relatório do curso "${course.name}" foi baixado como arquivo de texto.`,
      })
    } catch (error) {
      console.error("Erro ao baixar relatório do curso:", error)
      toast({
        variant: "destructive",
        title: "Erro ao baixar relatório",
        description: "Não foi possível baixar o relatório do curso. Tente novamente mais tarde.",
      })
    } finally {
      setIsDownloading(false)
    }
  }

  const getRiskBadge = (riskLevel: string) => {
    switch (riskLevel) {
      case "high":
        return <Badge variant="destructive">Alto Risco</Badge>
      case "medium":
        return (
          <Badge variant="warning" className="bg-amber-500 hover:bg-amber-600">
            Médio Risco
          </Badge>
        )
      case "low":
        return (
          <Badge variant="success" className="bg-green-500 hover:bg-green-600">
            Baixo Risco
          </Badge>
        )
      default:
        return <Badge variant="outline">Desconhecido</Badge>
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{course.name}</DialogTitle>
          <DialogDescription>
            {course.code} • {course.instructor}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-4">
          <TabsList>
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="students">Alunos</TabsTrigger>
            <TabsTrigger value="analytics">Análises</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4 space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total de Alunos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{course.totalStudents}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Nota Média</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{course.avgGrade}%</div>
                  <Progress
                    value={course.avgGrade}
                    className="mt-2 h-2"
                    indicatorClassName={
                      course.avgGrade < 65 ? "bg-red-500" : course.avgGrade < 75 ? "bg-amber-500" : "bg-green-500"
                    }
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Engajamento</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{course.avgEngagement}%</div>
                  <Progress
                    value={course.avgEngagement}
                    className="mt-2 h-2"
                    indicatorClassName={
                      course.avgEngagement < 65
                        ? "bg-red-500"
                        : course.avgEngagement < 75
                          ? "bg-amber-500"
                          : "bg-green-500"
                    }
                  />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Detalhes do Curso</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="mb-2 font-medium">Informações Gerais</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Código:</span>
                        <span>{course.code}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Instrutor:</span>
                        <span>{course.instructor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Créditos:</span>
                        <span>{course.credits || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 font-medium">Estatísticas de Risco</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Alunos em Alto Risco:</span>
                        <span>
                          {course.highRiskStudents} (
                          {Math.round((course.highRiskStudents / course.totalStudents) * 100)}%)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Taxa de Aprovação:</span>
                        <span>{100 - Math.round((course.highRiskStudents / course.totalStudents) * 100)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Nível de Risco do Curso:</span>
                        <span>
                          {course.highRiskStudents / course.totalStudents > 0.2 ? (
                            <Badge variant="destructive">Alto</Badge>
                          ) : course.highRiskStudents / course.totalStudents > 0.1 ? (
                            <Badge variant="warning" className="bg-amber-500 hover:bg-amber-600">
                              Médio
                            </Badge>
                          ) : (
                            <Badge variant="success" className="bg-green-500 hover:bg-green-600">
                              Baixo
                            </Badge>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recomendações</CardTitle>
                <CardDescription>Sugestões baseadas na análise de dados do curso</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {course.highRiskStudents / course.totalStudents > 0.2 ? (
                    <>
                      <p className="text-sm">• Realizar uma revisão do conteúdo e metodologia do curso</p>
                      <p className="text-sm">• Implementar sessões de reforço para tópicos desafiadores</p>
                      <p className="text-sm">• Agendar reuniões individuais com alunos de alto risco</p>
                      <p className="text-sm">• Considerar ajustes no cronograma e prazos de entrega</p>
                    </>
                  ) : course.highRiskStudents / course.totalStudents > 0.1 ? (
                    <>
                      <p className="text-sm">• Monitorar de perto os alunos identificados como de risco médio</p>
                      <p className="text-sm">• Oferecer recursos adicionais para tópicos específicos</p>
                      <p className="text-sm">• Implementar verificações de progresso regulares</p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm">• Manter a abordagem atual, que está funcionando bem</p>
                      <p className="text-sm">• Considerar usar este curso como modelo para outros cursos</p>
                      <p className="text-sm">• Documentar as práticas bem-sucedidas para compartilhamento</p>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Alunos Matriculados</CardTitle>
                <CardDescription>
                  {isLoading ? "Carregando alunos..." : `${students.length} alunos matriculados neste curso`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex h-40 items-center justify-center">
                    <p>Carregando dados dos alunos...</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>Nota</TableHead>
                        <TableHead>Frequência</TableHead>
                        <TableHead>Conclusão de Tarefas</TableHead>
                        <TableHead>Risco</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center">
                            Nenhum aluno encontrado
                          </TableCell>
                        </TableRow>
                      ) : (
                        students.map((student) => {
                          // Encontra os dados do curso específico para este aluno
                          const courseData = student.courses.find((c: any) => c.id === course.id) || {}

                          return (
                            <TableRow key={student.id}>
                              <TableCell>{student.id}</TableCell>
                              <TableCell className="font-medium">{student.name}</TableCell>
                              <TableCell>{courseData.grade || "N/A"}%</TableCell>
                              <TableCell>{student.attendance}%</TableCell>
                              <TableCell>{student.assignmentCompletion}%</TableCell>
                              <TableCell>{getRiskBadge(student.riskLevel)}</TableCell>
                            </TableRow>
                          )
                        })
                      )}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-4 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Distribuição de Alunos por Risco</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">{!isLoading && <CourseStudentsChart students={students} />}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Desempenho dos Alunos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    {!isLoading && <CoursePerformanceChart students={students} courseId={course.id} />}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
          <div className="flex space-x-2">
            <Button variant="default" onClick={handleDownloadReport} disabled={isDownloading}>
              {isDownloading ? (
                "Baixando..."
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Baixar Relatório
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
