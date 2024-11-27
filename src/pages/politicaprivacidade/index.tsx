import Footer from "@/components/footer/Footer";
import { Header } from "@/components/Header";

export default function politicaprivacidade() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-100 py-12 px-6 lg:px-24">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Política de Privacidade</h1>
          <p className="text-gray-700 mb-4">
            Sua privacidade é importante para nós. Este documento explica como coletamos,
            utilizamos e protegemos suas informações pessoais ao usar nosso site.
          </p>
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">1. Coleta de Informações</h2>
            <p className="text-gray-700">
              Podemos coletar informações pessoais que você fornece diretamente, como nome, e-mail e telefone, 
              e informações automáticas, como dados de navegação e IP.
            </p>
          </section>
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">2. Uso de Informações</h2>
            <p className="text-gray-700">
              Utilizamos suas informações para personalizar sua experiência, melhorar nosso site e 
              oferecer suporte ao cliente. Seus dados não serão compartilhados sem sua permissão.
            </p>
          </section>
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">3. Cookies</h2>
            <p className="text-gray-700">
              Utilizamos cookies para coletar informações anônimas sobre sua navegação. Você pode 
              desativar os cookies nas configurações do seu navegador.
            </p>
          </section>
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">4. Segurança</h2>
            <p className="text-gray-700">
              Implementamos medidas de segurança avançadas para proteger suas informações contra acesso não autorizado.
            </p>
          </section>
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">5. Alterações na Política</h2>
            <p className="text-gray-700">
              Esta política pode ser atualizada periodicamente. Recomendamos revisar esta página com frequência para 
              se manter informado.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">6. Contato</h2>
            <p className="text-gray-700">
              Caso tenha dúvidas ou preocupações sobre esta política, entre em contato conosco pelo e-mail 
              <a href="mailto:suporte@seusite.com" className="text-blue-600 underline ml-1">marco.agostinoo@hotmail.com</a>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
