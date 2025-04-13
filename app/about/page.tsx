import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  BarChart3,
  BookOpen,
  Users,
  Sparkles,
  Brain,
  Zap,
  CheckCircle,
  Award,
  TrendingUp,
  ArrowRight,
} from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="rounded-full">
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Início
            </Button>
          </Link>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold gradient-text">Sobre o EduInsight</h1>
            <p className="text-xl text-muted-foreground">
              Transformando dados educacionais em estratégias eficazes para retenção de alunos
            </p>
          </div>

          <div className="space-y-16">
            <section>
              <div className="mb-8 flex items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                  <Sparkles className="h-10 w-10 text-primary" />
                </div>
              </div>

              <h2 className="mb-6 text-center text-2xl font-bold">Nossa Missão</h2>
              <p className="mb-6 text-center text-lg">
                O EduInsight nasceu da necessidade de enfrentar um dos maiores desafios da educação contemporânea: a
                evasão escolar. Nossa missão é capacitar instituições de ensino com ferramentas de análise avançadas que
                permitam identificar precocemente alunos em risco e implementar intervenções eficazes antes que seja
                tarde demais.
              </p>

              <div className="grid gap-8 md:grid-cols-3">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Reduzir a Evasão</h3>
                  <p className="text-muted-foreground">
                    Diminuir significativamente as taxas de evasão através de intervenções baseadas em dados.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Apoiar Educadores</h3>
                  <p className="text-muted-foreground">
                    Fornecer ferramentas que permitam aos educadores focar nos alunos que mais precisam de atenção.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Promover o Sucesso</h3>
                  <p className="text-muted-foreground">
                    Contribuir para o sucesso acadêmico e profissional dos estudantes a longo prazo.
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-2xl bg-muted p-8">
              <h2 className="mb-6 text-center text-2xl font-bold">Como Funciona</h2>

              <div className="space-y-6">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Coleta e Integração de Dados</h3>
                    <p className="text-muted-foreground">
                      O EduInsight se integra perfeitamente com sistemas de gestão de aprendizagem como o Moodle,
                      coletando dados sobre frequência, notas, engajamento em atividades, tempo gasto em recursos e
                      muito mais. Nossa plataforma também pode importar dados de outros sistemas acadêmicos, garantindo
                      uma visão completa do desempenho do aluno.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Análise Preditiva com IA</h3>
                    <p className="text-muted-foreground">
                      Nossos algoritmos de inteligência artificial analisam padrões complexos nos dados dos alunos,
                      identificando indicadores precoces de risco de evasão que poderiam passar despercebidos. O sistema
                      aprende continuamente, melhorando suas previsões com o tempo e adaptando-se às características
                      específicas de cada instituição.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Visualização e Insights</h3>
                    <p className="text-muted-foreground">
                      Dashboards intuitivos apresentam os dados de forma clara e acionável, permitindo que
                      administradores e educadores identifiquem rapidamente tendências e áreas problemáticas. Relatórios
                      detalhados fornecem insights sobre fatores específicos que contribuem para o risco de cada aluno.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Recomendações Personalizadas</h3>
                    <p className="text-muted-foreground">
                      Além de identificar alunos em risco, o EduInsight sugere intervenções específicas baseadas em
                      evidências, personalizadas para cada situação. Estas recomendações são priorizadas por impacto
                      potencial, ajudando as instituições a alocar recursos de forma eficiente.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-6 text-center text-2xl font-bold">Benefícios</h2>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl border p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Redução Significativa da Evasão</h3>
                      <p className="text-muted-foreground">
                        Instituições que utilizam o EduInsight relatam reduções de até 35% nas taxas de evasão após o
                        primeiro ano de implementação.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Melhoria no Desempenho Acadêmico</h3>
                      <p className="text-muted-foreground">
                        As intervenções baseadas em dados não apenas previnem a evasão, mas também melhoram o desempenho
                        geral dos alunos, com aumento médio de 15% nas notas.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Otimização de Recursos</h3>
                      <p className="text-muted-foreground">
                        Ao identificar precisamente quais alunos necessitam de apoio e quais intervenções são mais
                        eficazes, as instituições podem alocar seus recursos de forma mais eficiente.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Cultura Baseada em Dados</h3>
                      <p className="text-muted-foreground">
                        O EduInsight promove uma cultura institucional de tomada de decisões baseada em dados,
                        melhorando não apenas a retenção, mas todos os aspectos da experiência educacional.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 p-8 text-center">
              <h2 className="mb-6 text-2xl font-bold">Comece Hoje Mesmo</h2>
              <p className="mb-8 text-lg">
                Junte-se às centenas de instituições que já estão transformando seus índices de retenção com o
                EduInsight. Nossa plataforma é fácil de implementar e oferece resultados rápidos.
              </p>
              <Link href="/dashboard">
                <Button size="lg" className="rounded-full">
                  Acessar Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
