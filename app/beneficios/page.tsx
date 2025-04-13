import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Users,
  ArrowRight,
  BarChart3,
  Zap,
  Sparkles,
  CheckCircle2,
  GraduationCap,
  TrendingUp,
  DollarSign,
  Clock,
} from "lucide-react"
import InteractiveBackground from "@/components/interactive-background"

export default function Beneficios() {
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
                  className="text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
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
                <span>Resultados Comprovados</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                Benefícios do EduInsight
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Descubra como o EduInsight está transformando instituições de ensino com resultados mensuráveis e
                impacto real na retenção de alunos.
              </p>
            </div>
          </div>
        </section>

        {/* Benefícios Principais */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-card/60 backdrop-blur-md rounded-xl p-8 border border-purple-600/20 shadow-lg transition-all group-hover:shadow-xl group-hover:border-purple-600/30 h-full">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/10 border border-purple-600/20 mb-6 group-hover:scale-110 transition-transform">
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-2">
                    +35%
                  </div>
                  <h3 className="text-xl font-medium mb-4">Retenção de Alunos</h3>
                  <p className="text-muted-foreground">
                    Aumento médio nas taxas de retenção de alunos no primeiro ano de implementação da plataforma
                    EduInsight.
                  </p>
                  <div className="mt-6 pt-4 border-t border-purple-600/10">
                    <p className="text-sm italic text-muted-foreground">
                      "Conseguimos aumentar nossa taxa de retenção em 38% no primeiro semestre após implementar o
                      EduInsight."
                    </p>
                    <p className="text-sm font-medium mt-2">— Universidade Federal do Sul</p>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-card/60 backdrop-blur-md rounded-xl p-8 border border-purple-600/20 shadow-lg transition-all group-hover:shadow-xl group-hover:border-purple-600/30 h-full">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/10 border border-purple-600/20 mb-6 group-hover:scale-110 transition-transform">
                    <ArrowRight className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-2">
                    -42%
                  </div>
                  <h3 className="text-xl font-medium mb-4">Evasão Escolar</h3>
                  <p className="text-muted-foreground">
                    Redução significativa na taxa de evasão escolar através de intervenções proativas e direcionadas
                    baseadas em dados.
                  </p>
                  <div className="mt-6 pt-4 border-t border-purple-600/10">
                    <p className="text-sm italic text-muted-foreground">
                      "Reduzimos nossa taxa de evasão em quase metade em apenas um ano acadêmico completo."
                    </p>
                    <p className="text-sm font-medium mt-2">— Instituto Técnico de Educação</p>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-card/60 backdrop-blur-md rounded-xl p-8 border border-purple-600/20 shadow-lg transition-all group-hover:shadow-xl group-hover:border-purple-600/30 h-full">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/10 border border-purple-600/20 mb-6 group-hover:scale-110 transition-transform">
                    <BarChart3 className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-2">
                    +28%
                  </div>
                  <h3 className="text-xl font-medium mb-4">Desempenho Acadêmico</h3>
                  <p className="text-muted-foreground">
                    Melhoria significativa no desempenho acadêmico dos alunos identificados como em risco após
                    intervenções direcionadas.
                  </p>
                  <div className="mt-6 pt-4 border-t border-purple-600/10">
                    <p className="text-sm italic text-muted-foreground">
                      "Os alunos que receberam intervenções baseadas nos dados do EduInsight melhoraram suas notas em
                      média 30%."
                    </p>
                    <p className="text-sm font-medium mt-2">— Faculdade de Ciências Aplicadas</p>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-card/60 backdrop-blur-md rounded-xl p-8 border border-purple-600/20 shadow-lg transition-all group-hover:shadow-xl group-hover:border-purple-600/30 h-full">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/10 border border-purple-600/20 mb-6 group-hover:scale-110 transition-transform">
                    <Zap className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-2">
                    5x
                  </div>
                  <h3 className="text-xl font-medium mb-4">ROI Comprovado</h3>
                  <p className="text-muted-foreground">
                    Retorno médio sobre o investimento através de taxas de matrícula retidas e melhoria na eficiência
                    operacional.
                  </p>
                  <div className="mt-6 pt-4 border-t border-purple-600/10">
                    <p className="text-sm italic text-muted-foreground">
                      "Para cada real investido no EduInsight, recuperamos mais de 5 reais em matrículas que teriam sido
                      perdidas."
                    </p>
                    <p className="text-sm font-medium mt-2">— Centro Universitário do Norte</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefícios para Diferentes Stakeholders */}
        <section className="py-16 bg-gradient-to-b from-background to-purple-900/10 backdrop-blur-sm border-y border-purple-600/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center rounded-full bg-purple-600/10 px-3 py-1 text-sm font-medium text-purple-600 border border-purple-600/20 backdrop-blur-sm mb-4">
                <Users className="mr-1 h-3.5 w-3.5" />
                <span>Para Todos os Envolvidos</span>
              </div>
              <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                Benefícios para Cada Stakeholder
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                O EduInsight oferece vantagens específicas para cada grupo envolvido no processo educacional
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-card/60 backdrop-blur-md rounded-xl p-8 border border-purple-600/20 shadow-lg transition-all group-hover:shadow-xl group-hover:border-purple-600/40 h-full">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/10 border border-purple-600/20 group-hover:scale-110 transition-transform">
                    <GraduationCap className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Para Gestores Educacionais</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Visão clara do desempenho institucional</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Dados para tomada de decisões estratégicas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Alocação mais eficiente de recursos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Melhoria nos indicadores de desempenho</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Aumento da receita com retenção de alunos</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-card/60 backdrop-blur-md rounded-xl p-8 border border-purple-600/20 shadow-lg transition-all group-hover:shadow-xl group-hover:border-purple-600/40 h-full">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/10 border border-purple-600/20 group-hover:scale-110 transition-transform">
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Para Professores e Tutores</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Identificação precoce de alunos em risco</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Recomendações personalizadas de intervenção</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Redução da carga administrativa</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Foco em alunos que mais precisam de apoio</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Melhoria nos resultados de aprendizagem</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-card/60 backdrop-blur-md rounded-xl p-8 border border-purple-600/20 shadow-lg transition-all group-hover:shadow-xl group-hover:border-purple-600/40 h-full">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/10 border border-purple-600/20 group-hover:scale-110 transition-transform">
                    <GraduationCap className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Para Alunos</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Suporte personalizado quando necessário</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Maior probabilidade de conclusão do curso</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Melhoria no desempenho acadêmico</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Experiência educacional mais satisfatória</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Melhor preparação para o mercado de trabalho</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefícios Adicionais */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center rounded-full bg-purple-600/10 px-3 py-1 text-sm font-medium text-purple-600 border border-purple-600/20 backdrop-blur-sm mb-4">
                <Sparkles className="mr-1 h-3.5 w-3.5" />
                <span>Além da Retenção</span>
              </div>
              <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                Benefícios Adicionais
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                O EduInsight oferece muito mais do que apenas melhoria na retenção de alunos
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-card/60 backdrop-blur-md rounded-xl p-8 border border-purple-600/20 shadow-lg transition-all group-hover:shadow-xl group-hover:border-purple-600/30 h-full">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/10 border border-purple-600/20 group-hover:scale-110 transition-transform">
                    <TrendingUp className="h-7 w-7 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Melhoria na Reputação Institucional</h3>
                  <p className="text-muted-foreground">
                    Instituições que utilizam o EduInsight relatam melhoria significativa em rankings educacionais e na
                    percepção pública devido aos melhores resultados acadêmicos.
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-card/60 backdrop-blur-md rounded-xl p-8 border border-purple-600/20 shadow-lg transition-all group-hover:shadow-xl group-hover:border-purple-600/30 h-full">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/10 border border-purple-600/20 group-hover:scale-110 transition-transform">
                    <DollarSign className="h-7 w-7 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Eficiência Operacional</h3>
                  <p className="text-muted-foreground">
                    Redução de custos administrativos e melhor alocação de recursos através da identificação precisa de
                    onde e quando intervir para maximizar o impacto.
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-card/60 backdrop-blur-md rounded-xl p-8 border border-purple-600/20 shadow-lg transition-all group-hover:shadow-xl group-hover:border-purple-600/30 h-full">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/10 border border-purple-600/20 group-hover:scale-110 transition-transform">
                    <Clock className="h-7 w-7 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Implementação Rápida</h3>
                  <p className="text-muted-foreground">
                    Integração simples com sistemas existentes e resultados visíveis em semanas, não meses ou anos,
                    permitindo um retorno rápido sobre o investimento.
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
                      Junte-se a centenas de instituições que já estão colhendo os benefícios do EduInsight. Comece hoje
                      mesmo.
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
