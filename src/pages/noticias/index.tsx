import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { gql } from "@apollo/client";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import Empty from "@/components/Empty";
import { Header } from "@/components/Header";
import { GetServerSideProps } from "next";
import { client } from "@/lib/apollo";
import Footer from "@/components/footer/Footer";
import { CardNoticias } from "@/components/noticias/CardNoticias";

const GET_ALL_NOTICIAS = gql`
  query GetAllNoticias {
    noticias(orderBy: updatedAt_DESC) {
      id
      slugnoticia
      titlenoticia
      subtitlenoticia
      createdAt
      noticiaCoverImage {
        url
      }
      author {
        name
      }
    }
  }
`;

interface Noticia {
  id: string;
  slugnoticia: string;
  titlenoticia: string;
  subtitlenoticia: string;
  createdAt: string;
  noticiaCoverImage: {
    url: string;
  };
  author: {
    name: string;
  };
}

interface AllNoticias {
  noticias: Noticia[];
}

export default function NoticiasPage({ noticias }: AllNoticias) {
  return (
    <>
      <Head>
        <title>Últimas Notícias</title>
        <meta
          name="description"
          content="Fique atualizado com as últimas notícias e novidades."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="w-full max-w-[1120px] flex flex-col mx-auto pb-12 px-4">
        <Header />
        <Link
          href="/"
          className="flex w-full mt-5 max-w-fit font-bold text-zinc-900 hover:text-zinc-600"
        >
          Voltar
        </Link>
        <div>
          <h1 className="text-red-900 text-xl font-bold font-sans italic text-shadow-md mt-10 ml-5 mb-5">
            Últimas Notícias
          </h1>
        </div>

        {noticias.length > 0 && (
          <Link
            href={`/noticia/${noticias[0].slugnoticia}`}
            className="w-full h-full flex gap-4 lg:gap-8 flex-col sm:flex-row items-center justify-center mt-12 hover:brightness-75 transition-all"
          >
            <div className="flex flex-1 h-full flex-col gap-3 lg:gap-6">
              <h1 className="font-bold text-3xl md:text-[40px] text-blue-600 line-clamp-2">
                {noticias[0].titlenoticia}
              </h1>
              <div>
              </div>
            </div>
          </Link>
        )}
        {noticias.length > 0 && (
          <Link
            href={`/noticia/${noticias[0].slugnoticia}`}
            className="w-full h-full flex gap-4 lg:gap-8 flex-col sm:flex-row items-center justify-center mt-12 hover:brightness-75 transition-all"
          >
            <div className="flex flex-1 w-full h-full min-h-[240px] md:min-h-[334px] relative rounded-2xl overflow-hidden">
              {noticias[0].noticiaCoverImage ? (
                <Image
                  src={noticias[0].noticiaCoverImage.url}
                  alt="Imagem de capa"
                  fill={true}
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span>Imagem não disponível</span>
                </div>
              )}
            </div>
            <div className="flex flex-1 h-full flex-col gap-3 lg:gap-6">
              <h1 className="font-bold text-3xl md:text-[40px] text-blue-600 line-clamp-2">
                {noticias[0].titlenoticia}
              </h1>
              <p className="text-zinc-600 text-sm md:text-base text-justify lg:text-left line-clamp-3">
                {noticias[0].subtitlenoticia}
              </p>
              <div>
                <p className="font-bold text-zinc-900 text-sm md:text-base">
                  {noticias[0].author.name}
                </p>
                <p className="text-zinc-600 text-xs md:text-sm">
                  {format(
                    new Date(noticias[0].createdAt),
                    "dd 'de' MMM 'de' yyyy",
                    { locale: ptBR }
                  )}
                </p>
              </div>
            </div>
          </Link>
        )}
        <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          {noticias.length > 0 ? (
            noticias
              .slice(1)
              .map((noticia) => (
                <CardNoticias
                  key={noticia.id}
                  title={noticia.titlenoticia}
                  subtitle={noticia.subtitlenoticia}
                  createdAt={noticia.createdAt}
                  urlImage={
                    noticia.noticiaCoverImage?.url ||
                    "/path/to/default/image.jpg"
                  }
                  slug={noticia.slugnoticia}
                  author={noticia.author.name}
                />
              ))
          ) : (
            <Empty />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data } = await client.query({ query: GET_ALL_NOTICIAS });
    return {
      props: { noticias: data.noticias },
    };
  } catch (error) {
    console.error("Erro ao carregar dados de Notícias:", error);
    return {
      props: { noticias: [] },
    };
  }
};
