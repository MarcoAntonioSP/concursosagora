import { gql } from "@apollo/client";
import { client } from "@/lib/apollo";
import { GetStaticPaths, GetStaticProps } from "next";
import { RichText } from "@graphcms/rich-text-react-renderer";
import Image, { ImageProps } from "next/image";
import { Header } from "@/components/Header";
import Footer from "@/components/footer/Footer";
import PostsList from "@/components/postabertos/PostsList";

// Query para pegar os dados do autor, incluindo o slug
const GET_AUTHOR = gql`
  query MyQuery {
    authors {
      id
      name
      contentauthor {
        json
      }
      coverImageAuthor {
        url
      }
      slugauthor
    }
  }
`;

// Tipagem do conteúdo autor
interface ContentAuthor {
  json: any; // Podemos melhorar a tipagem se tivermos mais informações sobre o formato do conteúdo
}

interface AuthorProps {
  author: {
    id: string;
    name: string;
    coverImageAuthor?: {
      url: string;
    };
    contentauthor: {
      json: any;
    };
  };
}

const AuthorPage = ({ author }: AuthorProps) => {
  return (
    <>
      <Header />
      <div className="w-full max-w-[1120px] mb-5 flex flex-col mx-auto pb-12 px-6 sm:px-10 bg-white shadow-lg rounded-lg mt-24">
        <div className="text-center mb-8">
          <h1 className="font-extrabold text-3xl text-gray-900">
            {author.name}
          </h1>
        </div>

        {/* Layout flex para alinhar imagem e texto */}
        <div className="flex items-center gap-6 mb-6">
          {author.coverImageAuthor?.url && (
            <div className="flex-shrink-0">
              <Image
                src={author.coverImageAuthor.url}
                alt={author.name}
                width={100}
                height={100}
                className="rounded-full border-4 border-yellow-500 shadow-lg"
              />
            </div>
          )}
          <div>
            {/* Informações sobre o autor */}
            <RichText
              content={author.contentauthor.json}
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
};

// Função para obter os dados do autor com base no slug
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slugauthor } = params as { slugauthor: string };

  try {
    const { data } = await client.query({
      query: GET_AUTHOR,
    });

    // Filtrando o autor específico baseado no slug
    const author = data?.authors?.find(
      (author: { slugauthor: string }) => author.slugauthor === slugauthor
    );

    if (!author) {
      return { notFound: true };
    }

    return {
      props: { author },
      revalidate: 60 * 30, // Revalidando a cada 30 minutos
    };
  } catch (error) {
    console.error("Erro ao buscar dados do autor:", error);
    return { notFound: true };
  }
};

// Função para obter os caminhos dinâmicos (slugs dos autores)
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { data } = await client.query({
      query: GET_AUTHOR,
    });

    // Gerando os paths usando o slug do autor
    const paths =
      data?.authors?.map((author: { slugauthor: string }) => ({
        params: { slugauthor: author.slugauthor },
      })) || [];

    return {
      paths,
      fallback: "blocking", // Aguarda até que as páginas estejam geradas
    };
  } catch (error) {
    console.error("Erro ao buscar paths de autores:", error);
    return { paths: [], fallback: "blocking" };
  }
};

export default AuthorPage;
