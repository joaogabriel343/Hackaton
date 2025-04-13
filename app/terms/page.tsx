import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
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

        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 text-3xl font-bold gradient-text">Termos de Uso</h1>

          <div className="space-y-6 text-foreground">
            <section>
              <h2 className="mb-3 text-xl font-semibold">1. Aceitação dos Termos</h2>
              <p>
                Ao acessar e utilizar o EduInsight, você concorda em cumprir e estar vinculado aos seguintes termos e
                condições de uso. Se você não concordar com qualquer parte destes termos, não deverá utilizar nosso
                serviço.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">2. Descrição do Serviço</h2>
              <p>
                O EduInsight é uma plataforma de análise de risco de evasão de alunos que utiliza inteligência
                artificial para identificar padrões e prever riscos. Nosso serviço é destinado a instituições de ensino
                e profissionais da educação.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">3. Contas de Usuário</h2>
              <p>
                Para utilizar determinadas funcionalidades do EduInsight, você precisará criar uma conta. Você é
                responsável por manter a confidencialidade de suas credenciais de acesso e por todas as atividades que
                ocorrerem em sua conta.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">4. Uso Aceitável</h2>
              <p>
                Você concorda em utilizar o EduInsight apenas para fins legítimos e de acordo com todas as leis e
                regulamentos aplicáveis. Você não deve utilizar o serviço para qualquer finalidade ilegal ou não
                autorizada.
              </p>
              <p className="mt-2">
                Você não deve tentar interferir no funcionamento adequado do serviço, incluindo, mas não se limitando a:
              </p>
              <ul className="mt-2 list-disc pl-6">
                <li>Tentar contornar medidas de segurança</li>
                <li>Acessar dados não destinados a você</li>
                <li>Tentar sobrecarregar nossos sistemas</li>
                <li>Introduzir malware ou outros códigos maliciosos</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">5. Propriedade Intelectual</h2>
              <p>
                Todo o conteúdo, recursos e funcionalidades disponíveis no EduInsight, incluindo, mas não se limitando
                a, texto, gráficos, logotipos, ícones, imagens, clipes de áudio, downloads digitais e compilações de
                dados, são propriedade do EduInsight ou de seus licenciadores e são protegidos por leis de direitos
                autorais, marcas registradas e outras leis de propriedade intelectual.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">6. Limitação de Responsabilidade</h2>
              <p>
                O EduInsight e seus fornecedores não serão responsáveis por quaisquer danos indiretos, incidentais,
                especiais, consequenciais ou punitivos, incluindo, sem limitação, perda de lucros, dados, uso, boa
                vontade ou outras perdas intangíveis, resultantes de:
              </p>
              <ul className="mt-2 list-disc pl-6">
                <li>Seu acesso ou uso ou incapacidade de acessar ou usar o serviço</li>
                <li>Qualquer conduta ou conteúdo de terceiros no serviço</li>
                <li>Acesso não autorizado, uso ou alteração de suas transmissões ou conteúdo</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">7. Modificações do Serviço</h2>
              <p>
                Reservamo-nos o direito de modificar ou descontinuar, temporária ou permanentemente, o serviço (ou
                qualquer parte dele) com ou sem aviso prévio. Não seremos responsáveis perante você ou terceiros por
                qualquer modificação, suspensão ou descontinuação do serviço.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">8. Alterações nos Termos</h2>
              <p>
                Reservamo-nos o direito, a nosso critério exclusivo, de modificar ou substituir estes termos a qualquer
                momento. Se uma revisão for material, tentaremos fornecer um aviso com pelo menos 30 dias de
                antecedência antes que quaisquer novos termos entrem em vigor. O que constitui uma alteração material
                será determinado a nosso critério exclusivo.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">9. Lei Aplicável</h2>
              <p>
                Estes termos serão regidos e interpretados de acordo com as leis do Brasil, sem considerar suas
                disposições de conflito de leis.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">10. Contato</h2>
              <p>
                Se você tiver alguma dúvida sobre estes Termos, entre em contato conosco pelo e-mail:
                centraldeatendimento@unifenas.br. 
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
