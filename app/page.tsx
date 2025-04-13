import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, BookOpen, Users, Sparkles, Brain, Zap, CheckCircle2, ChevronRight } from "lucide-react"
import InteractiveBackground from "@/components/interactive-background"

export default function Home() {
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
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
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
                    Acessar <span className="hidden sm:inline ml-1">Dashboard</span>
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center justify-center rounded-full bg-purple-600/10 px-3 py-1 text-sm font-medium text-purple-600 border border-purple-600/20 backdrop-blur-sm">
                  <Sparkles className="mr-1 h-3.5 w-3.5" />
                  <span>Potencializado por IA</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  Previna a{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                    evasão escolar
                  </span>{" "}
                  com análise preditiva
                </h1>

                <p className="text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                  EduInsight utiliza inteligência artificial avançada para identificar alunos em risco, permitindo
                  intervenções proativas e melhorando os resultados educacionais.
                </p>

                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <Link href="/dashboard">
                    <Button
                      size="lg"
                      className="rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-600/90 hover:to-indigo-600/90 shadow-lg shadow-purple-600/20 transition-all hover:shadow-xl hover:shadow-purple-600/30 hover:translate-y-[-2px]"
                    >
                      Acessar Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full border-2 backdrop-blur-sm hover:bg-background/50 transition-all hover:translate-y-[-2px]"
                    >
                      Saiba Mais
                    </Button>
                  </Link>
                </div>

                {/* Estatísticas */}
                <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border/40 mt-8">
                  <div>
                    <p className="text-3xl font-bold text-purple-600">95%</p>
                    <p className="text-sm text-muted-foreground">Precisão na previsão</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-purple-600">+40%</p>
                    <p className="text-sm text-muted-foreground">Aumento na retenção</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-purple-600">5x</p>
                    <p className="text-sm text-muted-foreground">Retorno sobre investimento</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative mx-auto w-full max-w-md aspect-square">
                  {/* Círculo decorativo */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600/10 to-indigo-600/10 blur-md"></div>

                  {/* Imagem principal */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-[90%] h-[90%] rounded-2xl overflow-hidden shadow-2xl shadow-purple-600/20 border border-white/10 backdrop-blur-sm bg-card/30">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-4/5 h-4/5 rounded-xl bg-card/80 backdrop-blur-md border border-border/50 shadow-inner flex items-center justify-center">
                          <div className="text-center p-6">
                            <BarChart3 className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Análise Preditiva</h3>
                            <p className="text-sm text-muted-foreground">
                              Visualize dados em tempo real e identifique tendências antes que se tornem problemas
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Elementos decorativos */}
                  <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-indigo-600/30 rounded-full blur-xl animate-pulse-slow"></div>
                  <div className="absolute bottom-[-5%] left-[-5%] w-24 h-24 bg-purple-600/30 rounded-full blur-xl animate-pulse-slow"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Como Funciona Section */}
        <section
          id="como-funciona"
          className="py-16 bg-gradient-to-b from-background to-purple-900/10 backdrop-blur-sm border-y border-purple-600/20"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center rounded-full bg-purple-600/10 px-3 py-1 text-sm font-medium text-purple-600 border border-purple-600/20 backdrop-blur-sm mb-4">
                <Sparkles className="mr-1 h-3.5 w-3.5" />
                <span>Processo Inteligente</span>
              </div>
              <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                Como o EduInsight Funciona
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Nossa plataforma integra-se perfeitamente ao seu sistema Moodle existente para fornecer insights
                acionáveis em tempo real.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-card/80 backdrop-blur-md rounded-xl p-8 border border-purple-600/20 shadow-lg transition-all hover:shadow-xl hover:border-purple-600/40 h-full flex flex-col">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/10 border border-purple-600/20 group-hover:scale-110 transition-transform">
                    <BookOpen className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Coleta de Dados Inteligente</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Integração perfeita com o Moodle para coletar dados de presença, notas, engajamento e comportamento
                    dos alunos em tempo real.
                  </p>
                  <div className="mt-auto space-y-3 pt-4 border-t border-purple-600/10">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-purple-600" />
                      <span className="text-sm">Sincronização automática de dados</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-purple-600" />
                      <span className="text-sm">Monitoramento contínuo de atividades</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-purple-600" />
                      <span className="text-sm">Coleta de múltiplas fontes de dados</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-card/80 backdrop-blur-md rounded-xl p-8 border border-purple-600/20 shadow-lg transition-all hover:shadow-xl hover:border-purple-600/40 h-full flex flex-col">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/10 border border-purple-600/20 group-hover:scale-110 transition-transform">
                    <Brain className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Análise Preditiva com IA</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Algoritmos avançados de aprendizado de máquina identificam padrões e preveem riscos de evasão com
                    alta precisão antes que se tornem problemas.
                  </p>
                  <div className="mt-auto space-y-3 pt-4 border-t border-purple-600/10">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-purple-600" />
                      <span className="text-sm">Modelos de IA personalizados</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-purple-600" />
                      <span className="text-sm">Precisão de previsão acima de 95%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-purple-600" />
                      <span className="text-sm">Aprendizado contínuo e adaptativo</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-card/80 backdrop-blur-md rounded-xl p-8 border border-purple-600/20 shadow-lg transition-all hover:shadow-xl hover:border-purple-600/40 h-full flex flex-col">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/10 border border-purple-600/20 group-hover:scale-110 transition-transform">
                    <Zap className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Intervenção Proativa</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Receba alertas, relatórios detalhados e recomendações personalizadas para intervenções direcionadas
                    que realmente funcionam.
                  </p>
                  <div className="mt-auto space-y-3 pt-4 border-t border-purple-600/10">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-purple-600" />
                      <span className="text-sm">Alertas em tempo real</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-purple-600" />
                      <span className="text-sm">Estratégias de intervenção personalizadas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-purple-600" />
                      <span className="text-sm">Acompanhamento de eficácia das ações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recursos Section */}
        <section id="recursos" className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-repeat opacity-5 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-600/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-indigo-600/10 rounded-full blur-[100px]"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center rounded-full bg-purple-600/10 px-3 py-1 text-sm font-medium text-purple-600 border border-purple-600/20 backdrop-blur-sm mb-4">
                <Sparkles className="mr-1 h-3.5 w-3.5" />
                <span>Ferramentas Poderosas</span>
              </div>
              <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                Principais Recursos
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Ferramentas avançadas para ajudar sua instituição a melhorar a retenção de alunos e o sucesso acadêmico
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative h-full bg-card/60 backdrop-blur-sm rounded-xl overflow-hidden border border-purple-600/20 shadow-lg transition-all group-hover:shadow-xl group-hover:border-purple-600/30">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-full blur-2xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
                  <div className="p-8 relative z-10">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/10 border border-purple-600/20 group-hover:scale-110 transition-transform">
                      <BarChart3 className="h-7 w-7 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Dashboard Intuitivo</h3>
                    <p className="text-muted-foreground mb-6">
                      Visualize dados complexos de forma clara e acionável, com painéis personalizáveis e relatórios
                      detalhados para tomada de decisões rápidas.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-purple-600 flex-shrink-0" />
                        <span className="text-sm">Painéis personalizáveis</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-purple-600 flex-shrink-0" />
                        <span className="text-sm">Visualizações interativas</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-purple-600 flex-shrink-0" />
                        <span className="text-sm">Exportação de relatórios</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative h-full bg-card/60 backdrop-blur-sm rounded-xl overflow-hidden border border-purple-600/20 shadow-lg transition-all group-hover:shadow-xl group-hover:border-purple-600/30">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-full blur-2xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
                  <div className="p-8 relative z-10">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/10 border border-purple-600/20 group-hover:scale-110 transition-transform">
                      <Users className="h-7 w-7 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Perfis de Alunos</h3>
                    <p className="text-muted-foreground mb-6">
                      Acesse perfis detalhados de alunos com histórico completo, padrões de engajamento e recomendações
                      personalizadas para cada caso individual.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-purple-600 flex-shrink-0" />
                        <span className="text-sm">Histórico acadêmico completo</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-purple-600 flex-shrink-0" />
                        <span className="text-sm">Análise de comportamento</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-purple-600 flex-shrink-0" />
                        <span className="text-sm">Recomendações personalizadas</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative h-full bg-card/60 backdrop-blur-sm rounded-xl overflow-hidden border border-purple-600/20 shadow-lg transition-all group-hover:shadow-xl group-hover:border-purple-600/30">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-full blur-2xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
                  <div className="p-8 relative z-10">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/10 border border-purple-600/20 group-hover:scale-110 transition-transform">
                      <BookOpen className="h-7 w-7 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Relatórios Avançados</h3>
                    <p className="text-muted-foreground mb-6">
                      Gere relatórios detalhados sobre tendências, padrões e eficácia das intervenções para tomada de
                      decisões baseada em dados concretos.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-purple-600 flex-shrink-0" />
                        <span className="text-sm">Análise de tendências</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-purple-600 flex-shrink-0" />
                        <span className="text-sm">Métricas de eficácia</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-purple-600 flex-shrink-0" />
                        <span className="text-sm">Relatórios personalizáveis</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefícios Section */}
        <section
          id="beneficios"
          className="py-16 bg-gradient-to-b from-background to-purple-900/10 backdrop-blur-sm border-y border-purple-600/20"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center rounded-full bg-purple-600/10 px-3 py-1 text-sm font-medium text-purple-600 border border-purple-600/20 backdrop-blur-sm mb-4">
                <Sparkles className="mr-1 h-3.5 w-3.5" />
                <span>Resultados Comprovados</span>
              </div>
              <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                Benefícios Comprovados
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Resultados reais relatados por instituições que utilizam o EduInsight para transformar a educação
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-card/60 backdrop-blur-md rounded-xl p-8 border border-purple-600/20 shadow-lg transition-all group-hover:shadow-xl group-hover:border-purple-600/30 h-full">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/10 border border-purple-600/20 mb-6 group-hover:scale-110 transition-transform">
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-2">
                    +35%
                  </div>
                  <h3 className="text-xl font-medium mb-4">Retenção de Alunos</h3>
                  <p className="text-sm text-muted-foreground">
                    Aumento médio nas taxas de retenção de alunos no primeiro ano de implementação da plataforma
                    EduInsight.
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-card/60 backdrop-blur-md rounded-xl p-8 border border-purple-600/20 shadow-lg transition-all group-hover:shadow-xl group-hover:border-purple-600/30 h-full">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/10 border border-purple-600/20 mb-6 group-hover:scale-110 transition-transform">
                    <ArrowRight className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-2">
                    -42%
                  </div>
                  <h3 className="text-xl font-medium mb-4">Evasão Escolar</h3>
                  <p className="text-sm text-muted-foreground">
                    Redução significativa na taxa de evasão escolar através de intervenções proativas e direcionadas
                    baseadas em dados.
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-card/60 backdrop-blur-md rounded-xl p-8 border border-purple-600/20 shadow-lg transition-all group-hover:shadow-xl group-hover:border-purple-600/30 h-full">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/10 border border-purple-600/20 mb-6 group-hover:scale-110 transition-transform">
                    <BarChart3 className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-2">
                    +28%
                  </div>
                  <h3 className="text-xl font-medium mb-4">Desempenho Acadêmico</h3>
                  <p className="text-sm text-muted-foreground">
                    Melhoria significativa no desempenho acadêmico dos alunos identificados como em risco após
                    intervenções direcionadas.
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-card/60 backdrop-blur-md rounded-xl p-8 border border-purple-600/20 shadow-lg transition-all group-hover:shadow-xl group-hover:border-purple-600/30 h-full">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/10 border border-purple-600/20 mb-6 group-hover:scale-110 transition-transform">
                    <Zap className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-2">
                    5x
                  </div>
                  <h3 className="text-xl font-medium mb-4">ROI Comprovado</h3>
                  <p className="text-sm text-muted-foreground">
                    Retorno médio sobre o investimento através de taxas de matrícula retidas e melhoria na eficiência
                    operacional.
                  </p>
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
                    <h2 className="text-3xl font-bold mb-4">Pronto para transformar sua instituição?</h2>
                    <p className="text-lg text-muted-foreground mb-6 max-w-lg leading-relaxed">
                      Junte-se a mais de 200 instituições de ensino que já estão utilizando o EduInsight para melhorar a
                      retenção de alunos e o sucesso acadêmico.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Link href="/dashboard">
                        <Button
                          size="lg"
                          className="rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-600/90 hover:to-indigo-600/90 shadow-lg shadow-purple-600/20 transition-all hover:shadow-xl hover:shadow-purple-600/30 hover:translate-y-[-2px]"
                        >
                          Começar Agora <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href="/about">
                        <Button
                          size="lg"
                          variant="outline"
                          className="rounded-full border-2 backdrop-blur-sm hover:bg-white/10 transition-all hover:translate-y-[-2px]"
                        >
                          Saiba Mais
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
