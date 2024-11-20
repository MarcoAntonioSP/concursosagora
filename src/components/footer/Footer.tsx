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
          <h3>Destaques</h3>
          <ul className='flex flex-col'  >
            <li><a href="/home"><span className="w-2.5 h-2.5 bg-yellow-500 rounded-full inline-block mr-2"></span> Home</a></li>
            <li><a href="/sobre"><span className="w-2.5 h-2.5 bg-yellow-500 rounded-full inline-block mr-2"></span> Sobre Nós</a></li>
            <li><a href="/produtos"><span className="w-2.5 h-2.5 bg-yellow-500 rounded-full inline-block mr-2"></span> Produtos</a></li>
            <li><a href="/blog"><span className="w-2.5 h-2.5 bg-yellow-500 rounded-full inline-block mr-2"></span> Blog</a></li>
            <li><a href="/trabalhe-conosco"><span className="w-2.5 h-2.5 bg-yellow-500 rounded-full inline-block mr-2"></span> Trabalhe Conosco</a></li>
            <li><a href="/politica-de-privacidade"><span className="w-2.5 h-2.5 bg-yellow-500 rounded-full inline-block mr-2"></span> Política de Privacidade</a></li>
          </ul>
        </div>
      </div>
      <div><h1>ksaldjaskldjakl</h1></div>
    </div>
  );
}
