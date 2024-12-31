import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import 'animate.css';

interface CardPostProps {
  title: string;
  subtitle: string;
  author: string;
  createdAt: string;
  urlImage: string;
  slug: string;
  authorImage?: string;
}

export function CardPost({
  author,
  createdAt,
  subtitle,
  title,
  urlImage,
  slug,
  authorImage,
}: CardPostProps) {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.3, // 30% do elemento visível para ativar
    triggerOnce: true, // Executa uma vez ao entrar na viewport
  });

  return (
    <div
      className={`w-full sm:max-w-[352px] h-full flex flex-col items-center justify-between gap-2 sm:gap-4 
        transition-opacity duration-300 ${
          isVisible ? "opacity-100 animate__animated animate__zoomInDown" : "opacity-100"
        }`}
      ref={ref as any}
    >
      <Link
        href={`/aberto/${slug}`}
        className="w-full h-full flex flex-col items-center justify-between gap-2 sm:gap-4 hover:brightness-75 transition-all"
      >
        <div className="flex w-full h-[200px] sm:h-[234px] relative overflow-hidden">
          <Image
            src={urlImage}
            alt=""
            fill={true}
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="flex w-full flex-1 flex-col justify-between gap-1 sm:gap-2">
          <h1 className="font-bold text-lg sm:text-xl text-blue-600 clamp-2">
            {title}
          </h1>
          <p className="text-zinc-600 hidden md:flex flex-1 text-justify lg:text-left text-sm clamp-3">
            {subtitle}
          </p>
        </div>
      </Link>
      <Link href="/" legacyBehavior>
        <a className="w-full flex items-center mt-2">
          {authorImage && (
            <Image
              src={authorImage}
              alt={author}
              width={40}
              height={40}
              className="rounded-full mr-2"
            />
          )}
          <div>
            <p className="font-bold text-zinc-900 text-sm md:text-base">
              {author}
            </p>
            <p className="text-zinc-600 text-xs md:text-sm">
              {format(new Date(createdAt), "dd 'de' MMM 'de' yyyy", {
                locale: ptBR,
              })}
            </p>
          </div>
        </a>
      </Link>
    </div>
  );
}
