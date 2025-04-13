"use client"

import { useState } from "react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ArrowUpDown } from "lucide-react"

interface StudentTableProps {
  students: any[]
}

export function StudentTable({ students }: StudentTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<string>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toString().includes(searchTerm) ||
      student.program.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortField === "riskLevel") {
      const riskOrder = { high: 3, medium: 2, low: 1 }
      const aValue = riskOrder[a.riskLevel as keyof typeof riskOrder] || 0
      const bValue = riskOrder[b.riskLevel as keyof typeof riskOrder] || 0
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    }

    const aValue = a[sortField]
    const bValue = b[sortField]

    if (typeof aValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return sortDirection === "asc" ? aValue - bValue : bValue - aValue
  })

  const getRiskBadge = (riskLevel: string, lastLogin: string) => {
    const getBadgeStyle = (level: string) => {
      const baseClasses = "w-full justify-center font-medium py-1.5 px-3"
      switch (level) {
        case "high":
          return `${baseClasses} bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 border border-red-200 dark:border-red-800`
        case "medium":
          return `${baseClasses} bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border border-amber-200 dark:border-amber-800`
        case "low":
          return `${baseClasses} bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-800`
        default:
          return `${baseClasses} bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700`
      }
    }

    const getRiskIcon = (level: string) => {
      switch (level) {
        case "high":
          return <div className="h-2 w-2 rounded-full bg-red-500 mr-1.5"></div>
        case "medium":
          return <div className="h-2 w-2 rounded-full bg-amber-500 mr-1.5"></div>
        case "low":
          return <div className="h-2 w-2 rounded-full bg-green-500 mr-1.5"></div>
        default:
          return <div className="h-2 w-2 rounded-full bg-gray-500 mr-1.5"></div>
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
      <div className="flex flex-col items-center space-y-2">
        <div className={`rounded-md flex items-center ${getBadgeStyle(riskLevel)}`}>
          {getRiskIcon(riskLevel)}
          {getRiskText(riskLevel)}
        </div>
        <span className="text-xs text-muted-foreground text-center">{lastLogin}</span>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar alunos..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("name")} className="flex items-center gap-1 p-0">
                  Nome
                  {sortField === "name" && <ArrowUpDown className="h-4 w-4" />}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("id")} className="flex items-center gap-1 p-0">
                  ID
                  {sortField === "id" && <ArrowUpDown className="h-4 w-4" />}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("program")} className="flex items-center gap-1 p-0">
                  Programa
                  {sortField === "program" && <ArrowUpDown className="h-4 w-4" />}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("attendance")}
                  className="flex items-center gap-1 p-0"
                >
                  Frequência
                  {sortField === "attendance" && <ArrowUpDown className="h-4 w-4" />}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("averageGrade")}
                  className="flex items-center gap-1 p-0"
                >
                  Nota Média
                  {sortField === "averageGrade" && <ArrowUpDown className="h-4 w-4" />}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("riskLevel")} className="flex items-center gap-1 p-0">
                  Nível de Risco
                  {sortField === "riskLevel" && <ArrowUpDown className="h-4 w-4" />}
                </Button>
              </TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  Nenhum aluno encontrado
                </TableCell>
              </TableRow>
            ) : (
              sortedStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>{student.program}</TableCell>
                  <TableCell>{student.attendance}%</TableCell>
                  <TableCell>{student.averageGrade}%</TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center">{getRiskBadge(student.riskLevel, student.lastLogin)}</div>
                  </TableCell>
                  <TableCell>
                    <Link href={`/dashboard/students/${student.id}`}>
                      <Button variant="outline" size="sm">
                        Visualizar
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
