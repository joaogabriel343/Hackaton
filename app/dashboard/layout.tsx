"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  BookOpen,
  Calendar,
  FileText,
  Home,
  MessageSquare,
  Users,
  Moon,
  Sun,
  Menu,
  X,
  LogOut,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isActive = (path: string) => {
    return pathname === path
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: Home },
    { path: "/dashboard/students", label: "Alunos", icon: Users },
    { path: "/dashboard/courses", label: "Cursos", icon: BookOpen },
    { path: "/dashboard/reports", label: "Relatórios", icon: FileText },
    { path: "/dashboard/analytics", label: "Análises", icon: BarChart },
    { path: "/dashboard/calendar", label: "Calendário", icon: Calendar },
    { path: "/dashboard/chat", label: "Assistente IA", icon: MessageSquare },
  ]

  return (
    <div className="flex min-h-screen overflow-hidden bg-background">
      {/* Mobile menu button */}
      <div className="fixed left-4 top-4 z-50 block md:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleMobileMenu}
          className="glass-effect border-purple-300/30 bg-purple-500/10"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile sidebar */}
      <div
        className={cn(
          "fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out md:hidden",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col bg-background/95 backdrop-blur-md p-4 border-r border-purple-300/20">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold bg-clip-text text-transparent bg-purple-gradient">EduInsight</h2>
              <p className="text-sm text-muted-foreground">Painel de Administração</p>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link href={item.path} key={item.path} onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    isActive(item.path) && "bg-purple-gradient text-white hover:bg-purple-gradient-hover",
                  )}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="mt-auto space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {mounted && theme === "dark" ? (
                <>
                  <Sun className="mr-2 h-4 w-4" />
                  Modo Claro
                </>
              ) : (
                <>
                  <Moon className="mr-2 h-4 w-4" />
                  Modo Escuro
                </>
              )}
            </Button>

            <Link href="/">
              <Button variant="ghost" className="w-full justify-start">
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col transition-all duration-300 ease-in-out",
          sidebarOpen ? "w-64" : "w-20",
          "bg-background/80 backdrop-blur-sm border-r border-purple-300/20 shadow-lg shadow-purple-500/5 z-10 relative",
        )}
      >
        <div className="p-4">
          <div className={cn("flex items-center", !sidebarOpen && "justify-center")}>
            <div className={cn("transition-opacity", !sidebarOpen && "opacity-0 w-0 overflow-hidden")}>
              <h2 className="text-xl font-bold bg-clip-text text-transparent bg-purple-gradient">EduInsight</h2>
              <p className="text-sm text-muted-foreground">Painel de Administração</p>
            </div>
            <div className={cn("transition-opacity", sidebarOpen && "opacity-0 w-0 overflow-hidden")}>
              <div className="h-10 w-10 rounded-full bg-purple-gradient flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="ml-auto">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link href={item.path} key={item.path}>
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    isActive(item.path) && "bg-purple-gradient text-white hover:bg-purple-gradient-hover",
                    !sidebarOpen && "justify-center px-2",
                  )}
                >
                  <item.icon className={cn("h-4 w-4", sidebarOpen && "mr-2")} />
                  {sidebarOpen && <span>{item.label}</span>}
                </Button>
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-4">
          <div className="space-y-2">
            <Button
              variant="ghost"
              className={cn("w-full", sidebarOpen ? "justify-start" : "justify-center px-2")}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {mounted && theme === "dark" ? (
                <>
                  <Sun className={cn("h-4 w-4", sidebarOpen && "mr-2")} />
                  {sidebarOpen && <span>Modo Claro</span>}
                </>
              ) : (
                <>
                  <Moon className={cn("h-4 w-4", sidebarOpen && "mr-2")} />
                  {sidebarOpen && <span>Modo Escuro</span>}
                </>
              )}
            </Button>

            <Link href="/">
              <Button variant="ghost" className={cn("w-full", sidebarOpen ? "justify-start" : "justify-center px-2")}>
                <LogOut className={cn("h-4 w-4", sidebarOpen && "mr-2")} />
                {sidebarOpen && <span>Sair</span>}
              </Button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Toggle button for desktop sidebar */}
      <div
        className="absolute left-64 top-1/2 z-20 hidden -translate-y-1/2 transform cursor-pointer md:block"
        style={{
          left: sidebarOpen ? "15.5rem" : "4.5rem",
          transition: "left 300ms ease-in-out",
        }}
      >
        <div
          className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-gradient text-white shadow-md hover:bg-purple-gradient-hover"
          onClick={toggleSidebar}
        >
          {sidebarOpen ? (
            <svg width="14" height="14" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.5 3.5L4.5 7.5L8.5 11.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.5 3.5L10.5 7.5L6.5 11.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>

      {/* Main content */}
      <main className={cn("flex-1 overflow-auto transition-all duration-300 ease-in-out", "bg-background relative")}>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(#8b5cf6_1px,transparent_1px)] dark:bg-[radial-gradient(#6d28d9_1px,transparent_1px)] [background-size:20px_20px] opacity-30"></div>
        <div className="p-4 md:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  )
}
