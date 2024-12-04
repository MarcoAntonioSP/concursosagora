import Image from "next/image";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

export default function Footer() {
  const [refSocial, isVisibleSocial] = useIntersectionObserver({
    threshold: 0.5,
    triggerOnce: true,
  });
  const [refNav, isVisibleNav] = useIntersectionObserver({
    threshold: 0.5,
    triggerOnce: true,
  });
  const [refLegal, isVisibleLegal] = useIntersectionObserver({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <footer className="w-full mt-5 p-8 bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Redes Sociais */}
        <div
          className={`flex flex-col items-center sm:items-start ${
            isVisibleSocial
              ? "opacity-100 animate-fade-right animate-once animate-duration-[2000ms] animate-ease-out animate-normal animate-fill-backwards"
              : "opacity-0"
          }`}
          ref={refSocial}
        >
          <h3 className="font-bold text-blue-400 mb-4 text-lg text-center sm:text-left">
            Redes Sociais
          </h3>
          <ul className="flex space-x-6 justify-center sm:justify-start">
            <li>
              <a
                href="https://www.facebook.com/profile.php?id=61569670136437"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/facebookicon.png"
                  alt="Facebook"
                  width={34}
                  height={34}
                />
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/profile.php?id=61569670136437"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/instagranicon.png"
                  alt="Instagram"
                  width={34}
                  height={34}
                />
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/5511919072390"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/whatsapp.png"
                  alt="WhatsApp"
                  width={34}
                  height={34}
                />
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/profile.php?id=61569670136437"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/linkdinicon.png"
                  alt="LinkedIn"
                  width={34}
                  height={34}
                />
              </a>
            </li>
          </ul>
        </div>

        {/* Navegação */}
        <div
          className={`flex flex-col items-center sm:items-start ${
            isVisibleNav
              ? "opacity-100 animate-fade-up animate-once animate-duration-[2000ms] animate-ease-out animate-normal animate-fill-backwards"
              : "opacity-0"
          }`}
          ref={refNav}
        >
          <h3 className="font-bold text-blue-400 mb-4 text-lg text-center sm:text-left">
            Navegação
          </h3>
          <ul className="flex flex-col space-y-2">
            <li>
              <a href="/" className="hover:text-blue-400 transition-colors">
                Início
              </a>
            </li>
            <li>
              <a href="/abertos" className="hover:text-blue-400 transition-colors">
                Vagas Abertas
              </a>
            </li>
            <li>
              <a href="/previstos" className="hover:text-blue-400 transition-colors">
                Vagas Previstas
              </a>
            </li>
            <li>
              <a href="/empregos" className="hover:text-blue-400 transition-colors">
                Empregos
              </a>
            </li>
            <li>
              <a href="/sobre" className="hover:text-blue-400 transition-colors">
                Sobre Nós
              </a>
            </li>
          </ul>
        </div>

        {/* Informações Legais */}
        <div
          className={`flex flex-col items-center sm:items-start ${
            isVisibleLegal
              ? "opacity-100 animate-fade-left animate-once animate-duration-[2000ms] animate-ease-out animate-normal animate-fill-backwards"
              : "opacity-0"
          }`}
          ref={refLegal}
        >
          <h3 className="font-bold text-blue-400 mb-4 text-lg text-center sm:text-left">
            Informações Legais
          </h3>
          <ul className="flex flex-col space-y-2">
            <li>
              <a
                href="/politicaprivacidade"
                className="hover:text-blue-400 transition-colors"
              >
                Política de Privacidade
              </a>
            </li>
            <li>
              <a
                href="/diretrizeseditoriais"
                className="hover:text-blue-400 transition-colors"
              >
                Diretrizes Editoriais
              </a>
            </li>
            <li>
              <a href="/contato" className="hover:text-blue-400 transition-colors">
                Fale Conosco
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Base */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        © 2024 Concursos Agora. Todos os direitos reservados.
      </div>
    </footer>
  );
}
