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
import Footer from "@/components/footer/Footer";
import PostsList from "@/components/postabertos/PostsList";

// Query para obter os dados da técnica por slug
const GET_TECNICA = gql`
  query GetTecnica($slugTecnica: String!) {
    tecnica(where: { slugtecnica: $slugTecnica }) {
      id
      titletecnica
      slugtecnica
      createdAt
      tecnicaCoverImage {
        url
      }
      contentTecnica {
        json
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

// Query para obter todos os slugs das técnicas
const GET_TECNICAS_SLUGS = gql`
  query GetAllTecnicas {
    tecnicas(orderBy: updatedAt_DESC) {
      slugtecnica
    }
  }
`;

interface TecnicaProps {
  tecnica: {
    id: string;
    titletecnica: string;
    slugtecnica: string;
    tecnicaCoverImage?: {
      url: string;
    };
    contentTecnica: {
      json: any[];
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

export default function Tecnica({ tecnica }: TecnicaProps) {
  if (!tecnica.contentTecnica || !tecnica.contentTecnica.json) {
    return <div>Conteúdo não disponível</div>;
  }

  return (
    <>
      <Head>
        <title>{tecnica.titletecnica}</title>
        <meta name="description" content={tecnica.titletecnica} />
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
          {tecnica.tecnicaCoverImage?.url && (
            <div className="flex w-full h-56 sm:h-80 lg:h-[392px] relative overflow-hidden">
              <Image
                src={tecnica.tecnicaCoverImage.url}
                alt={tecnica.titletecnica}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          )}
        </div>

        <div className="flex w-full flex-col mt-4 sm:mt-8">
          <h1 className="font-bold text-center mb-5 text-2xl sm:text-4xl lg:text-[40px] text-blue-600">
            {tecnica.titletecnica}
          </h1>
          <Link
            href={`/autores/${tecnica.author.name}`} // Usando o nome do autor
            className="w-full h-full flex gap-4 lg:gap-8 flex-col sm:flex-row items-center justify-start mt-12 hover:brightness-75 transition-all"
          >
            <div className="flex mt-5">
              {tecnica.author.coverImageAuthor?.url && (
                <Image
                  src={tecnica.author.coverImageAuthor.url}
                  alt={tecnica.author.name}
                  width={50}
                  height={50}
                  className="rounded-full mr-2"
                />
              )}
              <div>
                <p className="font-bold text-zinc-900">{tecnica.author.name}</p>
                <p className="text-zinc-600 text-sm">
                  {format(new Date(tecnica.createdAt), "dd 'de' MMM 'de' yyyy", {
                    locale: ptBR,
                  })}
                </p>
              </div>
            </div>
          </Link>

          <div className="mt-4 sm:mt-8">
            <RichText
              content={tecnica.contentTecnica.json}
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
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-500 my-4">
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

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query({ query: GET_TECNICAS_SLUGS });
  const paths = data.tecnicas.map((tecnica: { slugtecnica: string }) => ({
    params: { slugtecnica: tecnica.slugtecnica },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slugTecnica = params?.slugtecnica as string;

  try {
    const { data } = await client.query({
      query: GET_TECNICA,
      variables: { slugTecnica },
    });

    return {
      props: {
        tecnica: data.tecnica,
      },
      revalidate: 60, // Revalida a cada 60 segundos
    };
  } catch (error) {
    console.error("Erro ao carregar técnica:", error);
    return {
      notFound: true,
    };
  }
};
