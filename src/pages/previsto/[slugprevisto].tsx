import { gql } from "@apollo/client";
import { GetStaticPaths, GetStaticProps } from "next";
import { client } from "@/lib/apollo";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { RichText } from "@graphcms/rich-text-react-renderer";
import { Header } from "@/components/Header";
import Head from "next/head";
import Image, { ImageProps } from "next/image";
import Link from "next/link";
import { ElementNode } from "@graphcms/rich-text-types";
import Footer from "@/components/footer/Footer";
import PostsList from "@/components/postabertos/PostsList";

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
        coverImageAuthor {
          url
        }
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
      coverImageAuthor?: {
        url: string;
      };
    };
    createdAt: string;
  };
}

export default function Previsto({ previsto }: PrevistoProps) {
  return (
    <>
      <Head>
        <title>{previsto.titleprevisto}</title>
        <meta name="description" content={previsto.subtitleprevisto} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href={`https://seusite.com/${previsto.slugprevisto}`}
        />
      </Head>

      <Header />
      <div className="w-full max-w-[1120px] flex flex-col mx-auto pb-12 px-4">
        <Link
          href="/"
          className="flex w-full mt-20 max-w-fit font-bold text-zinc-900 hover:text-zinc-600"
        >
          Voltar
        </Link>

        <div className="w-full h-full flex flex-col mt-8">
          {previsto.previstoCoverImage?.url && (
            <div className="flex w-full h-56 sm:h-80 lg:h-[392px] relative overflow-hidden">
              <Image
                src={previsto.previstoCoverImage.url}
                alt={previsto.titleprevisto}
                fill={true}
                style={{ objectFit: "contain" }}
              />
            </div>
          )}
        </div>
        <h1 className="font-bold text-2xl text-center mt-8 mb-5 sm:text-4xl lg:text-[40px] text-blue-600">
            {previsto.titleprevisto}
          </h1>
          <h2 className="mt-4 text-xl text-zinc-800">
            {previsto.subtitleprevisto}
          </h2>
        <div className="flex w-full flex-col mt-4 sm:mt-8">
        <Link href="/" aria-label="link para perfil do autor">
            <div className="flex mt-5">
              {previsto.author.coverImageAuthor?.url && (
                <Image
                  src={previsto.author.coverImageAuthor.url}
                  alt={previsto.author.name}
                  width={50}
                  height={50}
                  className="rounded-full mr-2"
                />
              )}
              <div>
                <p className="font-bold text-zinc-900">{previsto.author.name}</p>
                <p className="text-zinc-600 text-sm">
                  {format(
                    new Date(previsto.createdAt),
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
              content={previsto.contentPrevisto.json}
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
                table: ({ children }) => (
                  <div className="overflow-x-auto my-4">
                    <table className="table-auto border-collapse border border-gray-300 w-full text-left">
                      {children}
                    </table>
                  </div>
                ),
                code: ({ children }) => (
                  <code className="bg-gray-200 rounded px-1 py-0.5">
                    {children}
                  </code>
                ),
                img: (props: Partial<ImageProps>) => {
                  const { src, alt = "" } = props;
                  if (!src) {
                    return <></>;
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
