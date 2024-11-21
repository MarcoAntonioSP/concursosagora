import Image from 'next/image';

export default function Footer() {
  return (
    <div className="w-full p-5 mt-2 bg-gray-800 text-white">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <h3 className="font-bold text-blue-400 text-center">Redes Sociais</h3>
          <ul className="flex justify-center md:justify-start space-x-4">
            <li>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Image className="m-1" src="/facebookicon.png" alt="Facebook" width={34} height={24} />
              </a>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Image className="m-1" src="/instagranicon.png" alt="Instagram" width={34} height={24} />
              </a>
            </li>
            <li>
              <a href="https://wa.me" target="_blank" rel="noopener noreferrer">
                <Image className="m-1" src="/whatsapp.png" alt="WhatsApp" width={34} height={24} />
              </a>
            </li>
            <li>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Image className="m-1" src="/linkdinicon.png" alt="LinkedIn" width={34} height={24} />
              </a>
            </li>
          </ul>
        </div>
        <div className="mb-6 md:mb-0">
          <h3 className="font-bold text-blue-400 text-center">Destaques</h3>
          <ul className="flex flex-col space-y-2">
            <li><a href="/" className="hover:underline">Inicio</a></li>
            <li><a href="/abertos" className="hover:underline">Vagas Abertas</a></li>
            <li><a href="/previstos" className="hover:underline">Vagas Previstas</a></li>
            <li><a href="/empregos" className="hover:underline">Empregos</a></li>
            <li><a href="/contato" className="hover:underline">contato</a></li>
          </ul>
        </div>
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h3 className="font-bold text-blue-400">Contato</h3>
          <p>Telefone: (15) 3359-1400</p>
          <p>Email: <a href="mailto:contato@eripack.com.br" className="hover:underline">contato@eripack.com.br</a></p>
          <div className="mt-4">
            <h3 className="font-bold text-blue-400">Endereço</h3>
            <p>Sorocaba / SP</p>
            <p>Av. Georg Schaeffer, 1150, Sorocaba - SP, CEP: 18087-175</p>
          </div>
        </div>
      </div>
    </div>
  );
}
