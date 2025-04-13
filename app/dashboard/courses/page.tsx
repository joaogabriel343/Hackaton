"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"
import { fetchCourses } from "@/lib/api"
import { toast } from "@/components/ui/use-toast"
import { CourseDetailsModal } from "@/components/course-details-modal"

export default function CoursesPage() {
  const [courses, setCourses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [riskFilter, setRiskFilter] = useState("all")
  const [selectedCourse, setSelectedCourse] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchCourses()
        setCourses(data)
      } catch (error) {
        console.error("Falha ao buscar cursos:", error)
        toast({
          variant: "destructive",
          title: "Erro ao carregar cursos",
          description: "Não foi possível carregar os dados dos cursos. Tente novamente mais tarde.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Filtra os cursos com base no termo de pesquisa e filtro de risco
  const filteredCourses = courses.filter((course: any) => {
    // Filtro de pesquisa
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())

    // Filtro de risco
    const riskPercentage = course.highRiskStudents / course.totalStudents
    const matchesRisk =
      riskFilter === "all" ||
      (riskFilter === "high" && riskPercentage > 0.2) ||
      (riskFilter === "medium" && riskPercentage > 0.1 && riskPercentage <= 0.2) ||
      (riskFilter === "low" && riskPercentage <= 0.1)

    return matchesSearch && matchesRisk
  })

  // Calcula estatísticas
  const totalCourses = courses.length
  const totalStudents = courses.reduce((sum: number, course: any) => sum + course.totalStudents, 0)
  const avgEngagement =
    courses.length > 0
      ? Math.round(courses.reduce((sum: number, course: any) => sum + course.avgEngagement, 0) / courses.length)
      : 0
  const highRiskCourses = courses.filter((course: any) => course.highRiskStudents / course.totalStudents > 0.2).length

  const handleViewCourseDetails = (course: any) => {
    setSelectedCourse(course)
    setIsModalOpen(true)
  }

  return (
    <main className="flex-1 overflow-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Gerenciamento de Cursos</h1>
        <p className="text-muted-foreground">Visualize e analise todos os cursos do sistema</p>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <p>Carregando dados dos cursos...</p>
        </div>
      ) : (
        <>
          {/* Resumo de estatísticas */}
          <div className="mb-6 grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total de Cursos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalCourses}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total de Alunos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalStudents}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Engajamento Médio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{avgEngagement}%</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Cursos de Alto Risco</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-500">{highRiskCourses}</div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((highRiskCourses / totalCourses) * 100)}% do total
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Filtros e pesquisa */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar cursos por nome, código ou instrutor..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={riskFilter} onValueChange={setRiskFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrar por nível de risco" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os níveis de risco</SelectItem>
                    <SelectItem value="high">Alto Risco</SelectItem>
                    <SelectItem value="medium">Médio Risco</SelectItem>
                    <SelectItem value="low">Baixo Risco</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Visualização de cursos */}
          <Tabs defaultValue="table" className="mb-6">
            <TabsList>
              <TabsTrigger value="table">Tabela</TabsTrigger>
              <TabsTrigger value="cards">Cartões</TabsTrigger>
            </TabsList>

            <TabsContent value="table" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Lista de Cursos</CardTitle>
                  <CardDescription>{filteredCourses.length} cursos encontrados</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Código</TableHead>
                        <TableHead>Nome do Curso</TableHead>
                        <TableHead>Instrutor</TableHead>
                        <TableHead>Alunos</TableHead>
                        <TableHead>Nota Média</TableHead>
                        <TableHead>Engajamento</TableHead>
                        <TableHead>Risco</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCourses.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center">
                            Nenhum curso encontrado
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredCourses.map((course: any) => (
                          <TableRow key={course.id}>
                            <TableCell className="font-medium">{course.code}</TableCell>
                            <TableCell>{course.name}</TableCell>
                            <TableCell>{course.instructor}</TableCell>
                            <TableCell>{course.totalStudents}</TableCell>
                            <TableCell>{course.avgGrade}%</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress
                                  value={course.avgEngagement}
                                  className="h-2 w-24"
                                  indicatorClassName={
                                    course.avgEngagement < 65
                                      ? "bg-red-500"
                                      : course.avgEngagement < 75
                                        ? "bg-amber-500"
                                        : "bg-green-500"
                                  }
                                />
                                <span>{course.avgEngagement}%</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  course.highRiskStudents / course.totalStudents > 0.2
                                    ? "destructive"
                                    : course.highRiskStudents / course.totalStudents > 0.1
                                      ? "outline"
                                      : "default"
                                }
                              >
                                {course.highRiskStudents} alto risco
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm" onClick={() => handleViewCourseDetails(course)}>
                                Detalhes
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cards" className="mt-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredCourses.length === 0 ? (
                  <p className="col-span-full text-center">Nenhum curso encontrado</p>
                ) : (
                  filteredCourses.map((course: any) => (
                    <Card key={course.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle>{course.name}</CardTitle>
                            <CardDescription>
                              {course.code} • {course.instructor}
                            </CardDescription>
                          </div>
                          <Badge
                            variant={
                              course.highRiskStudents / course.totalStudents > 0.2
                                ? "destructive"
                                : course.highRiskStudents / course.totalStudents > 0.1
                                  ? "outline"
                                  : "default"
                            }
                          >
                            {course.highRiskStudents} alto risco
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="mb-1 flex items-center justify-between text-sm">
                              <span>Alunos</span>
                              <span>{course.totalStudents}</span>
                            </div>
                          </div>
                          <div>
                            <div className="mb-1 flex items-center justify-between text-sm">
                              <span>Nota Média</span>
                              <span>{course.avgGrade}%</span>
                            </div>
                            <Progress
                              value={course.avgGrade}
                              className="h-2"
                              indicatorClassName={
                                course.avgGrade < 65
                                  ? "bg-red-500"
                                  : course.avgGrade < 75
                                    ? "bg-amber-500"
                                    : "bg-green-500"
                              }
                            />
                          </div>
                          <div>
                            <div className="mb-1 flex items-center justify-between text-sm">
                              <span>Engajamento</span>
                              <span>{course.avgEngagement}%</span>
                            </div>
                            <Progress
                              value={course.avgEngagement}
                              className="h-2"
                              indicatorClassName={
                                course.avgEngagement < 65
                                  ? "bg-red-500"
                                  : course.avgEngagement < 75
                                    ? "bg-amber-500"
                                    : "bg-green-500"
                              }
                            />
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={() => handleViewCourseDetails(course)}
                          >
                            Ver Detalhes
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}

      {/* Modal de detalhes do curso */}
      {selectedCourse && (
        <CourseDetailsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} course={selectedCourse} />
      )}
    </main>
  )
}
