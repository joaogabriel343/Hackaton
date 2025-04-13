import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BookOpen, Brain, Zap, CheckCircle2, Sparkles } from "lucide-react"
import InteractiveBackground from "@/components/interactive-background"

export default function ComoFunciona() {
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
                  className="text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
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
                <span>Processo Inteligente</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                Como o EduInsight Funciona
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Nossa plataforma integra-se perfeitamente ao seu sistema Moodle existente para fornecer insights
                acionáveis em tempo real e prevenir a evasão escolar antes que ela aconteça.
              </p>
            </div>
          </div>
        </section>

        {/* Processo Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-16">
              {/* Etapa 1 */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                  <div className="inline-flex items-center justify-center rounded-full bg-purple-600/10 px-3 py-1 text-sm font-medium text-purple-600 border border-purple-600/20 backdrop-blur-sm mb-4">
                    <span>Etapa 1</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-6">Coleta de Dados Inteligente</h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    O EduInsight se conecta ao seu sistema Moodle através de uma API segura, coletando dados em tempo
                    real sobre o comportamento, engajamento e desempenho dos alunos sem interromper suas operações
                    normais.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-600/10 flex items-center justify-center mt-0.5">
                        <CheckCircle2 className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Integração Perfeita</h3>
                        <p className="text-muted-foreground">
                          Instalação simples que não requer modificações no seu sistema Moodle existente.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-600/10 flex items-center justify-center mt-0.5">
                        <CheckCircle2 className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Coleta Abrangente</h3>
                        <p className="text-muted-foreground">
                          Captura mais de 50 pontos de dados diferentes, incluindo tempo de acesso, interações, notas e
                          padrões de comunicação.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-600/10 flex items-center justify-center mt-0.5">
                        <CheckCircle2 className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Privacidade Garantida</h3>
                        <p className="text-muted-foreground">
                          Todos os dados são criptografados e processados em conformidade com as regulamentações de
                          privacidade.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="order-1 md:order-2 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-2xl blur-xl opacity-50"></div>
                  <div className="relative bg-card/80 backdrop-blur-md rounded-xl p-8 border border-purple-600/20 shadow-lg">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/10 border border-purple-600/20">
                      <BookOpen className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Fontes de Dados</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-purple-600" />
                        <span>Registros de acesso e atividade</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-purple-600" />
                        <span>Submissões de tarefas e avaliações</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-purple-600" />
                        <span>Participação em fóruns e discussões</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-purple-600" />
                        <span>Histórico de notas e feedback</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-purple-600" />
                        <span>Tempo gasto em recursos de aprendizagem</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-purple-600" />
                        <span>Padrões de comunicação com professores</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Etapa 2 */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-2xl blur-xl opacity-50"></div>
                  <div className="relative bg-card/80 backdrop-blur-md rounded-xl p-8 border border-purple-600/20 shadow-lg">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/10 border border-purple-600/20">
                      <Brain className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Tecnologias de IA</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-purple-600" />
                        <span>Aprendizado de máquina supervisionado</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-purple-600" />
                        <span>Redes neurais profundas</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-purple-600" />
                        <span>Processamento de linguagem natural</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-purple-600" />
                        <span>Análise de séries temporais</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-purple-600" />
                        <span>Algoritmos de agrupamento</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-purple-600" />
                        <span>Modelos preditivos adaptativos</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <div className="inline-flex items-center justify-center rounded-full bg-purple-600/10 px-3 py-1 text-sm font-medium text-purple-600 border border-purple-600/20 backdrop-blur-sm mb-4">
                    <span>Etapa 2</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-6">Análise Preditiva com IA</h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Nossos algoritmos avançados de inteligência artificial analisam os dados coletados para identificar
                    padrões e prever quais alunos estão em risco de evasão com até 95% de precisão.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-600/10 flex items-center justify-center mt-0.5">
                        <CheckCircle2 className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Modelos Personalizados</h3>
                        <p className="text-muted-foreground">
                          Algoritmos que se adaptam ao contexto específico da sua instituição e perfil dos alunos.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-600/10 flex items-center justify-center mt-0.5">
                        <CheckCircle2 className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Aprendizado Contínuo</h3>
                        <p className="text-muted-foreground">
                          Os modelos melhoram continuamente com novos dados, aumentando a precisão ao longo do tempo.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-600/10 flex items-center justify-center mt-0.5">
                        <CheckCircle2 className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Detecção Precoce</h3>
                        <p className="text-muted-foreground">
                          Identifica sinais de risco semanas ou meses antes que se tornem problemas visíveis.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Etapa 3 */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                  <div className="inline-flex items-center justify-center rounded-full bg-purple-600/10 px-3 py-1 text-sm font-medium text-purple-600 border border-purple-600/20 backdrop-blur-sm mb-4">
                    <span>Etapa 3</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-6">Intervenção Proativa</h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Com base nas análises preditivas, o EduInsight fornece recomendações personalizadas para
                    intervenções direcionadas, permitindo que você aja antes que os alunos abandonem o curso.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-600/10 flex items-center justify-center mt-0.5">
                        <CheckCircle2 className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Alertas em Tempo Real</h3>
                        <p className="text-muted-foreground">
                          Notificações automáticas quando um aluno apresenta sinais de risco de evasão.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-600/10 flex items-center justify-center mt-0.5">
                        <CheckCircle2 className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Estratégias Personalizadas</h3>
                        <p className="text-muted-foreground">
                          Recomendações específicas para cada aluno, baseadas em seu perfil e fatores de risco.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-600/10 flex items-center justify-center mt-0.5">
                        <CheckCircle2 className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Medição de Eficácia</h3>
                        <p className="text-muted-foreground">
                          Acompanhamento dos resultados das intervenções para avaliar e melhorar as estratégias.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="order-1 md:order-2 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-2xl blur-xl opacity-50"></div>
                  <div className="relative bg-card/80 backdrop-blur-md rounded-xl p-8 border border-purple-600/20 shadow-lg">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/10 border border-purple-600/20">
                      <Zap className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Tipos de Intervenção</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-purple-600" />
                        <span>Comunicações personalizadas</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-purple-600" />
                        <span>Sessões de tutoria direcionadas</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-purple-600" />
                        <span>Recursos de aprendizagem adicionais</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-purple-600" />
                        <span>Ajustes no ritmo de aprendizagem</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-purple-600" />
                        <span>Suporte acadêmico especializado</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-purple-600" />
                        <span>Programas de mentoria entre pares</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ciclo de Melhoria Contínua */}
        <section className="py-16 bg-gradient-to-b from-background to-purple-900/10 backdrop-blur-sm border-y border-purple-600/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center rounded-full bg-purple-600/10 px-3 py-1 text-sm font-medium text-purple-600 border border-purple-600/20 backdrop-blur-sm mb-4">
                <Sparkles className="mr-1 h-3.5 w-3.5" />
                <span>Ciclo Completo</span>
              </div>
              <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                Melhoria Contínua
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                O EduInsight opera em um ciclo de feedback contínuo, melhorando constantemente seus modelos e
                recomendações
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-card/60 backdrop-blur-md rounded-xl p-6 border border-purple-600/20 shadow-lg transition-all group-hover:shadow-xl group-hover:border-purple-600/30 h-full">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/10 border border-purple-600/20 mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-xl font-bold text-purple-600">1</span>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Coleta de Dados</h3>
                  <p className="text-sm text-muted-foreground">
                    Integração com o Moodle para coletar dados de comportamento e desempenho dos alunos.
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-card/60 backdrop-blur-md rounded-xl p-6 border border-purple-600/20 shadow-lg transition-all group-hover:shadow-xl group-hover:border-purple-600/30 h-full">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/10 border border-purple-600/20 mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-xl font-bold text-purple-600">2</span>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Análise Preditiva</h3>
                  <p className="text-sm text-muted-foreground">
                    Processamento dos dados por algoritmos de IA para identificar padrões e prever riscos.
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-card/60 backdrop-blur-md rounded-xl p-6 border border-purple-600/20 shadow-lg transition-all group-hover:shadow-xl group-hover:border-purple-600/30 h-full">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/10 border border-purple-600/20 mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-xl font-bold text-purple-600">3</span>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Intervenção</h3>
                  <p className="text-sm text-muted-foreground">
                    Implementação de estratégias personalizadas para apoiar os alunos identificados como em risco.
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-card/60 backdrop-blur-md rounded-xl p-6 border border-purple-600/20 shadow-lg transition-all group-hover:shadow-xl group-hover:border-purple-600/30 h-full">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/10 border border-purple-600/20 mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-xl font-bold text-purple-600">4</span>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Avaliação</h3>
                  <p className="text-sm text-muted-foreground">
                    Medição dos resultados das intervenções e análise da eficácia para refinar os modelos e estratégias.
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
                    <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
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
