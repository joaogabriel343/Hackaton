import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  BarChart3,
  Users,
  BookOpen,
  Sparkles,
  CheckCircle2,
  LineChart,
  PieChart,
  BarChart2,
  FileText,
  MessageSquare,
  Zap,
} from "lucide-react"
import InteractiveBackground from "@/components/interactive-background"

export default function Recursos() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fundo interativo que acompanha o mouse */}
      <InteractiveBackground />

      {/* Overlay para melhorar a legibilidade */}
      <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] pointer-events-none"></div>

      {/* Gradientes decorativos */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] bg-purple-600/20 rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute -bottom-[30%] -right-[10%] w-[70%] h-[70%] bg-indigo-600/20 rounded-full blur-[120px] opacity-60"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-border/30 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-600/20">
                  <span className="text-white font-bold">E</span>
                </div>
                <span className="font-bold text-xl">EduInsight</span>
              </div>

              <nav className="hidden md:flex items-center gap-8">
                <Link
                  href="/como-funciona"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Como Funciona
                </Link>
                <Link
                  href="/recursos"
                  className="text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
                >
                  Recursos
                </Link>
                <Link
                  href="/beneficios"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Benefícios
                </Link>
                <Link
                  href="/terms"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Termos
                </Link>
                <Link
                  href="/privacy"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacidade
                </Link>
              </nav>

              <div>
                <Link href="/dashboard">
                  <Button
                    variant="outline"
                    className="rounded-full border-purple-600/30 hover:border-purple-600/80 hover:bg-purple-600/5"
                  >
                    Acessar Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-8">
              <Link
                href="/"
                className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                <span>Voltar para Home</span>
              </Link>
            </div>

            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center rounded-full bg-purple-600/10 px-3 py-1 text-sm font-medium text-purple-600 border border-purple-600/20 backdrop-blur-sm mb-4">
                <Sparkles className="mr-1 h-3.5 w-3.5" />
                <span>Ferramentas Poderosas</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                Recursos do EduInsight
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Conheça as ferramentas avançadas que o EduInsight oferece para ajudar sua instituição a melhorar a
                retenção de alunos e o sucesso acadêmico.
              </p>
            </div>
          </div>
        </section>

        {/* Dashboard Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center justify-center rounded-full bg-purple-600/10 px-3 py-1 text-sm font-medium text-purple-600 border border-purple-600/20 backdrop-blur-sm mb-4">
                  <BarChart3 className="mr-1 h-3.5 w-3.5" />
                  <span>Visualização de Dados</span>
                </div>
                <h2 className="text-3xl font-bold mb-6">Dashboard Intuitivo</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Visualize dados complexos de forma clara e acionável, com painéis personalizáveis e relatórios
                  detalhados para tomada de decisões rápidas e eficazes.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-600/10 flex items-center justify-center mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Visão Geral Institucional</h3>
                      <p className="text-muted-foreground">
                        Métricas-chave sobre retenção, engajamento e desempenho em toda a instituição.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-600/10 flex items-center justify-center mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Painéis Personalizáveis</h3>
                      <p className="text-muted-foreground">
                        Crie visualizações personalizadas com as métricas mais relevantes para suas necessidades.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-600/10 flex items-center justify-center mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Alertas em Tempo Real</h3>
                      <p className="text-muted-foreground">
                        Receba notificações imediatas sobre alunos em risco ou tendências preocupantes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative bg-card/60 backdrop-blur-md rounded-xl p-6 border border-purple-600/20 shadow-lg transition-all group-hover:shadow-xl group-hover:border-purple-600/30 h-full">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/10 border border-purple-600/20 group-hover:scale-110 transition-transform">
                      <LineChart className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Tendências de Engajamento</h3>
                    <p className="text-sm text-muted-foreground">
                      Visualize padrões de engajamento ao longo do tempo para identificar tendências.
                    </p>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative bg-card/60 backdrop-blur-md rounded-xl p-6 border border-purple-600/20 shadow-lg transition-all group-hover:shadow-xl group-hover:border-purple-600/30 h-full">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/10 border border-purple-600/20 group-hover:scale-110 transition-transform">
                      <PieChart className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Distribuição de Risco</h3>
                    <p className="text-sm text-muted-foreground">
                      Análise da distribuição de alunos por níveis de risco e categorias.
                    </p>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative bg-card/60 backdrop-blur-md rounded-xl p-6 border border-purple-600/20 shadow-lg transition-all group-hover:shadow-xl group-hover:border-purple-600/30 h-full">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/10 border border-purple-600/20 group-hover:scale-110 transition-transform">
                      <BarChart2 className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Comparação de Cursos</h3>
                    <p className="text-sm text-muted-foreground">
                      Compare métricas entre diferentes cursos, programas ou departamentos.
                    </p>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative bg-card/60 backdrop-blur-md rounded-xl p-6 border border-purple-600/20 shadow-lg transition-all group-hover:shadow-xl group-hover:border-purple-600/30 h-full">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/10 border border-purple-600/20 group-hover:scale-110 transition-transform">
                      <FileText className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Relatórios Exportáveis</h3>
                    <p className="text-sm text-muted-foreground">
                      Exporte relatórios detalhados em vários formatos para análise externa.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Perfis de Alunos Section */}
        <section className="py-16 bg-gradient-to-b from-background to-purple-900/10 backdrop-blur-sm border-y border-purple-600/20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 grid grid-cols-2 gap-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative bg-card/60 backdrop-blur-md rounded-xl p-6 border border-purple-600/20 shadow-lg transition-all group-hover:shadow-xl group-hover:border-purple-600/30 h-full">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/10 border border-purple-600/20 group-hover:scale-110 transition-transform">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Histórico Acadêmico</h3>
                    <p className="text-sm text-muted-foreground">
                      Visualização completa do histórico e progresso acadêmico do aluno.
                    </p>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative bg-card/60 backdrop-blur-md rounded-xl p-6 border border-purple-600/20 shadow-lg transition-all group-hover:shadow-xl group-hover:border-purple-600/30 h-full">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/10 border border-purple-600/20 group-hover:scale-110 transition-transform">
                      <LineChart className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Padrões de Engajamento</h3>
                    <p className="text-sm text-muted-foreground">
                      Análise detalhada dos padrões de participação e engajamento.
                    </p>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative bg-card/60 backdrop-blur-md rounded-xl p-6 border border-purple-600/20 shadow-lg transition-all group-hover:shadow-xl group-hover:border-purple-600/30 h-full">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/10 border border-purple-600/20 group-hover:scale-110 transition-transform">
                      <MessageSquare className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Histórico de Comunicações</h3>
                    <p className="text-sm text-muted-foreground">
                      Registro de todas as comunicações e intervenções anteriores.
                    </p>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative bg-card/60 backdrop-blur-md rounded-xl p-6 border border-purple-600/20 shadow-lg transition-all group-hover:shadow-xl group-hover:border-purple-600/30 h-full">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/10 border border-purple-600/20 group-hover:scale-110 transition-transform">
                      <Zap className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Recomendações Personalizadas</h3>
                    <p className="text-sm text-muted-foreground">
                      Sugestões de intervenção baseadas no perfil específico do aluno.
                    </p>
                  </div>
                </div>
              </div>

              <div className="order-1 md:order-2">
                <div className="inline-flex items-center justify-center rounded-full bg-purple-600/10 px-3 py-1 text-sm font-medium text-purple-600 border border-purple-600/20 backdrop-blur-sm mb-4">
                  <Users className="mr-1 h-3.5 w-3.5" />
                  <span>Análise Individual</span>
                </div>
                <h2 className="text-3xl font-bold mb-6">Perfis de Alunos Detalhados</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Acesse perfis completos de cada aluno com histórico acadêmico, padrões de engajamento e recomendações
                  personalizadas para intervenções eficazes.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-600/10 flex items-center justify-center mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Visão 360° do Aluno</h3>
                      <p className="text-muted-foreground">
                        Visualize todos os aspectos do desempenho e comportamento do aluno em um único lugar.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-600/10 flex items-center justify-center mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Indicadores de Risco</h3>
                      <p className="text-muted-foreground">
                        Identificação clara dos fatores específicos que contribuem para o risco de evasão.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-600/10 flex items-center justify-center mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Histórico de Intervenções</h3>
                      <p className="text-muted-foreground">
                        Acompanhe todas as intervenções anteriores e seus resultados para refinar estratégias futuras.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Relatórios Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center justify-center rounded-full bg-purple-600/10 px-3 py-1 text-sm font-medium text-purple-600 border border-purple-600/20 backdrop-blur-sm mb-4">
                  <BookOpen className="mr-1 h-3.5 w-3.5" />
                  <span>Análise Aprofundada</span>
                </div>
                <h2 className="text-3xl font-bold mb-6">Relatórios Avançados</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Gere relatórios detalhados sobre tendências, padrões e eficácia das intervenções para tomada de
                  decisões baseada em dados concretos e mensuráveis.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-600/10 flex items-center justify-center mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Análise de Tendências</h3>
                      <p className="text-muted-foreground">
                        Identifique padrões e tendências ao longo do tempo para prever necessidades futuras.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-600/10 flex items-center justify-center mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Métricas de Eficácia</h3>
                      <p className="text-muted-foreground">
                        Avalie a eficácia das intervenções com métricas claras e mensuráveis.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-600/10 flex items-center justify-center mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Relatórios Personalizáveis</h3>
                      <p className="text-muted-foreground">
                        Crie relatórios personalizados para diferentes stakeholders e necessidades específicas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-2xl blur-xl opacity-50"></div>
                <div className="relative bg-card/60 backdrop-blur-md rounded-xl p-8 border border-purple-600/20 shadow-lg">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/10 border border-purple-600/20">
                    <BookOpen className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Tipos de Relatórios</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-purple-600" />
                      <span>Relatórios de tendências de retenção</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-purple-600" />
                      <span>Análise de eficácia de intervenções</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-purple-600" />
                      <span>Comparação de desempenho entre cursos</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-purple-600" />
                      <span>Identificação de fatores de risco</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-purple-600" />
                      <span>Previsões de evasão por período</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-purple-600" />
                      <span>Relatórios executivos para gestores</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="rounded-2xl overflow-hidden relative">
              {/* Fundo com gradiente */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-indigo-600/20"></div>

              {/* Padrão de pontos */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,_#fff_1px,_transparent_1px)] bg-[length:16px_16px]"></div>

              {/* Formas decorativas */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl"></div>

              {/* Conteúdo */}
              <div className="relative p-8 md:p-12 backdrop-blur-sm border border-white/10 shadow-2xl">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div>
                    <h2 className="text-3xl font-bold mb-4">Pronto para explorar todos os recursos?</h2>
                    <p className="text-lg text-muted-foreground mb-6 max-w-lg leading-relaxed">
                      Agende uma demonstração personalizada e veja como o EduInsight pode transformar a retenção de
                      alunos na sua instituição.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Link href="/dashboard">
                        <Button
                          size="lg"
                          className="rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-600/90 hover:to-indigo-600/90 shadow-lg shadow-purple-600/20 transition-all hover:shadow-xl hover:shadow-purple-600/30 hover:translate-y-[-2px]"
                        >
                          Acessar Dashboard
                        </Button>
                      </Link>
                      <Link href="/">
                        <Button
                          size="lg"
                          variant="outline"
                          className="rounded-full border-2 backdrop-blur-sm hover:bg-white/10 transition-all hover:translate-y-[-2px]"
                        >
                          Voltar para Home
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-purple-600/30 to-indigo-600/30 border border-white/20 backdrop-blur-md shadow-lg">
                      <Sparkles className="h-16 w-16 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 backdrop-blur-sm bg-muted/50 border-t border-border/40">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-8 w-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold">E</span>
                </div>
                <span className="font-bold text-xl">EduInsight</span>
              </div>

              <div className="flex items-center gap-6">
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Termos
                </Link>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacidade
                </Link>
              </div>

              <div className="pt-4 text-center">
                <p className="text-sm text-muted-foreground">© 2025 EduInsight. Todos os direitos reservados.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
