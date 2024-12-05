import Footer from "@/components/footer/Footer";
import { Header } from "@/components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserShield,
  faClipboardList,
  faCookieBite,
  faLock,
  faUserEdit,
  faSyncAlt,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

export default function PoliticaPrivacidade() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-100 py-12 px-6 lg:px-24">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            <FontAwesomeIcon icon={faUserShield} className="text-blue-600 mr-2" />
            Política de Privacidade
          </h1>
          <p className="text-gray-700 mb-4">
            Sua privacidade é prioridade no **Concursos Agora**. Este documento
            descreve como coletamos, usamos e protegemos suas informações ao
            acessar nosso site e usufruir dos nossos serviços.
          </p>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              <FontAwesomeIcon icon={faClipboardList} className="text-green-600 mr-2" />
              1. Coleta de Informações
            </h2>
            <p className="text-gray-700">
              Nós coletamos informações fornecidas por você, como nome e e-mail,
              e dados automáticos, como endereço IP e navegação no site.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              <FontAwesomeIcon icon={faClipboardList} className="text-green-600 mr-2" />
              2. Uso de Informações
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>Enviar notificações sobre concursos e atualizações.</li>
              <li>Aprimorar sua experiência de navegação.</li>
              <li>Resolver dúvidas e prestar suporte ao cliente.</li>
            </ul>
            <p className="text-gray-700 mt-2">
              Suas informações nunca serão compartilhadas com terceiros sem seu
              consentimento, salvo obrigações legais.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              <FontAwesomeIcon icon={faCookieBite} className="text-yellow-600 mr-2" />
              3. Cookies e Tecnologias Semelhantes
            </h2>
            <p className="text-gray-700">
              Utilizamos cookies para otimizar sua navegação, incluindo:
            </p>
            <ul className="list-disc list-inside text-gray-700">
              <li>
                <strong>Cookies Essenciais:</strong> Para garantir o bom
                funcionamento do site.
              </li>
              <li>
                <strong>Cookies de Desempenho:</strong> Para medir o uso do site.
              </li>
            </ul>
            <p className="text-gray-700 mt-2">
              Você pode gerenciar os cookies em seu navegador.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              <FontAwesomeIcon icon={faLock} className="text-red-600 mr-2" />
              4. Segurança
            </h2>
            <p className="text-gray-700">
              Adotamos medidas rigorosas para proteger suas informações de
              acessos não autorizados.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              <FontAwesomeIcon icon={faUserEdit} className="text-purple-600 mr-2" />
              5. Direitos dos Usuários
            </h2>
            <p className="text-gray-700">
              Você pode acessar, corrigir ou excluir suas informações. Entre em
              contato conosco pelo e-mail:
              <a
                href="mailto:contato@concursosagora.com.br"
                className="text-blue-600 underline ml-1"
              >
                contato@concursosagora.com.br
              </a>
              .
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              <FontAwesomeIcon icon={faSyncAlt} className="text-teal-600 mr-2" />
              6. Alterações na Política
            </h2>
            <p className="text-gray-700">
              Recomendamos revisar esta política regularmente para atualizações.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              <FontAwesomeIcon icon={faEnvelope} className="text-indigo-600 mr-2" />
              7. Contato
            </h2>
            <p className="text-gray-700">
              Dúvidas? Entre em contato pelo e-mail:
              <a
                href="mailto:contato@concursosagora.com.br"
                className="text-blue-600 underline ml-1"
              >
                contato@concursosagora.com.br
              </a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
