import Image from 'next/image';
import Link from 'next/link';
import { format, isValid } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

interface CardNoticiasProps {
  title: string;
  subtitle: string;
  author: string;
  createdAt: string;
  urlImage: string;
  slug: string;
}

export function CardNoticias({ author, createdAt, subtitle, title, urlImage, slug }: CardNoticiasProps) {
  const date = new Date(createdAt);

  return (
    <Link 
      href={`/noticia/${slug}`}
      className="w-full sm:max-w-[352px] h-full flex flex-col items-center justify-between gap-2 sm:gap-4 hover:brightness-75 transition-all"
    >
      <div className='flex w-full h-[200px] sm:h-[234px] relative rounded-2xl overflow-hidden'>
        <Image 
          src={urlImage}
          alt={title}
          fill={true}
          style={{ objectFit: "cover" }}
          className="rounded-lg"
        />
      </div>

      <div className='flex w-full flex-1 flex-col justify-between gap-1 sm:gap-2'>
        <h1 className='font-bold text-lg sm:text-xl text-blue-600 line-clamp-2'>{title}</h1>
        <p className='text-zinc-600 hidden md:flex flex-1 text-justify lg:text-left text-sm line-clamp-3'>{subtitle}</p>

        <div>
          <p className='font-bold text-zinc-900 text-sm md:text-base'>{author}</p>
          <p className='text-zinc-600 text-xs md:text-sm'>
            {isValid(date) ? format(date, "dd 'de' MMM 'de' yyyy", { locale: ptBR }) : 'Data inválida'}
          </p>
        </div>
      </div>
    </Link>
  );
}
