"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon } from "lucide-react"
import { fetchCalendarEvents } from "@/lib/api"

export default function CalendarPage() {
  const [events, setEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [filterType, setFilterType] = useState("all")

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchCalendarEvents()
        setEvents(data)
      } catch (error) {
        console.error("Falha ao buscar eventos do calendário:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Filtra eventos por tipo
  const filteredEvents = events.filter((event: any) => filterType === "all" || event.type === filterType)

  // Gera dias do mês atual
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth)

  // Nomes dos meses
  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ]

  // Verifica se um dia tem eventos
  const getEventsForDay = (day: number) => {
    return filteredEvents.filter((event: any) => {
      const eventDate = new Date(event.date)
      return (
        eventDate.getDate() === day && eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear
      )
    })
  }

  // Função para obter a cor do badge com base no tipo de evento
  const getEventBadgeColor = (type: string) => {
    switch (type) {
      case "deadline":
        return "bg-red-500 hover:bg-red-600"
      case "exam":
        return "bg-amber-500 hover:bg-amber-600"
      case "meeting":
        return "bg-blue-500 hover:bg-blue-600"
      case "workshop":
        return "bg-green-500 hover:bg-green-600"
      case "mentoring":
        return "bg-purple-500 hover:bg-purple-600"
      case "review":
        return "bg-indigo-500 hover:bg-indigo-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  return (
    <main className="flex-1 overflow-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Calendário Acadêmico</h1>
        <p className="text-muted-foreground">Visualize e gerencie eventos e prazos importantes</p>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <p>Carregando eventos do calendário...</p>
        </div>
      ) : (
        <>
          {/* Controles do calendário */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (currentMonth === 0) {
                        setCurrentMonth(11)
                        setCurrentYear(currentYear - 1)
                      } else {
                        setCurrentMonth(currentMonth - 1)
                      }
                    }}
                  >
                    Anterior
                  </Button>
                  <h2 className="text-lg font-medium">
                    {monthNames[currentMonth]} {currentYear}
                  </h2>
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (currentMonth === 11) {
                        setCurrentMonth(0)
                        setCurrentYear(currentYear + 1)
                      } else {
                        setCurrentMonth(currentMonth + 1)
                      }
                    }}
                  >
                    Próximo
                  </Button>
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filtrar por tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os eventos</SelectItem>
                    <SelectItem value="deadline">Prazos</SelectItem>
                    <SelectItem value="exam">Avaliações</SelectItem>
                    <SelectItem value="meeting">Reuniões</SelectItem>
                    <SelectItem value="workshop">Workshops</SelectItem>
                    <SelectItem value="mentoring">Mentorias</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Calendário */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="grid grid-cols-7 gap-1 text-center">
                {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
                  <div key={day} className="p-2 font-medium">
                    {day}
                  </div>
                ))}

                {/* Dias vazios antes do primeiro dia do mês */}
                {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                  <div key={`empty-${index}`} className="p-2"></div>
                ))}

                {/* Dias do mês */}
                {Array.from({ length: daysInMonth }).map((_, index) => {
                  const day = index + 1
                  const dayEvents = getEventsForDay(day)
                  const isToday =
                    day === new Date().getDate() &&
                    currentMonth === new Date().getMonth() &&
                    currentYear === new Date().getFullYear()

                  return (
                    <div
                      key={`day-${day}`}
                      className={`min-h-24 rounded-md border p-1 ${isToday ? "bg-muted border-primary" : ""}`}
                    >
                      <div className="text-right font-medium">{day}</div>
                      <div className="mt-1 flex flex-col gap-1">
                        {dayEvents.map((event: any) => (
                          <div key={event.id} className="rounded-sm p-1 text-xs">
                            <Badge className={getEventBadgeColor(event.type)}>
                              {event.title.length > 20 ? `${event.title.substring(0, 20)}...` : event.title}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Lista de eventos */}
          <Card>
            <CardHeader>
              <CardTitle>Próximos Eventos</CardTitle>
              <CardDescription>
                Lista de eventos para {monthNames[currentMonth]} {currentYear}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredEvents.length === 0 ? (
                  <p className="text-center text-muted-foreground">Nenhum evento encontrado</p>
                ) : (
                  filteredEvents
                    .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())
                    .map((event: any) => {
                      const eventDate = new Date(event.date)
                      // Só mostra eventos do mês atual
                      if (eventDate.getMonth() !== currentMonth || eventDate.getFullYear() !== currentYear) {
                        return null
                      }

                      return (
                        <div key={event.id} className="flex items-start gap-4 rounded-lg border p-4">
                          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-muted">
                            <CalendarIcon className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">{event.title}</h3>
                              <Badge className={getEventBadgeColor(event.type)}>
                                {event.type === "deadline"
                                  ? "Prazo"
                                  : event.type === "exam"
                                    ? "Avaliação"
                                    : event.type === "meeting"
                                      ? "Reunião"
                                      : event.type === "workshop"
                                        ? "Workshop"
                                        : event.type === "mentoring"
                                          ? "Mentoria"
                                          : event.type === "review"
                                            ? "Revisão"
                                            : "Evento"}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {eventDate.toLocaleDateString("pt-BR", {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                              })}
                            </p>
                            {event.description && <p className="mt-2 text-sm">{event.description}</p>}
                            {event.course && (
                              <p className="mt-1 text-xs text-muted-foreground">Curso: {event.course}</p>
                            )}
                          </div>
                        </div>
                      )
                    })
                    .filter(Boolean)
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </main>
  )
}
