import Footer from "@/components/footer/Footer";
import { Header } from "@/components/Header";
import PostsList from "@/components/postabertos/PostsList";

export default function sobre() {
  return (
    <div>
      <Header />
      <div className="bg-gray-100 min-h-screen p-8">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">Sobre Nós</h1>
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Informações Gerais</h2>
            <p className="text-gray-700 leading-relaxed">
              Bem-vindo ao Concursos Agora, o seu portal dedicado a tudo relacionado a concursos públicos no Brasil. Nossa missão é ser uma fonte confiável de informações e apoio para aqueles que desejam alcançar o tão sonhado cargo público ou encontrar o emprego ideal.
            </p>
          </section>
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">O que fazemos</h2>
            <h3 className="text-xl font-semibold mb-2">Concursos Públicos no Brasil</h3>
            <p className="text-gray-700 leading-relaxed">
              Fornecemos informações detalhadas sobre os concursos públicos em andamento e previstos em diversas áreas e níveis de governo. Desde editais abertos até resultados finais, mantemos você atualizado sobre tudo que importa.
            </p>
            <h3 className="text-xl font-semibold mt-4 mb-2">Concursos Previstos</h3>
            <p className="text-gray-700 leading-relaxed">
              Fique por dentro dos concursos que estão por vir. Oferecemos previsões e notícias sobre futuras oportunidades, ajudando você a se preparar com antecedência.
            </p>
            <h3 className="text-xl font-semibold mt-4 mb-2">Notícias sobre Concursos</h3>
            <p className="text-gray-700 leading-relaxed">
              Nossa equipe está sempre atenta às últimas notícias e atualizações sobre concursos públicos. Queremos que você tenha acesso às informações mais recentes e relevantes, para que esteja sempre um passo à frente.
            </p>
            <h3 className="text-xl font-semibold mt-4 mb-2">Empregos</h3>
            <p className="text-gray-700 leading-relaxed">
              Além de concursos públicos, oferecemos uma seção dedicada a oportunidades de emprego em várias áreas. Se você está buscando uma nova colocação no mercado de trabalho, nós podemos ajudar.
            </p>
            <h3 className="text-xl font-semibold mt-4 mb-2">Dicas de Estudo</h3>
            <p className="text-gray-700 leading-relaxed">
              Sucesso em concursos e empregos muitas vezes depende de uma preparação adequada. Compartilhamos dicas de estudo, materiais e estratégias para ajudar você a se preparar da melhor maneira possível.
            </p>
          </section>
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Nossa Missão</h2>
            <p className="text-gray-700 leading-relaxed">
              No Concursos Agora, acreditamos que todos têm o potencial de alcançar seus objetivos profissionais. Estamos aqui para fornecer as ferramentas e informações necessárias para que você possa atingir o sucesso. Nosso compromisso é com a transparência, a precisão e o apoio contínuo aos nossos usuários.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">Por que nos escolher</h2>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed">
              <li><strong>Fonte Confiável:</strong> Comprometemo-nos a oferecer informações precisas e atualizadas, para que você possa tomar decisões informadas.</li>
              <li><strong>Equipe Dedicada:</strong> Nossa equipe é composta por especialistas apaixonados por ajudar você a alcançar suas metas.</li>
              <li><strong>Comunidade Engajada:</strong> Somos mais do que um site; somos uma comunidade de pessoas determinadas a conquistar seus sonhos.</li>
            </ul>
          </section>
        </div>
      </div>
      <PostsList />
      <Footer />
    </div>
  );
}
