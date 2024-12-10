import { gql } from "@apollo/client";
import { GetStaticPaths, GetStaticProps } from "next";
import { client } from "@/lib/apollo";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { RichText } from "@graphcms/rich-text-react-renderer";
import Image from "next/image";
import { Header } from "@/components/Header";
import Head from "next/head";
import Link from "next/link";
import Footer from "@/components/footer/Footer";
import PostsList from "@/components/postabertos/PostsList";

// Query para obter os dados do "federal" por slug
const GET_FEDERAL = gql`
  query GetFederal($slugFederal: String!) {
    federal(where: { slugfederal: $slugFederal }) {
      id
      titlefederal
      subtitlefederal
      slugfederal
      federalCoverImage {
        url
      }
      contentFederal {
        json
      }
      author {
        name
        coverImageAuthor {
          url
        }
          slugauthor
      }
      createdAt
    }
  }
`;

// Query para obter todos os slugs dos federais
const GET_FEDERAL_SLUGS = gql`
  query GetAllFederalSlugs {
    federais {
      slugfederal
    }
  }
`;

interface FederalProps {
  federal: {
    id: string;
    titlefederal: string;
    subtitlefederal: string;
    slugfederal: string;
    federalCoverImage?: {
      url: string;
    };
    contentFederal: {
      json: any; // Ajustado para suportar a estrutura do GraphCMS
    };
    author: {
      name: string;
      slugauthor: string;
      coverImageAuthor?: {
        url: string;
      };
    };
    createdAt: string;
  };
}

export default function Federal({ federal }: FederalProps) {
  if (!federal.contentFederal || !federal.contentFederal.json) {
    return <div>Conteúdo não disponível</div>;
  }

  return (
    <>
      <Head>
        <title>{federal.titlefederal}</title>
        <meta name="description" content={federal.subtitlefederal} />
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
          {federal.federalCoverImage?.url && (
            <div className="flex w-full h-56 sm:h-80 lg:h-[392px] relative overflow-hidden">
              <Image
                src={federal.federalCoverImage.url}
                alt={federal.titlefederal}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          )}
        </div>

        <div className="flex w-full flex-col mt-4 sm:mt-8">
          <h1 className="font-bold text-center mb-5 text-2xl sm:text-4xl lg:text-[40px] text-blue-600">
            {federal.titlefederal}
          </h1>
          <h2 className="mt-4 text-xl text-zinc-800">
            {federal.subtitlefederal}
          </h2>
          <Link
            href={`/sobre/${federal.author.slugauthor}`} // Usando slugauthor aqui
            className="w-full h-full flex gap-4 lg:gap-8 flex-col sm:flex-row items-center justify-center mt-12 hover:brightness-75 transition-all"
          >
            <div className="flex mt-5">
              {federal.author.coverImageAuthor?.url && (
                <Image
                  src={federal.author.coverImageAuthor.url}
                  alt={federal.author.name}
                  width={50}
                  height={50}
                  className="rounded-full mr-2"
                />
              )}
              <div>
                <p className="font-bold text-zinc-900">{federal.author.name}</p>
                <p className="text-zinc-600 text-sm">
                  {format(
                    new Date(federal.createdAt),
                    "dd 'de' MMM 'de' yyyy",
                    {
                      locale: ptBR,
                    }
                  )}
                </p>
              </div>
            </div>
          </Link>

          <div className="mt-4 sm:mt-8">
            <RichText
              content={federal.contentFederal.json}
              renderers={{
                h1: ({ children }) => (
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 my-4">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-500 my-4">
                    {children}
                  </h2>
                ),
                p: ({ children }) => (
                  <p className="text-zinc-600 text-sm sm:text-base my-2">
                    {children}
                  </p>
                ),
              }}
            />
          </div>
        </div>
      </div>
      <PostsList />
      <Footer />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query({ query: GET_FEDERAL_SLUGS });
  const paths = data.federais.map((federal: { slugfederal: string }) => ({
    params: { slugfederal: federal.slugfederal },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slugFederal = params?.slugfederal as string;

  try {
    const { data } = await client.query({
      query: GET_FEDERAL,
      variables: { slugFederal },
    });

    return {
      props: {
        federal: data.federal,
      },
      revalidate: 60, // Revalida a cada 60 segundos
    };
  } catch (error) {
    console.error("Erro ao carregar notícia:", error);
    return {
      notFound: true,
    };
  }
};
