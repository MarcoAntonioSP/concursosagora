import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { gql } from "@apollo/client";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Header } from "@/components/Header";
import { GetServerSideProps } from "next";
import { client } from "@/lib/apollo";
import Empty from "@/components/Empty";
import Footer from "@/components/footer/Footer";
import { CardPrevisto } from "@/components/previstos/CardPrevisto";
import PostsList from "@/components/postabertos/PostsList";

const GET_ALL_PREVISTOS = gql`
  query MyQuery {
    previstos(orderBy: updatedAt_DESC) {
      id
      slugprevisto
      subtitleprevisto
      titleprevisto
      createdAt
      previstoCoverImage {
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

interface AllPrevistos {
  previstos: {
    id: string;
    slugprevisto: string;
    subtitleprevisto: string;
    titleprevisto: string;
    createdAt: string;
    previstoCoverImage: {
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

export default function Previtos({ previstos }: AllPrevistos) {
  return (
    <>
      <Head>
        <title>Concursos Agora - Concursos Previstos</title>
        <meta
          name="description"
          content="Descubra os concursos públicos previstos no Brasil. Fique por dentro das oportunidades de emprego futuras e informações detalhadas sobre próximos editais e inscrições."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="concursos públicos, concursos previstos, empregos, oportunidades, próximos editais, inscrições, vagas futuras"
        />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.concursosagora.com.br/previstos"
        />
        <meta
          property="og:title"
          content="Concursos Agora - Concursos Previstos"
        />
        <meta
          property="og:description"
          content="Descubra os concursos públicos previstos no Brasil. Fique por dentro das oportunidades de emprego futuras e informações detalhadas sobre próximos editais e inscrições."
        />
        <meta
          property="og:image"
          content="https://www.concursosagora.com.br/images/og-image.jpg"
        />
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://www.concursosagora.com.br/previstos"
        />
        <meta
          property="twitter:title"
          content="Concursos Agora - Concursos Previstos"
        />
        <meta
          property="twitter:description"
          content="Descubra os concursos públicos previstos no Brasil. Fique por dentro das oportunidades de emprego futuras e informações detalhadas sobre próximos editais e inscrições."
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
          <h1 className="text-red-900 text-xl font-bold font-sans italic text-shadow-md mt-10 ml-5 mb-">
            Concursos Previstos
          </h1>
        </div>

        {previstos.length > 0 && (
          <Link
            href={`/previsto/${previstos[0].slugprevisto}`}
            className="w-full h-full flex gap-4 lg:gap-8 flex-col sm:flex-row items-center justify-center mt-12 hover:brightness-75 transition-all"
          >
            <div className="flex flex-1 w-full h-full min-h-[240px] md:min-h-[334px] relative overflow-hidden">
              <Image
                src={previstos[0].previstoCoverImage.url}
                alt=""
                fill={true}
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="flex flex-1 h-full flex-col gap-3 lg:gap-6">
              <h1 className="font-bold text-3xl md:text-[40px] text-blue-600 line-clamp-2">
                {previstos[0].titleprevisto}
              </h1>
              <p className="text-zinc-600 text-sm md:text-base text-justify lg:text-left line-clamp-3">
                {previstos[0].subtitleprevisto}
              </p>
              <div className="flex items-center gap-2">
                {previstos[0].author.coverImageAuthor?.url && (
                  <Image
                    src={previstos[0].author.coverImageAuthor.url}
                    alt={previstos[0].author.name}
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                )}
                <div>
                  <p className="font-bold text-zinc-900 text-sm md:text-base">
                    {previstos[0].author.name}
                  </p>
                  <p className="text-zinc-600 text-xs md:text-sm">
                    {format(
                      new Date(previstos[0].createdAt),
                      "dd 'de' MMM 'de' yyyy",
                      { locale: ptBR }
                    )}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        )}

        <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          {previstos.length > 0 ? (
            previstos.slice(1, 1000).map((previsto) => (
              <CardPrevisto
                key={previsto.id}
                title={previsto.titleprevisto}
                subtitle={previsto.subtitleprevisto}
                authorImage={previsto.author.coverImageAuthor?.url || ""}
                createdAt={previsto.createdAt}
                urlImage={
                  previsto.previstoCoverImage?.url ||
                  "/path/to/default/image.jpg"
                }
                slug={previsto.slugprevisto}
                author={previsto.author.name}
              />
            ))
          ) : (
            <Empty />
          )}
        </div>
      </div>
      <PostsList />
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query({ query: GET_ALL_PREVISTOS });
  return {
    props: { previstos: data.previstos },
  };
};
