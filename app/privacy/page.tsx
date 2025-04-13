import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
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
          <h1 className="mb-8 text-3xl font-bold gradient-text">Política de Privacidade</h1>

          <div className="space-y-6 text-foreground">
            <section>
              <h2 className="mb-3 text-xl font-semibold">1. Introdução</h2>
              <p>
                A EduInsight está comprometida em proteger sua privacidade. Esta Política de Privacidade explica como
                coletamos, usamos, divulgamos, transferimos e armazenamos suas informações. Por favor, reserve um
                momento para se familiarizar com nossas práticas de privacidade.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">2. Informações que Coletamos</h2>
              <p>Podemos coletar os seguintes tipos de informações:</p>
              <ul className="mt-2 list-disc pl-6">
                <li>
                  <strong>Informações de Conta:</strong> Nome, endereço de e-mail, senha, instituição de ensino e cargo.
                </li>
                <li>
                  <strong>Dados de Alunos:</strong> Informações acadêmicas, incluindo frequência, notas, engajamento e
                  outras métricas relevantes para análise de risco de evasão.
                </li>
                <li>
                  <strong>Dados de Uso:</strong> Informações sobre como você utiliza nosso serviço, incluindo logs,
                  estatísticas de acesso e interações com a plataforma.
                </li>
                <li>
                  <strong>Informações do Dispositivo:</strong> Dados sobre o dispositivo que você usa para acessar nosso
                  serviço, como modelo de hardware, sistema operacional e versão, identificadores únicos de dispositivo
                  e informações de rede móvel.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">3. Como Usamos Suas Informações</h2>
              <p>Utilizamos as informações coletadas para:</p>
              <ul className="mt-2 list-disc pl-6">
                <li>Fornecer, manter e melhorar nossos serviços</li>
                <li>Processar e completar transações</li>
                <li>Enviar confirmações, faturas e outras informações relacionadas ao serviço</li>
                <li>Responder a comentários, perguntas e solicitações</li>
                <li>Monitorar e analisar tendências, uso e atividades relacionadas aos nossos serviços</li>
                <li>Personalizar e melhorar a experiência do usuário</li>
                <li>Desenvolver novos produtos e serviços</li>
                <li>Detectar, investigar e prevenir atividades fraudulentas e não autorizadas</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">4. Compartilhamento de Informações</h2>
              <p>
                Não vendemos ou alugamos suas informações pessoais a terceiros. Podemos compartilhar suas informações
                nas seguintes circunstâncias:
              </p>
              <ul className="mt-2 list-disc pl-6">
                <li>
                  Com fornecedores, consultores e outros prestadores de serviços que precisam acessar essas informações
                  para realizar trabalhos em nosso nome
                </li>
                <li>
                  Em resposta a uma solicitação de informações se acreditarmos que a divulgação está de acordo com
                  qualquer lei, regulamento ou processo legal aplicável
                </li>
                <li>Para proteger os direitos, propriedade e segurança da EduInsight, nossos usuários ou o público</li>
                <li>
                  Em conexão com, ou durante negociações de, qualquer fusão, venda de ativos da empresa, financiamento
                  ou aquisição de todo ou parte de nosso negócio por outra empresa
                </li>
                <li>Com seu consentimento ou sob sua direção</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">5. Segurança de Dados</h2>
              <p>
                Implementamos medidas de segurança técnicas, administrativas e físicas projetadas para proteger a
                confidencialidade, integridade e disponibilidade de suas informações pessoais. No entanto, nenhum
                sistema de segurança é impenetrável e não podemos garantir a segurança de nossas bases de dados, nem
                podemos garantir que as informações que você fornece não serão interceptadas durante a transmissão para
                nós pela Internet.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">6. Retenção de Dados</h2>
              <p>
                Retemos suas informações pessoais pelo tempo necessário para cumprir os propósitos descritos nesta
                Política de Privacidade, a menos que um período de retenção mais longo seja exigido ou permitido por
                lei.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">7. Seus Direitos</h2>
              <p>
                Dependendo da sua localização, você pode ter certos direitos em relação às suas informações pessoais,
                incluindo:
              </p>
              <ul className="mt-2 list-disc pl-6">
                <li>Direito de acesso às suas informações pessoais</li>
                <li>Direito de retificar informações imprecisas</li>
                <li>Direito de apagar suas informações pessoais</li>
                <li>Direito de restringir o processamento de suas informações pessoais</li>
                <li>Direito à portabilidade de dados</li>
                <li>Direito de se opor ao processamento de suas informações pessoais</li>
                <li>Direito de não estar sujeito a decisões automatizadas, incluindo criação de perfil</li>
              </ul>
              <p className="mt-2">
                Para exercer qualquer um desses direitos, entre em contato conosco através do e-mail
                privacy@eduinsight.com.br.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">8. Alterações nesta Política</h2>
              <p>
                Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre quaisquer
                alterações publicando a nova Política de Privacidade nesta página e, se as alterações forem
                significativas, enviaremos uma notificação por e-mail ou através de um aviso em nosso site antes que a
                alteração entre em vigor.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">9. Conformidade com a LGPD</h2>
              <p>
                Estamos comprometidos em cumprir a Lei Geral de Proteção de Dados (LGPD) do Brasil. Tratamos seus dados
                pessoais de acordo com os princípios estabelecidos na LGPD e garantimos que você possa exercer seus
                direitos conforme previsto na lei.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">10. Contato</h2>
              <p>
                Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco pelo e-mail:
                centraldeatendimento@unifenas.br. 
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  )
}
