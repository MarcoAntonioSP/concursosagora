import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

interface CardPrevistoProps {
  title: string;
  subtitle: string;
  author: string;
  createdAt: string;
  urlImage: string;
  slug: string;
  authorImage?: string; // Adicionando authorImage como opcional
}

export function CardPrevisto({
  author,
  createdAt,
  subtitle,
  title,
  urlImage,
  slug,
  authorImage,
}: CardPrevistoProps) {
  return (
    <Link
      href={`/previsto/${slug}`}
      className="w-full sm:max-w-[352px] h-full flex flex-col items-center justify-between gap-2 sm:gap-4 hover:brightness-75 transition-all"
    >
      <div className="flex w-full h-[200px] sm:h-[234px] relative overflow-hidden">
        <Image
          src={urlImage}
          alt={title}
          fill={true}
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="flex w-full flex-1 flex-col justify-between gap-1 sm:gap-2">
        <h1 className="font-bold text-lg sm:text-xl text-blue-600 line-clamp-2">{title}</h1>
        <p className="text-zinc-600 hidden md:flex flex-1 text-justify lg:text-left text-sm line-clamp-3">{subtitle}</p>

        <div className="w-full flex items-center mt-2 gap-2">
          {authorImage && (
            <Image
              src={authorImage}
              alt={`Foto do autor ${author}`}
              width={40}
              height={40}
              className="rounded-full"
            />
          )}
          <div>
            <p className="font-bold text-zinc-900 text-sm md:text-base">{author}</p>
            <p className="text-zinc-600 text-xs md:text-sm">
              {format(new Date(createdAt), "dd 'de' MMM 'de' yyyy", {
                locale: ptBR,
              })}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
