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
import { CardFederal } from "@/components/federais/CardFederal";
import Footer from "@/components/footer/Footer";

const GET_ALL_FEDERAIS = gql`
  query GetAllFederais {
    federais(orderBy: updatedAt_DESC) {
      id
      slugfederal
      titlefederal
      createdAt
      federalCoverImage {
        url
      }
      author {
        name
      }
    }
  }
`;

interface AllFederais {
  federais: {
    id: string;
    slugfederal: string;
    subtitlefederal: string;
    titlefederal: string;
    createdAt: string;
    federalCoverImage: {
      url: string;
    };
    contentFederal: string;
    author: {
      name: string;
    };
  }[];
}

export default function Home({ federais }: AllFederais) {
  return (
    <>
      <Head>
        <title>Brasil Federais</title>
        <meta name="description" content="Oportunidades Federais em destaque" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
            Oportunidades Federais
          </h1>
        </div>

        {federais.length > 0 && (
          <Link
            href={`/federal/${federais[0].slugfederal}`}
            className="w-full h-full flex gap-4 lg:gap-8 flex-col sm:flex-row items-center justify-center mt-12 hover:brightness-75 transition-all"
          >
            <div className="flex flex-1 w-full h-full min-h-[240px] md:min-h-[334px] relative rounded-2xl overflow-hidden">
              {federais[0].federalCoverImage ? (
                <Image
                  src={federais[0].federalCoverImage.url}
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
                {federais[0].titlefederal}
              </h1>
              <p className="text-zinc-600 text-sm md:text-base text-justify lg:text-left line-clamp-3">
                {federais[0].subtitlefederal}
              </p>
              <div>
                <p className="font-bold text-zinc-900 text-sm md:text-base">
                  {federais[0].author.name}
                </p>
                <p className="text-zinc-600 text-xs md:text-sm">
                  {format(
                    new Date(federais[0].createdAt),
                    "dd 'de' MMM 'de' yyyy",
                    { locale: ptBR }
                  )}
                </p>
              </div>
            </div>
          </Link>
        )}
        <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          {federais.length > 0 ? (
            federais.slice(1, 1000).map((federal) => (
              <CardFederal
                key={federal.id}
                title={federal.titlefederal}
                subtitle={federal.subtitlefederal}
                createdAt={federal.createdAt}
                urlImage={federal.federalCoverImage?.url || "/path/to/default/image.jpg"}
                slug={federal.slugfederal}
                author={federal.author.name}
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
    const { data } = await client.query({ query: GET_ALL_FEDERAIS });
    return {
      props: { federais: data.federais },
    };
  } catch (error) {
    console.error("Erro ao carregar dados de Federais:", error);
    return {
      props: { federais: [] },
    };
  }
};
