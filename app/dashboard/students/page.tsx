"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { fetchStudents } from "@/lib/api"
import { StudentTable } from "@/components/student-table"

export default function StudentsPage() {
  const [students, setStudents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [riskFilter, setRiskFilter] = useState("all")
  const [programFilter, setProgramFilter] = useState("all")

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchStudents()
        setStudents(data)
      } catch (error) {
        console.error("Falha ao buscar alunos:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Filtra os alunos com base nos critérios de pesquisa e filtros
  const filteredStudents = students.filter((student: any) => {
    // Filtro de pesquisa
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toString().includes(searchTerm) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.program.toLowerCase().includes(searchTerm.toLowerCase())

    // Filtro de nível de risco
    const matchesRisk = riskFilter === "all" || student.riskLevel === riskFilter

    // Filtro de programa
    const matchesProgram = programFilter === "all" || student.program === programFilter

    return matchesSearch && matchesRisk && matchesProgram
  })

  // Extrai programas únicos para o filtro
  const uniquePrograms = Array.from(new Set(students.map((student: any) => student.program)))

  // Calcula estatísticas
  const totalStudents = students.length
  const highRiskCount = students.filter((student: any) => student.riskLevel === "high").length
  const mediumRiskCount = students.filter((student: any) => student.riskLevel === "medium").length
  const lowRiskCount = students.filter((student: any) => student.riskLevel === "low").length

  return (
    <main className="flex-1 overflow-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Gerenciamento de Alunos</h1>
        <p className="text-muted-foreground">Visualize e gerencie todos os alunos do sistema</p>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <p>Carregando dados dos alunos...</p>
        </div>
      ) : (
        <>
          {/* Resumo de estatísticas */}
          <div className="mb-6 grid gap-4 md:grid-cols-4">
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
                <CardTitle className="text-sm font-medium">Alto Risco</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-500">{highRiskCount}</div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((highRiskCount / totalStudents) * 100)}% do total
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Médio Risco</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-500">{mediumRiskCount}</div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((mediumRiskCount / totalStudents) * 100)}% do total
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Baixo Risco</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">{lowRiskCount}</div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((lowRiskCount / totalStudents) * 100)}% do total
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Classificação de Risco</CardTitle>
                <CardDescription>Baseada no último acesso do aluno ao Moodle</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-destructive"></div>
                      <span className="text-sm">Alto Risco</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Sem acesso há mais de 5 dias</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-warning"></div>
                      <span className="text-sm">Médio Risco</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Sem acesso entre 3 e 5 dias</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-success"></div>
                      <span className="text-sm">Baixo Risco</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Acesso nos últimos 2 dias</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filtros e pesquisa */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar alunos..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={riskFilter} onValueChange={setRiskFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrar por risco" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os níveis de risco</SelectItem>
                    <SelectItem value="high">Alto Risco</SelectItem>
                    <SelectItem value="medium">Médio Risco</SelectItem>
                    <SelectItem value="low">Baixo Risco</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={programFilter} onValueChange={setProgramFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrar por programa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os programas</SelectItem>
                    {uniquePrograms.map((program: string) => (
                      <SelectItem key={program} value={program}>
                        {program}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Tabela de alunos */}
          <Card>
            <CardHeader>
              <CardTitle>Lista de Alunos</CardTitle>
              <CardDescription>{filteredStudents.length} alunos encontrados</CardDescription>
            </CardHeader>
            <CardContent>
              <StudentTable students={filteredStudents} />
            </CardContent>
          </Card>
        </>
      )}
    </main>
  )
}
