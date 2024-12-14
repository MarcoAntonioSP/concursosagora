import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import Footer from "@/components/footer/Footer";
import Link from "next/link";

export default function Sobre() {
  return (
    <div>
      <Header />
      <div className="bg-gradient-to-b from-blue-500 to-blue-800 min-h-screen text-white flex items-center justify-center mt-11 px-6 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white text-gray-800 p-8 rounded-lg shadow-lg max-w-3xl w-full"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
            Sobre o Concursos Agora
          </h1>
          <p className="text-lg leading-relaxed mb-6 text-center">
            Fundado em 2024, o <strong>Concursos Agora</strong> nasceu com a
            missão de ajudar você a conquistar sua tão sonhada vaga na área
            pública. Somos um portal especializado em{" "}
            <span className="text-blue-500 font-semibold">
              notícias, informações e materiais de estudo para concursos
              públicos
            </span>{" "}
            em todas as esferas – municipais, estaduais e federais.
          </p>
          <ul className="space-y-4 mb-6">
            <li className="flex items-start">
              <FaCheckCircle className="text-blue-500 w-6 h-6 mr-3" />
              <span>
                Mais de 300 novas publicações mensais cobrindo editais, prazos e
                requisitos de concursos públicos.
              </span>
            </li>
            <li className="flex items-start">
              <FaCheckCircle className="text-blue-500 w-6 h-6 mr-3" />
              <span>
                Materiais de estudo que ajudam você a se preparar para os
                melhores resultados.
              </span>
            </li>
            <li className="flex items-start">
              <FaCheckCircle className="text-blue-500 w-6 h-6 mr-3" />
              <span>
                Conteúdo atualizado e detalhado sobre seleções em todas as
                esferas públicas.
              </span>
            </li>
          </ul>
          <p className="text-lg leading-relaxed text-center">
            Estamos constantemente evoluindo, criando novas ferramentas e
            funcionalidades para tornar sua experiência ainda melhor.{" "}
            <span className="text-blue-500 font-semibold">
              Continue com a gente
            </span>{" "}
            e dê o próximo passo rumo ao seu futuro na carreira pública.
          </p>
          <Link href="/abertos">
            <div className="text-center mt-8">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-6 py-3 text-lg font-semibold bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
              >
                Saiba Mais
              </motion.a>
            </div>
          </Link>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
