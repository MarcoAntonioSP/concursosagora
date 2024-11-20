import { gql } from "@apollo/client";
import { GetStaticPaths, GetStaticProps } from "next";
import { client } from "@/lib/apollo";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { RichText } from "@graphcms/rich-text-react-renderer";
import { Header } from "@/components/Header";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ElementNode } from "@graphcms/rich-text-types";

// Query para obter os dados do "previsto" por slug
const GET_PREVISTO = gql`
  query GetPrevisto($slugPrevisto: String) {
    previsto(where: { slugprevisto: $slugPrevisto }) {
      id
      titleprevisto
      subtitleprevisto
      slugprevisto
      previstoCoverImage {
        url
      }
      contentPrevisto {
        json
        text
      }
      author {
        name
      }
      createdAt
    }
  }
`;

// Query para obter todos os slugs dos previstos
const GET_PREVISTOS_SLUGS = gql`
  query GetAllSlugs {
    previstos {
      slugprevisto
    }
  }
`;

interface PrevistoProps {
  previsto: {
    id: string;
    titleprevisto: string;
    subtitleprevisto: string;
    slugprevisto: string;
    previstoCoverImage?: {
      url: string;
    };
    contentPrevisto: {
      json: ElementNode[];
      text: string;
    };
    author: {
      name: string;
    };
    createdAt: string;
  };
}

export default function Previsto({ previsto }: PrevistoProps) {
  return (
    <>
      <Head>
        <title>{previsto.titleprevisto} | Brasil Concursos</title>
        <meta name="description" content={previsto.subtitleprevisto} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <div className="w-full max-w-[1120px] flex flex-col mx-auto pb-12 px-4">
        <Link
          href="/"
          className="flex w-full max-w-fit font-bold text-zinc-900 hover:text-zinc-600"
        >
          Voltar
        </Link>

        <div className="w-full h-full flex flex-col mt-8">
          {previsto.previstoCoverImage?.url && (
            <div className="flex w-full h-56 sm:h-80 lg:h-[392px] relative rounded-2xl overflow-hidden">
              <Image
                src={previsto.previstoCoverImage.url}
                alt={previsto.titleprevisto}
                fill={true}
                style={{ objectFit: "cover" }}
              />
            </div>
          )}
        </div>

        <div className="flex w-full flex-col mt-4 sm:mt-8">
          <h1 className="font-bold text-2xl sm:text-4xl lg:text-[40px] text-blue-600">
            {previsto.titleprevisto}
          </h1>
          <h2 className="mt-4 text-xl text-zinc-800">
            {previsto.subtitleprevisto}
          </h2>
          <div>
            <p className="font-bold text-zinc-900">{previsto.author.name}</p>
            <p className="text-zinc-600 text-sm">
              {format(new Date(previsto.createdAt), "dd 'de' MMM 'de' yyyy", {
                locale: ptBR,
              })}
            </p>
          </div>

          <div className="mt-4 sm:mt-8 prose prose-lg mx-auto">
            {/* Exibição do conteúdo em formato rico */}
            <RichText
              content={previsto.contentPrevisto.json}
              renderers={{
                p: ({ children }) => (
                  <p className="text-zinc-600 text-sm sm:text-base text-justify lg:text-left mt-1">
                    {children}
                  </p>
                ),
              }}
            />

            {/* Exibição do conteúdo em formato simples */}
            {previsto.contentPrevisto.text && (
              <p className="text-zinc-600 text-sm sm:text-base text-justify lg:text-left mt-1">
                {previsto.contentPrevisto.text}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// Get Static Props: fetch data for the specific "previsto"
export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug = ctx.params?.slugprevisto;

  try {
    const { data } = await client.query({
      query: GET_PREVISTO,
      variables: { slugPrevisto: slug },
    });

    if (!data || !data.previsto) {
      return { notFound: true };
    }

    return {
      props: { previsto: data.previsto },
      revalidate: 60 * 30, // 30 minutos
    };
  } catch (error) {
    console.error("Error fetching previsto data:", error);
    return { notFound: true };
  }
};

// Get Static Paths: generate the paths for the slugs
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { data } = await client.query({
      query: GET_PREVISTOS_SLUGS,
    });

    const paths =
      data?.previstos.map((previsto: { slugprevisto: string }) => ({
        params: { slugprevisto: previsto.slugprevisto },
      })) || [];

    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    console.error("Error fetching slugs:", error);
    return { paths: [], fallback: "blocking" };
  }
};
