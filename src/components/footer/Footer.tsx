import Image from 'next/image';
import styles from './footer.module.css';

export default function Footer() {
  return (
    <div className='w-full flex justify-around p-5 bg-zinc-400  h-96' >
      <div>
      <div className="">
          <h3 className='font-bold text-blue-600 text-center'>Redes Sociais</h3>
          <ul className='flex flex-row'>
            <li>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Image src="/facebookicon.png" alt="Facebook" width={48} height={30} />
              </a>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Image src="/instagranicon.png" alt="Instagram" width={48} height={30} />
              </a>
            </li>
            <li>
              <a href="https://wa.me" target="_blank" rel="noopener noreferrer">
                <Image src="/whatsapp.png" alt="WhatsApp" width={48} height={30} />
              </a>
            </li>
            <li>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Image src="/linkdinicon.png" alt="LinkedIn" width={50} height={30} />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div>
      <div className=''>
          <h3 className='font-bold text-blue-600 text-center'>Destaques</h3>
          <ul className='flex flex-col font-bold text-blue-600 text-centerl'  >
            <li><a href="/home"><span className="w-2.5 h-2.5 bg-yellow-500 rounded-full inline-block mr-2"></span> Inicio</a></li>
            <li><a href="/sobre"><span className="w-2.5 h-2.5 bg-yellow-500 rounded-full inline-block mr-2"></span> Vagas Abertas</a></li>
            <li><a href="/produtos"><span className="w-2.5 h-2.5 bg-yellow-500 rounded-full inline-block mr-2"></span> Vagas Previstas</a></li>
            <li><a href="/trabalhe-conosco"><span className="w-2.5 h-2.5 bg-yellow-500 rounded-full inline-block mr-2"></span> Contato</a></li>
            <li><a href="/politica-de-privacidade"><span className="w-2.5 h-2.5 bg-yellow-500 rounded-full inline-block mr-2"></span> Política de Privacidade</a></li>
          </ul>
        </div>
      </div>
      <div>
      <div>
          <h3>Contato</h3>
          <p>Telefone: (15) 3359-1400</p>
          <p>Email: <a href="mailto:contato@eripack.com.br">contato@eripack.com.br</a></p>
        </div>

        <div>
          <h3>Endereço</h3>
          <p>Sorocaba / SP</p>
          <p>Av. Georg Schaeffer, 1150, Sorocaba - SP, CEP: 18087-175</p>
        </div>
      </div>
    </div>
  );
}
