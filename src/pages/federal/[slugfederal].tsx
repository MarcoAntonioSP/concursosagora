import { gql } from "@apollo/client";
import { GetStaticPaths, GetStaticProps } from "next";
import { client } from "@/lib/apollo";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { RichText } from "@graphcms/rich-text-react-renderer";
import Image, { ImageProps } from "next/image";
import { Header } from "@/components/Header";
import Head from "next/head";
import Link from "next/link";
import { ElementNode } from "@graphcms/rich-text-types";
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
      json: ElementNode[];
    };
    author: {
      name: string;
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
        <title>{federal.titlefederal} | ConcursoAgora Federal</title>
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
                fill={true}
                style={{ objectFit: "contain" }}
              />
            </div>
          )}
        </div>

        <div className="flex w-full flex-col mt-4 sm:mt-8">
          <h1 className="font-bold text-2xl sm:text-4xl lg:text-[40px] text-blue-600">
            {federal.titlefederal}
          </h1>
          <h2 className="mt-4 text-xl text-zinc-800">
            {federal.subtitlefederal}
          </h2>
          <div>
            <p className="font-bold text-zinc-900">{federal.author.name}</p>
            <p className="text-zinc-600 text-sm">
              {format(new Date(federal.createdAt), "dd 'de' MMM 'de' yyyy", {
                locale: ptBR,
              })}
            </p>
          </div>

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
                h3: ({ children }) => (
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-400 my-4">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-zinc-600 text-sm sm:text-base text-justify lg:text-left mt-1 mb-4">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside ml-4 mb-4">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside ml-4 mb-4">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="text-zinc-600 text-sm sm:text-base">
                    {children}
                  </li>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4">
                    {children}
                  </blockquote>
                ),
                code: ({ children }) => (
                  <code className="bg-gray-200 rounded px-1 py-0.5">
                    {children}
                  </code>
                ),
                img: (props: Partial<ImageProps>) => {
                  const { src, alt = "" } = props;
                  if (!src) {
                    return <></>; // Retorna um fragmento vazio
                  }
                  return (
                    <div className="my-4">
                      <Image
                        src={src}
                        alt={alt}
                        width={800}
                        height={450}
                        className="rounded-lg"
                      />
                    </div>
                  );
                },
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

// Get Static Props: fetch data for the specific "federal"
export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug = ctx.params?.slugfederal;

  try {
    const { data } = await client.query({
      query: GET_FEDERAL,
      variables: { slugFederal: slug },
    });

    if (!data || !data.federal) {
      return { notFound: true };
    }

    console.log("Fetched data:", data);

    return {
      props: { federal: data.federal },
      revalidate: 60 * 30, // 30 minutos
    };
  } catch (error) {
    console.error("Error fetching federal data:", error);
    return { notFound: true };
  }
};

// Get Static Paths: generate the paths for the slugs
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { data } = await client.query({
      query: GET_FEDERAL_SLUGS,
    });

    const paths =
      data?.federais.map((federal: { slugfederal: string }) => ({
        params: { slugfederal: federal.slugfederal },
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
