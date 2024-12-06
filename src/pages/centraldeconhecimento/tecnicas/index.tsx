import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { gql } from "@apollo/client";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Header } from "@/components/Header";
import Footer from "@/components/footer/Footer";
import { GetServerSideProps } from "next";
import { client } from "@/lib/apollo";
import Empty from "@/components/Empty";
import { CardTecnicas } from "@/components/tecnicas/CardTecnicas";

// Consulta GraphQL ajustada para seu caso
const GET_ALL_TECNICAS = gql`
  query GetAllTecnicas {
    tecnicas(orderBy: updatedAt_DESC) {
      id
      slugtecnica
      titletecnica
      createdAt
      tecnicaCoverImage {
        url
      }
      author {
        name
        coverImageAuthor {
          url
        }
      }
    }
  }
`;

interface AllTecnicas {
  tecnicas: {
    id: string;
    slugtecnica: string;
    titletecnica: string;
    createdAt: string;
    tecnicaCoverImage: {
      url: string;
    };
    author: {
      name: string;
      coverImageAuthor?: {
        url: string;
      };
    };
  }[];
}

export default function Home({ tecnicas }: AllTecnicas) {
  return (
    <>
      <Head>
        <title>ConcursosAgora Técnicas</title>
        <meta name="description" content="Técnicas de Estudo e Preparação" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="técnicas de estudo, preparação para concursos, como estudar"
        />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.concursosagora.com.br/tecnicas"
        />
        <meta
          property="og:title"
          content="Concursos Agora - Técnicas de Estudo"
        />
        <meta
          property="og:description"
          content="Descubra as melhores técnicas de estudo para concursos."
        />
        <meta
          property="og:image"
          content="https://www.concursosagora.com.br/images/og-image.jpg"
        />
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://www.concursosagora.com.br/tecnicas"
        />
        <meta
          property="twitter:title"
          content="Concursos Agora - Técnicas de Estudo"
        />
        <meta
          property="twitter:description"
          content="Descubra as melhores técnicas de estudo para concursos."
        />
        <meta
          property="twitter:image"
          content="https://www.concursosagora.com.br/images/twitter-image.jpg"
        />
      </Head>

      <div className="w-full max-w-[1120px] flex flex-col mx-auto pb-12 px-4">
        <Header />
        <Link
          href="/"
          className="flex w-full max-w-fit font-bold text-zinc-900 hover:text-zinc-600"
        >
          Voltar
        </Link>

        <div>
          <h1 className="text-red-900 text-xl font-bold font-sans italic text-shadow-md mt-10 ml-5">
            Técnicas de Estudo
          </h1>
        </div>

        {tecnicas.length > 0 && (
          <Link
            href={`/centraldeconhecimento/tecnica/${tecnicas[0].slugtecnica}`}
            className="w-full h-full flex gap-4 lg:gap-8 flex-col sm:flex-row items-center justify-center mt-12 hover:brightness-75 transition-all"
          >
            <div className="flex flex-1 w-full h-full min-h-[240px] md:min-h-[334px] relative overflow-hidden">
              {tecnicas[0].tecnicaCoverImage ? (
                <Image
                  src={tecnicas[0].tecnicaCoverImage.url}
                  alt="Imagem de capa"
                  fill={true}
                  style={{ objectFit: "contain" }}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span>Imagem não disponível</span>
                </div>
              )}
            </div>

            <div className="flex flex-1 h-full flex-col gap-3 lg:gap-6">
              <h1 className="font-bold text-3xl md:text-[40px] text-blue-600 line-clamp-2">
                {tecnicas[0].titletecnica}
              </h1>
              <p className="text-zinc-600 text-sm md:text-base text-justify lg:text-left line-clamp-3">
                {tecnicas[0].slugtecnica}
              </p>
              <div className="flex items-center gap-2">
                {tecnicas[0].author.coverImageAuthor?.url && (
                  <Image
                    src={tecnicas[0].author.coverImageAuthor.url}
                    alt={tecnicas[0].author.name}
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                )}
                <p className="font-bold text-zinc-900 text-sm md:text-base">
                  {tecnicas[0].author.name}
                </p>
                <p className="text-zinc-600 text-xs md:text-sm">
                  {format(new Date(tecnicas[0].createdAt), "dd 'de' MMM 'de' yyyy", { locale: ptBR })}
                </p>
              </div>
            </div>
          </Link>
        )}

        <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          {tecnicas.length > 0 ? (
            tecnicas.slice(1).map((tecnica) => (
              <CardTecnicas
                key={tecnica.id}
                title={tecnica.titletecnica}
                subtitle={tecnica.slugtecnica}
                authorImage={tecnica.author.coverImageAuthor?.url || ""}
                createdAt={tecnica.createdAt}
                urlImage={tecnica.tecnicaCoverImage?.url}
                slug={tecnica.slugtecnica}
                author={tecnica.author.name}
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
    const { data } = await client.query({ query: GET_ALL_TECNICAS });
    return {
      props: { tecnicas: data.tecnicas },
    };
  } catch (error) {
    console.error("Erro ao carregar dados de Técnicas:", error);
    return {
      props: { tecnicas: [] },
    };
  }
};
